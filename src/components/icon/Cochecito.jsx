const Cochecito = ({ size = 18, color = "#4F46E5" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Cuerpo */}
            <path
                d="M18 20H42C46 20 48 22 48 26V34C48 40 43 45 37 45H27C21 45 16 40 16 34V22C16 20.9 16.9 20 18 20Z"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Capota */}
            <path
                d="M16 20L28 8L36 20"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22 14L32 20"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Manillar */}
            <path
                d="M48 22H54V16C54 14.9 54.9 14 56 14H58"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Soportes */}
            <path
                d="M24 45L18 54"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <path
                d="M40 45L46 54"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Ruedas */}
            <circle
                cx="16"
                cy="56"
                r="5"
                stroke={color}
                strokeWidth="2.5"
            />
            <circle
                cx="48"
                cy="56"
                r="5"
                stroke={color}
                strokeWidth="2.5"
            />

            {/* Centros de ruedas */}
            <circle cx="16" cy="56" r="1.5" fill={color} />
            <circle cx="48" cy="56" r="1.5" fill={color} />
        </svg>
    );
};

export default Cochecito;