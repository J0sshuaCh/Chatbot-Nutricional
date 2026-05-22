// Archivo: api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Inicializar el cliente de API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "API Key not configured.",
      });
    }

    // --- LÓGICA NUEVA: LEER EL JSON (RAPIDÍSIMO) ---
    let contextText = "";

    try {
      // Buscamos el archivo data.json que generaste
      const jsonPath = path.join(process.cwd(), 'api', 'data.json');
      
      if (fs.existsSync(jsonPath)) {
        // Leemos el archivo JSON
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const knowledgeBase = JSON.parse(rawData);

        // Convertimos el JSON a texto para el Prompt
        knowledgeBase.forEach(doc => {
          contextText += `\n--- FUENTE: ${doc.fileName} ---\n${doc.content}\n`;
        });
        
        console.log(`[JSON SUCCESS] Contexto cargado: ${knowledgeBase.length} documentos.`);
      } else {
        console.warn("[JSON WARNING] No se encontró api/data.json. Ejecuta 'node convert_pdfs.js' primero.");
        contextText = "No hay información de contexto disponible en este momento.";
      }
    } catch (err) {
      console.error("[JSON ERROR] Error leyendo la base de datos:", err);
      contextText = "Error al cargar la información de contexto.";
    }

    // --- PREPARAR PROMPT (Mantenemos tus reglas) ---
    const finalPrompt = `
    Eres un asistente inteligente del proyecto ANMI.
    Usa la siguiente información de contexto extraída de los documentos oficiales para responder a la pregunta del usuario.
    
    REGLAS:
    1. Si la respuesta está en el contexto, úsalo para responder con precisión.
    2. Si la respuesta NO está en el contexto, responde amablemente usando tu conocimiento general, pero aclara que esa información específica no estaba en los documentos proporcionados.
    3. Sé conciso y profesional.
    4. IMPORTANTE: Usa formato Markdown para tu respuesta (negritas, listas, encabezados) para que sea fácil de leer.
    5. IMPORTANTE: Al final de tu respuesta, indica explícitamente de qué documento(s) sacaste la información usando el formato: "**Fuente:** [Nombre del archivo]". Si usaste conocimiento general, di "**Fuente:** Conocimiento general".

    CONTEXTO DE LOS DOCUMENTOS:
    ${contextText}

    PREGUNTA DEL USUARIO:
    ${prompt}
    `;



    // --- LLAMADA A GEMINI ---
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Error interno del servidor: " + error.message });
  }
}