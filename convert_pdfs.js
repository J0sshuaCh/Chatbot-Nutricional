// Archivo: convert_pdfs.js
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

// Rutas configuradas
const documentsDir = './api/documents'; // Donde están tus PDFs ahora
const outputFile = './api/data.json';   // Donde se guardará el resumen

async function procesarPdfs() {
  console.log("🚀 Iniciando conversión de PDFs a JSON...");

  if (!fs.existsSync(documentsDir)) {
    console.error("❌ No encuentro la carpeta:", documentsDir);
    return;
  }

  const files = fs.readdirSync(documentsDir).filter(file => file.toLowerCase().endsWith('.pdf'));
  
  if (files.length === 0) {
    console.warn("⚠️ No encontré archivos PDF en la carpeta.");
    return;
  }

  console.log(`📄 Encontrados ${files.length} archivos. Procesando...`);
  
  const knowledgeBase = [];

  for (const file of files) {
    try {
      const filePath = path.join(documentsDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      
      // Leemos el PDF
      const data = await pdf(dataBuffer);
      
      // Limpieza de texto (Quita espacios excesivos y saltos de línea raros)
      const cleanText = data.text.replace(/\s+/g, " ").trim();

      if (cleanText.length > 0) {
        knowledgeBase.push({
          fileName: file,
          content: cleanText
        });
        console.log(`✅ ${file}: ${cleanText.length} caracteres extraídos.`);
      } else {
        console.warn(`⚠️ ${file}: El archivo parece estar vacío o ser una imagen.`);
      }

    } catch (error) {
      console.error(`❌ Error leyendo ${file}:`, error.message);
    }
  }

  // Guardamos el JSON
  fs.writeFileSync(outputFile, JSON.stringify(knowledgeBase, null, 2));
  console.log(`\n✨ ¡ÉXITO! Base de datos guardada en: ${outputFile}`);
  console.log(`Ahora tu chat.js será super rápido.`);
}

procesarPdfs();