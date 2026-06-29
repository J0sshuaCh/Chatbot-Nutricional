import React from 'react'

export const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground font-medium">Cargando...</span>
        </div>
    )
}
