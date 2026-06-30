export function PillOpcion({ label, checked, onChange, variante = "default" }) {
    const estilos =
        variante === "alergeno"
            ? checked
                ? "bg-red-50 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-400"
                : "border-zinc-200 text-zinc-600 hover:border-red-200 hover:bg-red-50/50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-red-600 dark:hover:bg-red-950/30"
            : checked
                ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-700 dark:border-zinc-700"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50";

    return (
        <button
            type="button"
            onClick={onChange}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${estilos}`}
        >
            {label}
        </button>
    );
}