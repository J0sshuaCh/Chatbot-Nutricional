import React from 'react';

export const BabyNina = ({ size = 60, ...props }) => {
    return (
        <svg
            xmlns="http://w3.org"
            viewBox="0 0 100 100"
            width={size}
            height={size}
            {...props}
        >
            {/* Fondo circular suave */}
            <circle cx="50" cy="50" r="46" fill="#FCECEF" />

            {/* Cara de la Bebé */}
            <circle cx="50" cy="54" r="22" fill="#FCD3B6" />

            {/* Orejas */}
            <circle cx="26" cy="55" r="5" fill="#FCD3B6" />
            <circle cx="74" cy="55" r="5" fill="#FCD3B6" />

            {/* Cabello / Flequillo */}
            <path d="M28,48 Q40,36 50,45 Q60,36 72,48 Q50,30 28,48 Z" fill="#A0522D" />

            {/* Diadema Rosa */}
            <path d="M27,51 Q50,39 73,51" stroke="#F194B4" stroke-width="4" stroke-linecap="round" fill="none" />

            {/* Lazo Rosa (Moño) */}
            <path d="M30,38 Q22,34 26,44 Z" fill="#E85A8A" />
            <path d="M36,42 Q44,38 34,34 Z" fill="#E85A8A" />
            <circle cx="33" cy="39" r="2.5" fill="#C73E6A" />

            {/* Ojos Grandes con Pestañas */}
            {/* Ojo Izquierdo */}
            <circle cx="41" cy="56" r="4.5" fill="#2C3E50" />
            <path d="M36,54 Q38,51 42,52" stroke="#2C3E50" stroke-width="1" stroke-linecap="round" fill="none" />
            {/* Ojo Derecho */}
            <circle cx="59" cy="56" r="4.5" fill="#2C3E50" />
            <path d="M64,54 Q62,51 58,52" stroke="#2C3E50" stroke-width="1" stroke-linecap="round" fill="none" />

            {/* Brillos de los ojos */}
            <circle cx="39.5" cy="54.5" r="1.5" fill="#FFFFFF" />
            <circle cx="57.5" cy="54.5" r="1.5" fill="#FFFFFF" />
            <circle cx="42.5" cy="57.5" r="0.6" fill="#FFFFFF" />
            <circle cx="60.5" cy="57.5" r="0.6" fill="#FFFFFF" />

            {/* Mejillas Rosadas */}
            <circle cx="34" cy="61" r="3.5" fill="#F2A3A1" opacity="0.7" />
            <circle cx="66" cy="61" r="3.5" fill="#F2A3A1" opacity="0.7" />

            {/* Sonrisa */}
            <path d="M46,64 Q50,68 54,64" stroke="#2C3E50" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </svg>
    );
};
