import { create } from 'zustand'
import { supabase } from '../supabase/client'


export const useAuthStore = create((set) => ({
    isAuth: false,
    signInWithGoogle: async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/manager-baby`,
                    queryParams: {
                        prompt: 'select_account',
                        access_type: 'offline',
                    },
                }
            })

        } catch (err) {
            console.error(err)
        }
    },

    signOut: async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            else set({ isAuth: false })
        } catch (err) {
            console.error(err)
        }
    }
}))
