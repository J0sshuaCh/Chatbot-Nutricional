

export const BotonOpenSidebar = ({ estado, action, icono: Icon, style }) => {

    const styleBasic = 'p-2.5 bg-white border border-gray-200 hover:bg-bg-secondary rounded-full shadow-lg transition-colors'
    if (!Icon) return null;


    return (
        <button
            onClick={action}
            className={`${styleBasic} ${style}`}
        >
            <Icon
                size={20}
                className={` transition-transform duration-300 ${estado ? "-rotate-180" : "rotate-0"}`}
            />
        </button>
    )
}
