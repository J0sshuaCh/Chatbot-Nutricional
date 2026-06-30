import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

    const contextoFinal = contextoBD
      ? `INFORMACION DEL USUARIO (desde base de datos):\n${contextoBD}\n\n`
      : '';

    const finalPrompt = `Eres el asistente ANMI (Asistente Nutricional Materno Infantil).
Responde EN ESPANOL, con formato Markdown.
Usa la informacion del usuario para personalizar la respuesta.
Si hay alergias registradas, no recomiendes esos alimentos.
Si la informacion especifica no esta disponible, usa tu conocimiento general indicando la fuente.

${contextoFinal}PREGUNTA DEL USUARIO:
${prompt}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Error interno del servidor: ' + error.message });
  }
}
