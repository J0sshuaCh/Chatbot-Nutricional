import { useBebes } from "../../hook/useBabiesQuery";
import { Loading } from "../ui/Loading";
import { BabyNino } from "../icon/BabyNino";
import { BabyNina } from "../icon/BabyNina";
import { calculateAge } from "../../utils/calculateAge";

export const ProfileBabyCard = () => {
    const { data: babies, isLoading } = useBebes();
    const firstThreeBabies = babies?.slice(0, 3) || [];

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getFirstName = (fullName) => {
        if (!fullName) return '';
        return fullName.trim().split(' ')[0];
    };

    return (
        /* 1. Definimos este div como el contenedor de referencia */
        <div className="@container">
            {/* Usamos @sm: para breakpoints basados en el contenedor */}
            <h2 className="text-xl @sm:text-2xl font-bold text-foreground mb-6">
                Perfiles de Bebés
            </h2>

            <div className="flex flex-col gap-5">
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {firstThreeBabies.map((baby, index) => (
                            <div
                                key={baby.id}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ");
                                }}
                                /* Cambios de sm: a @sm: para adaptar la tarjeta al contenedor */
                                                className={`flex flex-col @sm:flex-row @sm:items-center @sm:justify-between gap-3 @sm:gap-4 py-4 px-2 -mx-2 rounded-xl transition-colors hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${index !== firstThreeBabies.length - 1 ? "border-b border-border" : ""
                                                    }`}
                            >
                                {/* Sección Izquierda: Avatar e Información básica */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-14 h-14 @sm:w-16 @sm:h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0">
                                        {baby.genero === 'M' ? (
                                            <BabyNino className="w-full h-full object-cover" />
                                        ) : (
                                            <BabyNina className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-bold text-base @sm:text-lg text-foreground truncate">
                                                {getFirstName(baby.name)}
                                            </h3>
                                            {baby.genero === 'M' && (
                                                <span className="text-base shrink-0">👶🏼</span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground font-medium text-sm">
                                            {calculateAge(baby.fecha_nacimiento)}
                                        </p>
                                    </div>
                                </div>

                                {/* Sección Derecha: Badge de color y fecha */}
                                <div className="flex flex-row @sm:flex-col items-center @sm:items-end justify-between @sm:justify-start gap-1 @sm:pl-0 @sm:text-right shrink-0">
                                    <span
                                        className={`px-3 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap text-foreground ${baby.genero === "M" ? "bg-secondary/20" : "bg-primary/10"
                                            }`}
                                    >
                                        Nacimiento
                                    </span>
                                    <span className="text-foreground font-medium text-sm whitespace-nowrap">
                                        {formatDate(baby.fecha_nacimiento)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};