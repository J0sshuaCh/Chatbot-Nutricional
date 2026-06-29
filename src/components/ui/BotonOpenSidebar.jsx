

export const BotonOpenSidebar = ({ estado, action, icono: Icon, style }) => {

    const styleBasic = 'p-2.5 bg-card border border-border hover:bg-accent rounded-full shadow-lg transition-colors'
    if (!Icon) return null;


    return (
        <button
            onClick={action}
            className={`${styleBasic} ${style}`}
        >
            <Icon
                size={20}
                className={`text-foreground transition-transform duration-300 ${estado ? "-rotate-180" : "rotate-0"}`}
            />
        </button>
    )
}
