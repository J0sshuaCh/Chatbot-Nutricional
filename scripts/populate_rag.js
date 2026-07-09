import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

const geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey) {
  console.error('Falta variable de entorno: GEMINI_API_KEY');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(geminiKey);

const DOCUMENTS_DIR = './public/documentos';
const OUTPUT_FILE = './api/data.json';
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 150;

function chunkText(text, filePath) {
  const clean = text.replace(/\s+/g, ' ').trim();
  const chunks = [];
  let start = 0;

  while (start < clean.length) {
    let end = start + CHUNK_SIZE;
    if (end < clean.length) {
      const lastSpace = clean.lastIndexOf(' ', end);
      if (lastSpace > start) end = lastSpace;
    }
    const content = clean.slice(start, end).trim();
    if (content) {
      chunks.push({
        fileName: path.basename(filePath),
        content,
      });
    }
    start = end - CHUNK_OVERLAP;
  }
  return chunks;
}

async function generateEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function main() {
  if (!fs.existsSync(DOCUMENTS_DIR)) {
    console.error('No se encuentra la carpeta ' + DOCUMENTS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCUMENTS_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));

  if (files.length === 0) {
    console.error('No hay PDFs en ' + DOCUMENTS_DIR);
    process.exit(1);
  }

  console.log('PDFs encontrados:', files.length);

  const allChunks = [];

  for (const file of files) {
    const filePath = path.join(DOCUMENTS_DIR, file);
    const buf = fs.readFileSync(filePath);
    const data = await pdf(buf);
    const chunks = chunkText(data.text, filePath);
    allChunks.push(...chunks);
    console.log('  ' + file + ': ' + chunks.length + ' chunks');
  }

  console.log('\nTotal chunks: ' + allChunks.length);
  console.log('Generando embeddings...\n');

  const knowledgeBase = [];

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    try {
      const embedding = await generateEmbedding(chunk.content);
      knowledgeBase.push({
        fileName: chunk.fileName,
        content: chunk.content,
        embedding,
      });
      console.log('  Chunk ' + (i + 1) + '/' + allChunks.length + ' OK');
    } catch (err) {
      console.error('  Error chunk ' + (i + 1) + ': ' + err.message);
    }
  }

  const output = knowledgeBase.map(k => ({
    fileName: k.fileName,
    content: k.content,
  }));

  const embeddingsOnly = knowledgeBase.map(k => k.embedding);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ chunks: output, embeddings: embeddingsOnly }, null, 2));
  console.log('\nGuardado en ' + OUTPUT_FILE);
  console.log('Total chunks con embedding: ' + knowledgeBase.length);
}

main().catch(console.error);
