# 🍼 ANMI - Asistente Nutricional Materno Infantil

**Asistente Nutricional Materno Infantil (ANMI)** es una aplicación web progresiva (PWA) diseñada para proporcionar orientación nutricional a padres y cuidadores en Perú, con un enfoque en la prevención de la anemia infantil y la desnutrición crónica.

El proyecto se centra en la etapa crítica de la alimentación complementaria (6 a 23 meses), utilizando inteligencia artificial para responder consultas con información validada a partir de documentos oficiales del Ministerio de Salud (MINSA) y el Instituto Nacional de Salud (INS).

## 🌐 Demo en Vivo

[https://asistente-nutricional-materno-infantil.vercel.app/](https://asistente-nutricional-materno-infantil.vercel.app/)

---

## ✨ Capacidades y Características Principales

1. **🤖 Chatbot ANMI:** Asistente virtual que utiliza Google Gemini para procesar preguntas y generar respuestas basadas en documentos PDF oficiales (MINSA/CENAN).
2. **📚 Biblioteca de Documentos:** Acceso a guías, normas técnicas y recetarios del MINSA, INS, OMS y UNICEF. Visualización integrada de PDF y descarga directa.
3. **🍽️ Guía de Platillos Nutritivos:** Recetario interactivo con categorías para **Bebés** (6-11 meses) y **Familia**, enfocado en alta densidad de hierro.
4. **🥩 Información Nutricional:** Guía sobre alimentos ricos en hierro con recomendaciones para optimizar la absorción de nutrientes.
5. **🏛️ Servicios del Estado:** Información sobre programas sociales peruanos: Plan Nacional contra la Anemia, Cuna Más y Qali Warma.
6. **👤 Mi Espacio Personal:** Sección personalizada para el seguimiento del usuario.
7. **🌙 Modo Oscuro:** Soporte completo de tema claro/oscuro.
8. **⚙️ PWA:** Instalable en dispositivos móviles con acceso offline y gestión de caché.

---

## 🛠️ Tecnologías y Estructura

- **Frontend:** [React](https://react.dev/) (v19), [Vite](https://vitejs.dev/) (v8), [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Backend:** Serverless Functions (Node.js) + [Supabase](https://supabase.com/)
- **Inteligencia Artificial:** Google Gemini API (`@google/generative-ai`)
- **UI/UX:** Base UI, Radix UI, Framer Motion, Lucide React, Sonner, SweetAlert2
- **Formularios:** React Hook Form + Zod
- **Estado:** Zustand + TanStack React Query
- **Enrutamiento:** React Router DOM (v7)
- **Estilos:** class-variance-authority, tailwind-merge, clsx, next-themes

---

## 🚀 Instalación y Ejecución Local

### 1. Requisitos

- Node.js `>=18`
- Cuenta en [Supabase](https://supabase.com/) (para features de backend)
- Clave de API de Google Gemini

### 2. Configuración

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd ANMI-Asistente-Nutricional-Materno-Infantil
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   GEMINI_API_KEY="TU_CLAVE_DE_GEMINI"
   ```

### 3. Iniciar el Desarrollo

```bash
npm run dev
```

### 4. Build para Producción

```bash
npm run build
npm run preview
```
