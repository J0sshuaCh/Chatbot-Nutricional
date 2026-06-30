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
            className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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


export default function SearchableSelect({
    items = [],
    labelKey = "label",
    valueKey = null,
    placeholder = "Buscar...",
    badge = null,
    value,
    onChange,
    className = "",
}) {
    const resolvedValueKey = valueKey || labelKey;

    const { setBabySelect } = useBabySelectStore()
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const isControlled = value !== undefined;
    const [internalSingle, setInternalSingle] = useState(null);

    const selected = isControlled ? value : internalSingle;

    const rootRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
                setQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const getLabel = (item) =>
        typeof item === "string" ? item : item[labelKey];

    const getValue = (item) =>
        typeof item === "string" ? item : item[resolvedValueKey];

    const isSelected = (item) => {
        return selected && getValue(selected) === getValue(item);
    };

    const filtered = items.filter((item) =>
        getLabel(item).toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (item) => {
        if (!isControlled) setInternalSingle(item);
        onChange?.(item);
        setOpen(false);
        setQuery("");
        if (valueKey === "id_bebe") {
            setBabySelect(item)
        }
    };

    const triggerLabel = selected ? getLabel(selected) : placeholder;
    const isPlaceholderShown = !selected;

    return (
        <div ref={rootRef} className={`relative w-full text-sm ${className}`}>

            {/* Trigger */}
            <div
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                tabIndex={0}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
                    if (e.key === "Escape") setOpen(false);
                }}
                className={`
                    w-full flex items-center justify-between gap-2
                    px-2 bg-card border cursor-pointer select-none
                    text-foreground transition-colors duration-150 outline-none
                    ${open
                        ? "border-gray-400 rounded-t-lg rounded-b-none dark:border-gray-500"
                        : "border-gray-300 rounded-lg hover:border-gray-400 hover:bg-slate-100/50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800/50"
                    }
                `}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={triggerLabel}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setHoveredIndex(-1);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") { setOpen(false); setQuery(""); }
                        if (e.key === "ArrowDown") setHoveredIndex((i) => Math.min(i + 1, filtered.length - 1));
                        if (e.key === "ArrowUp") setHoveredIndex((i) => Math.max(i - 1, 0));
                        if (e.key === "Enter" && hoveredIndex >= 0) handleSelect(filtered[hoveredIndex]);
                    }}
                    //utilizar el  isPlaceholderShown para cambiar el color de placehol
                    className={`w-full px-3 py-2.5 text-sm bg-transparent text-foreground outline-none 
                         ${isPlaceholderShown ? "placeholder:text-muted-foreground" : "placeholder:text-primary"}`
                    }
                />
                <ChevronIcon open={open} />
            </div>

            {/* Dropdown */}
            {open && (
                <div
                    role="listbox"
                    className="absolute top-full left-0 right-0 z-50 bg-popover border border-t-0 border-border rounded-b-lg overflow-hidden shadow-sm"
                >
                    {/* List */}
                    <div className="max-h-40 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <p className="px-3 py-3 text-xs text-muted-foreground text-center">
                                Sin resultados
                            </p>
                        ) : (
                            filtered.map((item, idx) => {
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
                                                ? "bg-accent text-primary"
                                                : hovered
                                                    ? "bg-muted text-foreground"
                                                    : "text-foreground"
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
                                                        ? "bg-white/30 text-primary border-transparent dark:bg-white/10"
                                                        : "bg-muted text-muted-foreground border-border"
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