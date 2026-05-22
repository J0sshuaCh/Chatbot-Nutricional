import { GoogleGenerativeAI } from "@google/generative-ai"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const pdfParse = require("pdf-parse")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Inicializar el cliente de API
// Asegúrate de agregar GEMINI_API_KEY en la sección "Vars" de la barra lateral
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" })
    }

    // Verificar API Key
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "API Key not configured. Please add GEMINI_API_KEY in the Vars section.",
      })
    }

    // --- LÓGICA PARA LEER PDFs ---
    let contextText = ""
    try {
      const possiblePaths = [
        path.join(__dirname, "documents"), // Relative to this file
        path.join(process.cwd(), "api", "documents"), // From project root
        path.join(process.cwd(), "documents"), // Fallback
      ]

      let documentsDir = null
      for (const p of possiblePaths) {
        console.log(`[PDF DEBUG] Checking path: ${p}`)
        if (fs.existsSync(p)) {
          documentsDir = p
          console.log(`[PDF DEBUG] Found documents directory at: ${p}`)
          break
        }
      }

      if (documentsDir) {
        const files = fs.readdirSync(documentsDir)
        const pdfFiles = files.filter((file) => file.toLowerCase().endsWith(".pdf"))

        console.log(`[PDF DEBUG] Found ${pdfFiles.length} PDF files:`, pdfFiles)

        for (const file of pdfFiles) {
          const filePath = path.join(documentsDir, file)
          const dataBuffer = fs.readFileSync(filePath)

          try {
            const data = await pdfParse(dataBuffer)
            if (data && data.text) {
              // Clean up text slightly to remove excessive whitespace
              const cleanText = data.text.replace(/\s+/g, " ").trim()
              contextText += `\n--- INICIO DOCUMENTO: ${file} ---\n${cleanText}\n--- FIN DOCUMENTO: ${file} ---\n`
              console.log(`[PDF DEBUG] Read ${file}: ${cleanText.length} characters extracted`)
            } else {
              console.warn(`[PDF DEBUG] Warning: No text extracted from ${file}`)
            }
          } catch (parseError) {
            console.error(`[PDF DEBUG] Error parsing ${file}:`, parseError)
          }
        }

        console.log(`[PDF DEBUG] Total context length: ${contextText.length} characters`)
      } else {
        console.error("[PDF DEBUG] CRITICAL: Documents directory not found in any expected location")
        console.log("[PDF DEBUG] Current working directory:", process.cwd())
        console.log("[PDF DEBUG] __dirname:", __dirname)
      }
    } catch (err) {
      console.error("[PDF DEBUG] Fatal error in PDF reading block:", err)
      // Continuamos aunque falle la lectura para no romper el chat completamente
    }

    // --- PREPARAR PROMPT ---
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
    `

    // --- LLAMADA A GEMINI ---
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(finalPrompt)
    const response = await result.response
    const text = response.text()

    res.status(200).json({ text })
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    res.status(500).json({ error: "Error interno del servidor: " + error.message })
  }
}