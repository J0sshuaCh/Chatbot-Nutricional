import React from 'react'
import { BotonPrimary } from '../components/ui/BotonPrimary'
import { GoogleIcon } from '../components/icon/GoogleIcon'
import { useAuthStore } from '../store/AuthStore'

export const Login = () => {

    const { signInWithGoogle } = useAuthStore()
    return (
        <div className='min-h-screen w-screen flex items-center justify-center bg-muted p-4'>
            <div className='w-full max-w-sm'>

                {/* Card */}
                <div className='bg-card border border-purple-100 rounded-xl p-8 shadow-sm'>
                    <span className='text-xs text-muted-foreground'>versión 1.0</span>

                    <div className='flex flex-col items-center gap-5 mt-5'>
                        {/* Logo */}
                        <div className='w-40 h-40 rounded-xl border-border bg-muted flex items-center justify-center'>
                            <img src='/android-chrome-512x512.png' alt='ANMI Logo' className='w-32 object-contain' />
                        </div>

                        {/* Heading */}
                        <div className='text-center space-y-1.5'>
                            <h1 className='text-xl font-semibold tracking-tight text-foreground'>ANMI</h1>
                            <p className='text-sm text-muted-foreground leading-relaxed max-w-[260px]'>
                                Gestiona y haz seguimiento a la nutrición y crecimiento de tu bebé.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className='w-full space-y-2 mt-1'>
                            <BotonPrimary style='google'
                                action={signInWithGoogle}
                            >
                                <GoogleIcon />
                                Continuar con Google
                            </BotonPrimary>

                            {/* Divisor */}
                            <div className='flex items-center gap-3 py-1'>
                                <div className='flex-1 h-px bg-border' />
                                <span className='text-[11px] uppercase tracking-wider text-muted-foreground'>o</span>
                                <div className='flex-1 h-px bg-border' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}