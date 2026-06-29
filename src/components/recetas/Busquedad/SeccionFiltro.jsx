import { ChevronDown } from "lucide-react";

export function SeccionFiltro({ icono, titulo, abierta, onToggle, children }) {
    return (
        <div className="border-b border-zinc-100 last:border-b-0 py-4 ">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between cursor-pointer"
            >
                <span className="flex items-center gap-2 text-base font-semibold text-zinc-900">
                    <span className="text-lg">{icono}</span>
                    {titulo}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${abierta ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`grid transition-all duration-200 ease-in-out ${abierta ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                    }`}
                style={{ display: "grid" }}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    );
}