import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { ChevronRight, Menu, CircleHelp, Bot, MessageSquare } from 'lucide-react'
import { BotonOpenSidebar } from "./ui/BotonOpenSidebar";
import { navLinks } from "../constant/sidebarLinks";
import { Enlace } from "./ui/Enlace";

export const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const [isMobil, setIsMobil] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            // Si es menor a 400px, forzamos el cierre
            if (window.innerWidth < 768) {
                setIsOpen(false);
                setIsMobil(true)
            }
            if (window.innerWidth >= 768) {
                setIsMobil(false)
            }
        };
        // Ejecutamos al cargar para verificar el tamaño inicial
        handleResize();
        // Escuchamos el cambio de tamaño
        window.addEventListener('resize', handleResize);
        // Limpiamos el evento al desmontar el componente
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsOpen]);

    return (
        <header className={`sticky md:fixed top-0 left-0 md:h-screen z-100 transition-all duration-150 shadow-md bg-bg-sidebar
    md:${isOpen ? "w-60" : "w-22"}
        `}>
            <div className={`flex justify-between items-center relative bg-bg-sidebar transition-bg duration-150 md:justify-center `}>

                <Link to={'/manager-baby'} className={`flex py-4 px-4 items-center transition-all border-l-4 border-transparent ${isOpen && isMobil === false ? "py-8 px-7 gap-4" : "py-8 "}`}>

                    <div className={`animate-flotar2 w-10 `}>
                        <img src={'/android-chrome-512x512.png'} alt="" className='w-full h-full object-contain' />
                    </div>
                    {isOpen && isMobil === false && <span className='text-foreground text-xl font-bold '>ManagerBaby</span>}

                </Link>

                <BotonOpenSidebar
                    estado={isOpen}
                    action={() => setIsOpen(!isOpen)}
                    icono={isMobil ? Menu : ChevronRight}
                    style={`m-3 md:m-0 md:absolute -right-4 top-20`}
                />
            </div>

            {isMobil ?
                <nav className={`absolute w-full -z-20 shadow-md transition-all duration-200 bg-bg-sidebar 
                ${isOpen ? "top-26" : "-top-130"}`}>
                    <ul>
                        <div className={` flex flex-col items-center p-3 gap-3`}>
                            {navLinks.map(link => (
                                <Enlace
                                    key={link.id}
                                    ruta={link.path}
                                    name={link.name}
                                >
                                    {link.name}
                                </Enlace>
                            ))}
                        </div>

                    </ul>
                </nav>

                :
                <nav className='flex-1 h-full overflow-y-auto sidebar-scroll ' >
                    <ul className={`flex flex-col ${isOpen && "h-full"}`}>

                        <div className={`flex flex-col mt-10 p-3 gap-3 ${!isOpen && "items-center"}`}>
                            {navLinks.map(link => (
                                <Enlace
                                    key={link.id}
                                    ruta={link.path}
                                    icono={link.icon}
                                    estado={isOpen}
                                    name={link.name}
                                    isMobil={isMobil}
                                >
                                    {isOpen && link.name}
                                </Enlace>
                            ))}
                        </div>
                    </ul>
                </nav>}
        </header>
    )
}