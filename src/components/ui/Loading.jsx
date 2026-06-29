import React from 'react'

export const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg-primary"></div>
            <span className="ml-3 text-gray-500 font-medium">Cargando...</span>
        </div>
    )
}
