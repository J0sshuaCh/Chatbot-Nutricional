-- =============================================
-- ANMI - Esquema Completo de Base de Datos
-- Ejecutar en: Supabase SQL Editor
-- =============================================

-- 1. CREAR EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =============================================
-- TABLAS DEL ESQUEMA (según DB_INFO)
-- =============================================

-- 2. TABLA: Usuario
CREATE TABLE IF NOT EXISTS "Usuario" (
  id_usuario UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLA: Bebe
CREATE TABLE IF NOT EXISTS "Bebe" (
  id_bebe BIGSERIAL PRIMARY KEY,
  id_usuario UUID NOT NULL REFERENCES "Usuario"(id_usuario) ON DELETE CASCADE,
  name TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABLA: Analisis (Control de Crecimiento)
CREATE TABLE IF NOT EXISTS "Analisis" (
  id_analisis BIGSERIAL PRIMARY KEY,
  id_bebe BIGINT NOT NULL REFERENCES "Bebe"(id_bebe) ON DELETE CASCADE,
  descrip TEXT,
  fecha_control DATE NOT NULL DEFAULT CURRENT_DATE,
  peso NUMERIC(5,2) NOT NULL,
  talla NUMERIC(5,2) NOT NULL,
  estado BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABLA: Receta
CREATE TABLE IF NOT EXISTS "Receta" (
  id_receta BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  detalle TEXT,
  edad_minima_meses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABLA: RecetaFavorita (N:M entre Bebe y Receta)
CREATE TABLE IF NOT EXISTS "RecetaFavorita" (
  id_favorito BIGSERIAL PRIMARY KEY,
  id_bebe BIGINT NOT NULL REFERENCES "Bebe"(id_bebe) ON DELETE CASCADE,
  id_receta BIGINT NOT NULL REFERENCES "Receta"(id_receta) ON DELETE CASCADE,
  fecha_agregado TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(id_bebe, id_receta)
);

-- 7. TABLA: Alergia
CREATE TABLE IF NOT EXISTS "Alergia" (
  id_alergia BIGSERIAL PRIMARY KEY,
  descrip_alergia TEXT NOT NULL,
  id_usuario UUID NOT NULL REFERENCES "Usuario"(id_usuario) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABLA: AlergiaBebe (N:M entre Bebe y Alergia)
CREATE TABLE IF NOT EXISTS "AlergiaBebe" (
  id_alergia_bebe BIGSERIAL PRIMARY KEY,
  id_bebe BIGINT NOT NULL REFERENCES "Bebe"(id_bebe) ON DELETE CASCADE,
  id_alergia BIGINT NOT NULL REFERENCES "Alergia"(id_alergia) ON DELETE CASCADE,
  UNIQUE(id_bebe, id_alergia)
);

-- 9. TABLA: Chats (Historial de Conversaciones)
CREATE TABLE IF NOT EXISTS "Chats" (
  id_chat BIGSERIAL PRIMARY KEY,
  id_usuario UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TABLA: document_knowledge (RAG - Conocimiento de documentos)
CREATE TABLE IF NOT EXISTS document_knowledge (
  id BIGSERIAL PRIMARY KEY,
  file_name TEXT NOT NULL,
  category TEXT,
  content TEXT NOT NULL,
  embedding VECTOR(768),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ÍNDICES PARA RENDIMIENTO
-- =============================================
CREATE INDEX IF NOT EXISTS idx_bebe_usuario ON "Bebe"(id_usuario);
CREATE INDEX IF NOT EXISTS idx_analisis_bebe ON "Analisis"(id_bebe);
CREATE INDEX IF NOT EXISTS idx_analisis_fecha ON "Analisis"(fecha_control DESC);
CREATE INDEX IF NOT EXISTS idx_receta_edad ON "Receta"(edad_minima_meses);
CREATE INDEX IF NOT EXISTS idx_favorita_bebe ON "RecetaFavorita"(id_bebe);
CREATE INDEX IF NOT EXISTS idx_alergia_bebe ON "AlergiaBebe"(id_bebe);
CREATE INDEX IF NOT EXISTS idx_alergia_usuario ON "Alergia"(id_usuario);
CREATE INDEX IF NOT EXISTS idx_chats_usuario ON "Chats"(id_usuario);
CREATE INDEX IF NOT EXISTS idx_chats_fecha ON "Chats"(fecha DESC);
CREATE INDEX IF NOT EXISTS idx_document_knowledge_category ON document_knowledge(category);

-- =============================================
-- RLS (Row Level Security)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE "Usuario" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Bebe" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analisis" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Receta" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RecetaFavorita" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Alergia" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AlergiaBebe" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Chats" ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_knowledge ENABLE ROW LEVEL SECURITY;

-- Políticas: Usuarios solo ven sus propios datos
CREATE POLICY "Usuarios ven su propio perfil" ON "Usuario"
  FOR ALL USING (id_usuario = auth.uid());

CREATE POLICY "Usuarios ven sus bebés" ON "Bebe"
  FOR ALL USING (id_usuario = auth.uid());

CREATE POLICY "Usuarios ven análisis de sus bebés" ON "Analisis"
  USING (id_bebe IN (SELECT id_bebe FROM "Bebe" WHERE id_usuario = auth.uid()));

CREATE POLICY "Todos ven las recetas" ON "Receta"
  FOR SELECT USING (true);

CREATE POLICY "Usuarios gestionan sus favoritas" ON "RecetaFavorita"
  USING (id_bebe IN (SELECT id_bebe FROM "Bebe" WHERE id_usuario = auth.uid()));

CREATE POLICY "Usuarios gestionan sus alergias" ON "Alergia"
  FOR ALL USING (id_usuario = auth.uid());

CREATE POLICY "Usuarios ven alergias de sus bebés" ON "AlergiaBebe"
  USING (id_bebe IN (SELECT id_bebe FROM "Bebe" WHERE id_usuario = auth.uid()));

CREATE POLICY "Usuarios ven su propio chat" ON "Chats"
  FOR ALL USING (id_usuario = auth.uid());

CREATE POLICY "Todos pueden leer documentos" ON document_knowledge
  FOR SELECT USING (true);

-- =============================================
-- TRIGGER: Actualizar updated_at automáticamente
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usuario_updated_at
  BEFORE UPDATE ON "Usuario"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bebe_updated_at
  BEFORE UPDATE ON "Bebe"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
