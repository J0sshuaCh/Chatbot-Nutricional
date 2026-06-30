// src/constants/comidas.js

export const TIPOS_COMIDA = Object.freeze({
    DESAYUNO: { id: "desayunos", label: "Desayunos", dbValue: "Desayuno" },
    MERIENDA: { id: "meriendas", label: "Meriendas", dbValue: "Merienda" },
    CENA: { id: "cenas", label: "Cenas", dbValue: "Cena" },
    ALMUERZO: { id: "almuerzos", label: "Almuerzos", dbValue: "Almuerzo" } // Agregado por si lo necesitas
});

export const TIPOS_COMIDA_LIST = Object.values(TIPOS_COMIDA);
