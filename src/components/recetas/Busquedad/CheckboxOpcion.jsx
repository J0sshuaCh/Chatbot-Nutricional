export function CheckboxOpcion({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer hidden"
            />
            <span
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked
                    ? "bg-zinc-900 border-zinc-900 dark:bg-zinc-700 dark:border-zinc-700"
                    : "border-zinc-300 group-hover:border-zinc-400 dark:border-zinc-600 dark:group-hover:border-zinc-500"
                    }`}
            >
                {checked && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-2.5 h-2.5"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </span>
            <span className="text-sm text-foreground">{label}</span>
        </label>
    );
}