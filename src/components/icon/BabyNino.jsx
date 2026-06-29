import React from 'react';

export const BabyNino = ({ size = 60, ...props }) => {
    return (
        <svg
            xmlns="http://w3.org"
            viewBox="0 0 100 100"
            width={size}
            height={size}
            {...props}
        >
            {/* Fondo circular suave */}
            <circle cx="50" cy="50" r="46" fill="#E8F4F8" />

            {/* Cara del Bebé */}
            <circle cx="50" cy="55" r="22" fill="#FCD3B6" />

            {/* Orejas */}
            <circle cx="26" cy="56" r="5" fill="#FCD3B6" />
            <circle cx="74" cy="56" r="5" fill="#FCD3B6" />

            {/* Gorrito Celeste */}
            <path d="M26,52 C24,30 76,30 74,52 C65,42 35,42 26,52 Z" fill="#7BC4C4" />
            <path d="M25,50 Q50,44 75,50 Q75,55 70,55 Q50,49 30,55 Q25,55 25,50 Z" fill="#59A5A5" />

            {/* Estrella en el gorro */}
            <polygon points="50,32 52,36 57,36 53,39 55,44 50,41 45,44 47,39 43,36 48,36" fill="#F4D068" />

            {/* Ojos Grandes */}
            <circle cx="41" cy="56" r="4.5" fill="#2C3E50" />
            <circle cx="59" cy="56" r="4.5" fill="#2C3E50" />

            {/* Brillo de los ojos */}
            <circle cx="39.5" cy="54.5" r="1.5" fill="#FFFFFF" />
            <circle cx="57.5" cy="54.5" r="1.5" fill="#FFFFFF" />
            <circle cx="42.5" cy="57.5" r="0.6" fill="#FFFFFF" />
            <circle cx="60.5" cy="57.5" r="0.6" fill="#FFFFFF" />

            {/* Mejillas Rosadas */}
            <circle cx="34" cy="60" r="3" fill="#F2A3A1" opacity="0.6" />
            <circle cx="66" cy="60" r="3" fill="#F2A3A1" opacity="0.6" />

            {/* Sonrisa */}
            <path d="M46,63 Q50,67 54,63" stroke="#2C3E50" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </svg>
    );
};
