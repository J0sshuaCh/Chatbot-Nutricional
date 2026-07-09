import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

let knowledgeBase = { chunks: [], embeddings: [] };
try {
  const raw = fs.readFileSync('./api/data.json', 'utf-8');
  knowledgeBase = JSON.parse(raw);
  console.log('[RAG] Cargados ' + knowledgeBase.chunks.length + ' chunks de conocimiento');
} catch (e) {
  console.warn('[RAG] No se pudo cargar data.json:', e.message);
}

const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.0-flash-lite'];

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function generateWithRetry(prompt) {
  let lastError = null;
  for (const modelName of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        return result;
      } catch (error) {
        lastError = error;
        if (error.status === 429 && attempt === 0) {
          console.warn(`[Gemini] Cuota excedida en ${modelName}, reintentando...`);
          await new Promise(r => setTimeout(r, 2000));
          continue;
        }
        break;
      }
    }
  }
  throw lastError;
}

async function buscarDocumentos(query) {
  if (knowledgeBase.chunks.length === 0) return [];

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
    const result = await model.embedContent(query);
    const embedding = result.embedding.values;

    const scored = knowledgeBase.embeddings.map((emb, i) => ({
      ...knowledgeBase.chunks[i],
      similarity: cosineSimilarity(embedding, emb),
    }));

    scored.sort((a, b) => b.similarity - a.similarity);
    return scored.slice(0, 3);
  } catch (error) {
    console.warn('[RAG] Error:', error.message);
    return [];
  }
}

async function obtenerContextoBebe(userId) {
  try {
    const partes = [];

    const { data: bebes } = await supabase
      .from('Bebe')
      .select('*')
      .eq('id_usuario', userId)
      .order('fecha_nacimiento', { ascending: false });

    if (!bebes || bebes.length === 0) return '';

    const bebe = bebes[0];
    const nacimiento = new Date(bebe.fecha_nacimiento);
    const hoy = new Date();
    const edadMeses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12
      + (hoy.getMonth() - nacimiento.getMonth());

    partes.push(`Bebe: ${bebe.name}, Edad: ${edadMeses} meses`);

    const { data: alergias } = await supabase
      .from('AlergiaBebe')
      .select('Alergia(descrip_alergia)')
      .eq('id_bebe', bebe.id_bebe);

    if (alergias?.length > 0) {
      const lista = alergias.map(a => a.Alergia?.descrip_alergia).filter(Boolean).join(', ');
      partes.push(`Alergias: ${lista} (NO recomendar estos alimentos)`);
    }

    const { data: analisis } = await supabase
      .from('Analisis')
      .select('*')
      .eq('id_bebe', bebe.id_bebe)
      .order('fecha_control', { ascending: false })
      .limit(1)
      .single();

    if (analisis) {
      partes.push(`Ultimo control: Peso=${analisis.peso}kg, Talla=${analisis.talla}cm (${analisis.fecha_control})`);
    }

    return partes.join('\n');
  } catch (error) {
    console.warn('[Contexto] Error obteniendo datos:', error.message);
    return '';
  }
}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, userId } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API Key not configured.' });
    }

    let contextoBD = '';
    if (userId) {
      contextoBD = await obtenerContextoBebe(userId);
    }

    let docsTexto = '';
    try {
      const docs = await buscarDocumentos(prompt);
      if (docs.length > 0) {
        docsTexto = 'INFORMACION DE DOCUMENTOS DE REFERENCIA:\n' +
          docs.map(d => '[' + d.fileName + '] ' + d.content.slice(0, 500)).join('\n\n') + '\n\n';
      }
    } catch (e) {
      console.warn('[RAG] Error en busqueda:', e.message);
    }

    const contextoFinal = contextoBD
      ? `INFORMACION DEL USUARIO (desde base de datos):\n${contextoBD}\n\n`
      : '';

    const finalPrompt = `Eres el asistente ANMI (Asistente Nutricional Materno Infantil).
Responde EN ESPANOL, con formato Markdown.
Usa la informacion del usuario para personalizar la respuesta.
Si hay alergias registradas, no recomiendes esos alimentos.
PRIORIZA la informacion de los documentos de referencia sobre tu conocimiento general.\nSi la informacion especifica no esta disponible en los documentos, usa tu conocimiento general indicando la fuente.

${docsTexto}${contextoFinal}PREGUNTA DEL USUARIO:
${prompt}`;

    const result = await generateWithRetry(finalPrompt);
    const response = result.response;

    if (!response.candidates || response.candidates.length === 0) {
      const feedback = response.promptFeedback?.blockReason || 'unknown';
      console.warn('[Gemini] Respuesta bloqueada:', feedback);
      return res.status(200).json({
        text: 'Lo siento, no puedo responder a esa pregunta por politicas de seguridad.',
        timestamp: new Date().toISOString(),
      });
    }

    const text = response.text();

    res.status(200).json({
      text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Cuota de Gemini API agotada. Espera unos minutos o crea una nueva API Key en https://aistudio.google.com/apikey',
      });
    }
    res.status(500).json({ error: 'Error interno del servidor: ' + error.message });
  }
}




