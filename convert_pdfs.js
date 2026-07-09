import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;

function chunkText(text, fileName) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = start + CHUNK_SIZE;
    if (end >= text.length) {
      chunks.push({ fileName, content: text.slice(start).trim() });
      break;
    }
    const nextSpace = text.lastIndexOf(' ', end);
    const splitAt = nextSpace > start ? nextSpace : end;
    chunks.push({ fileName, content: text.slice(start, splitAt).trim() });
    start = splitAt - CHUNK_OVERLAP;
  }

  return chunks;
}

async function generateEmbeddings(texts) {
  const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
  const embeddings = [];

  for (let i = 0; i < texts.length; i++) {
    try {
      const result = await model.embedContent(texts[i].slice(0, 2000));
      embeddings.push(result.embedding.values);
      if ((i + 1) % 5 === 0) {
        process.stdout.write(`  Embeddings: ${i + 1}/${texts.length}\n`);
      }
    } catch (error) {
      console.warn(`  Error en chunk ${i}: ${error.message}`);
      await new Promise(r => setTimeout(r, 2000));
      try {
        const result = await model.embedContent(texts[i].slice(0, 2000));
        embeddings.push(result.embedding.values);
      } catch {
        embeddings.push(new Array(3072).fill(0));
      }
    }
  }

  return embeddings;
}

async function procesarPdfs() {
  console.log('=== Pipeline RAG: PDFs -> data.json ===\n');

  const pdfDir = './documents';
  const outputFile = './api/data.json';

  if (!fs.existsSync(pdfDir)) {
    console.error('No se encuentra la carpeta:', pdfDir);
    process.exit(1);
  }

  const files = fs.readdirSync(pdfDir)
    .filter(f => f.toLowerCase().endsWith('.pdf'));

  if (files.length === 0) {
    console.error('No hay PDFs en', pdfDir);
    process.exit(1);
  }

  console.log(`PDFs encontrados: ${files.length}\n`);

  const allChunks = [];

  for (const file of files) {
    try {
      const filePath = path.join(pdfDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);

      // pdf-parse devuelve texto plano; limpiamos espacios multiples
      // pero preservamos saltos de seccion
      const cleanText = data.text
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]+/g, ' ')
        .trim();

      if (cleanText.length > 200) {
        const chunks = chunkText(cleanText, path.basename(file));
        allChunks.push(...chunks);
        console.log(`  ${file}: ${cleanText.length} chars -> ${chunks.length} chunks`);
      } else {
        console.warn(`  ${file}: texto muy corto (${cleanText.length} chars) - PDF escaneado?`);
      }
    } catch (error) {
      console.error(`  Error en ${file}: ${error.message}`);
    }
  }

  if (allChunks.length === 0) {
    console.error('No se pudo extraer texto de ningun PDF.');
    process.exit(1);
  }

  console.log(`\nTotal chunks: ${allChunks.length}`);
  console.log('Generando embeddings con gemini-embedding-001...\n');

  const texts = allChunks.map(c => c.content);
  const embeddings = await generateEmbeddings(texts);

  const knowledgeBase = { chunks: allChunks, embeddings };

  fs.writeFileSync(outputFile, JSON.stringify(knowledgeBase));
  console.log(`\nGuardado: ${outputFile}`);
  console.log(`Chunks: ${allChunks.length}`);
  console.log(`Dimension embeddings: ${embeddings[0]?.length || 0}`);
  console.log('\n=== Listo. El RAG en chat.js usara estos datos. ===');
}

procesarPdfs().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
