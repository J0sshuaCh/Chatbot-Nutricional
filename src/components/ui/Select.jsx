import { useState, useRef, useEffect } from "react";
import { useBabySelectStore } from "../../store/BabySelectStore";

function CheckIcon() {
    return (
        <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="2.5,8.5 6,12 13.5,4.5" />
        </svg>
    );
}

function ChevronIcon({ open }) {
    return (
        <svg
            className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="3,5.5 8,10.5 13,5.5" />
        </svg>
    );
}

export default function Select({
    items = [],
    labelKey = "label",
    valueKey = null,
    placeholder = "Seleccionar...",
    badge = null,
    value,
    onChange,
    className = "",
}) {
    const resolvedValueKey = valueKey || labelKey;

    const { setBabySelect } = useBabySelectStore();
    const [open, setOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const isControlled = value !== undefined;
    const [internalSingle, setInternalSingle] = useState(null);

    const selected = isControlled ? value : internalSingle;
    const rootRef = useRef(null);

    // Cerrar al hacer click afuera
    useEffect(() => {
        function handleClickOutside(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Resetear el índice del hover cuando se abre/cierra
    useEffect(() => {
        if (!open) setHoveredIndex(-1);
    }, [open]);

    const getLabel = (item) =>
        typeof item === "string" ? item : item[labelKey];

    const getValue = (item) =>
        typeof item === "string" ? item : item[resolvedValueKey];

    const isSelected = (item) => {
        return selected && getValue(selected) === getValue(item);
    };

    const handleSelect = (item) => {
        if (!isControlled) setInternalSingle(item);
        onChange?.(item);
        setOpen(false);
        if (valueKey === "id_bebe") {
            setBabySelect(item);
        }
    };

    const triggerLabel = selected ? getLabel(selected) : placeholder;
    const isPlaceholderShown = !selected;

    // Manejo de navegación por teclado en el botón contenedor
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (open && hoveredIndex >= 0) {
                handleSelect(items[hoveredIndex]);
            } else {
                setOpen((o) => !o);
            }
        }
        if (e.key === "Escape") setOpen(false);
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) setOpen(true);
            setHoveredIndex((i) => Math.min(i + 1, items.length - 1));
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHoveredIndex((i) => Math.max(i - 1, 0));
        }
    };

    return (
        <div ref={rootRef} className={`relative w-full text-sm ${className}`}>

            {/* Trigger (Gatillador del Select) */}
            <div
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                tabIndex={0}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={handleKeyDown}
                className={`
                    w-full flex items-center justify-between gap-2
                    px-3 py-2.5 bg-white border cursor-pointer select-none
                    transition-colors duration-150 outline-none
                    ${open
                        ? "border-gray-400 rounded-t-lg rounded-b-none"
                        : "border-gray-300 rounded-lg hover:border-gray-400 hover:bg-slate-100/50"
                    }
                `}
            >
                <span className={isPlaceholderShown ? "text-gray-400" : "text-gray-900"}>
                    {triggerLabel}
                </span>
                <ChevronIcon open={open} />
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    role="listbox"
                    className="absolute top-full left-0 right-0 z-50 bg-white border border-t-0 border-gray-300 rounded-b-lg overflow-hidden shadow-md"
                >
                    {/* List */}
                    <div className="max-h-40 overflow-y-auto">
                        {items.length === 0 ? (
                            <p className="px-3 py-3 text-xs text-gray-400 text-center">
                                Sin opciones
                            </p>
                        ) : (
                            items.map((item, idx) => {
                                const active = isSelected(item);
                                const hovered = hoveredIndex === idx;
                                return (
                                    <div
                                        key={getValue(item)}
                                        role="option"
                                        aria-selected={active}
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setHoveredIndex(idx)}
                                        onMouseLeave={() => setHoveredIndex(-1)}
                                        className={`
                                            flex items-center gap-2 px-3 py-2.5 cursor-pointer text-sm transition-colors duration-100
                                            ${active
                                                ? "bg-blue-50 text-blue-700"
                                                : hovered
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-900"
                                            }
                                        `}
                                    >
                                        {/* Check o espacio reservado */}
                                        {active ? (
                                            <CheckIcon />
                                        ) : (
                                            <span className="w-3.5 h-3.5 shrink-0" />
                                        )}

                                        <span className="flex-1">{getLabel(item)}</span>

                                        {badge && (
                                            <span
                                                className={`
                                                    text-[11px] px-2 py-0.5 rounded-full border shrink-0
                                                    ${active
                                                        ? "bg-white/30 text-blue-700 border-transparent"
                                                        : "bg-gray-100 text-gray-500 border-gray-200"
                                                    }
                                                `}
                                            >
                                                {badge(item)}
                                            </span>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}