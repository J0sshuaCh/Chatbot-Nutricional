import { create } from 'zustand'

export const useBabySelectStore = create((set) => ({
    babySelect: {},

    setBabySelect: (row) => {
        set({ babySelect: row })
    },

    // Agregamos esta función para limpiar el estado
    resetBabySelect: () => {
        set({ babySelect: {} })
    }
}))
