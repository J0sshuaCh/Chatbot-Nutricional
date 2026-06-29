import React from 'react'
import { NavLink } from 'react-router-dom'

export const Enlace = ({ ruta, children, icono: Icon, estado, action, name, isMobil }) => {

    return (
        <li className='relative list-none w-full group text-lg '>
            <NavLink
                to={ruta}
                onClick={action}
                className={({ isActive }) => `
                    flex  py-6 px-4  items-center transition-all hover:bg-bg-gray hover:text-bg-primary md:py-3 rounded-2xl
                    ${!estado ? "justify-center gap-0" : "gap-3"}
                    ${isActive ? "bg-bg-gray" : ""}
                `}
            >
                {({ isActive }) => (
                    <>
                        {Icon && <Icon
                            className={`${isActive ? "text-bg-primary" : "text-foreground"}`}
                        />}

                        <span className={isActive ? "text-bg-primary font-medium" : "text-foreground"}>
                            {children}
                        </span>
                    </>
                )}
            </NavLink>

            {!estado && isMobil === false && (
                <div className='fixed left-15 ml-7 -mt-10 px-3 py-1.5 
     text-bg-primary text-xs font-semibold
    rounded-lg border border-bg-azul2 
    shadow-[0_0_3px_var(--color-bg-azul2)]
    invisible opacity-0 -translate-x-2 transition-all duration-200
    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    pointer-events-none whitespace-nowrap
    flex items-center justify-center'>

                    {name}
                </div>
            )}
        </li>
    )
}
