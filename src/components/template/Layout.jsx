import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar';
import { Encabezado } from '../Encabezado';

export const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        // Quitamos cualquier restricción de ancho
        <div className='flex flex-col md:flex-row min-h-screen  bg-muted/30'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Agregamos inline-block o min-w-max para que el contenido "empuje" las paredes */}
            <main className={`flex flex-col flex-1 transition-all duration-200 p-8  ${isOpen ? "md:ml-66" : "md:ml-20"}`}>

                <Encabezado />
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
