import React from "react";

export const BotonIcon = ({
    value,
    icon: Icon,
    onAction,
    variant = "default",
    style = ""
}) => {

    const baseStyle = "flex items-center justify-center cursor-pointer transition-all duration-100 active:scale-95 shadow-md";

    const variants = {
        default: "text-slate-600 hover:text-slate-900 transition-text duration-200",
        edit: "text-blue-400  hover:text-blue-600 transition-text duration-200",
        delete: "text-pink-400  hover:text-pink-700 transition-text duration-200",
    };
    // Si hay 'value', usamos sus colores, si no, un gris neutro moderno

    const customColors = value
        ? `${value.bg} ${value.text} hover:brightness-102 border-none`
        : "p-0 bg-transparente  ";

    const finalVariantStyle = (variant !== "default") ? variants[variant] : customColors;

    if (!Icon) return null;
    return (
        <div>
            <button
                type="button"
                onClick={onAction}
                className={`${baseStyle} ${finalVariantStyle} ${style}`}
            >
                <Icon size={25} strokeWidth={2} />
            </button>
        </div>
    );
};
