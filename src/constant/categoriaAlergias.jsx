// src/constants/allergies.js

export const ALLERGY_CATEGORIES = Object.freeze({
    ALIMENTARIA: { id: 'ALIMENTARIA', label: 'Alimentaria', icon: '🥛' },
    RESPIRATORIA: { id: 'RESPIRATORIA', label: 'Respiratoria / Ambiental', icon: '🍃' },
    DERMATOLOGICA: { id: 'DERMATOLOGICA', label: 'Dermatológica / Piel', icon: '🧼' },
    INSECTO: { id: 'INSECTO', label: 'Picaduras de Insectos', icon: '🐝' },
    MEDICAMENTO: { id: 'MEDICAMENTO', label: 'Medicamentos', icon: '💊' }
});

// Utilidad por si necesitas renderizar solo una lista limpia en selectores o filtros
export const ALLERGY_CATEGORIES_LIST = Object.values(ALLERGY_CATEGORIES);