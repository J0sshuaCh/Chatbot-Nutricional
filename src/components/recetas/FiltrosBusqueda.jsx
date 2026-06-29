import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { SeccionFiltro } from "./Busquedad/SeccionFiltro";
import { CheckboxOpcion } from "./Busquedad/CheckboxOpcion";
import { PillOpcion } from "./Busquedad/PillOpcion";
import { Input } from "../ui/Input";
import { useAuth } from "../../lib/AuthContext";
import { useAlergiasAlimentarias } from "../../hook/useAllergiesQuery";
import { ETAPAS_EDAD, ETAPAS_EDAD_LIST } from "../../constant/etapas";
import { TIPOS_COMIDA_LIST } from "../../constant/tipoComida";

export default function FiltrosBusqueda({ onChange }) {
    const { user: authUser } = useAuth()
    const { data: alergiasAlimentarias, isLoading: isLoadingAlergiasAlimentarias } = useAlergiasAlimentarias(authUser?.id, false);

    const [busqueda, setBusqueda] = useState("");
    const [seccionesAbiertas, setSeccionesAbiertas] = useState({
        edad: true,
        comida: true,
        alergenos: true,
    });

    const [etapasSeleccionadas, setEtapasSeleccionadas] = useState([]);
    const [comidasSeleccionadas, setComidasSeleccionadas] = useState([]);
    const [alergenosExcluidos, setAlergenosExcluidos] = useState([]);

    const toggleSeccion = (seccion) =>
        setSeccionesAbiertas((prev) => ({ ...prev, [seccion]: !prev[seccion] }));

    const toggleEnLista = (lista, setLista, id) => {
        setLista(
            lista.includes(id) ? lista.filter((item) => item !== id) : [...lista, id]
        );
    };

    // Notifica al padre cada vez que cambia algún filtro (opcional)
    const emitirCambios = (overrides = {}) => {
        if (!onChange) return;
        onChange({
            busqueda,
            etapas: etapasSeleccionadas,
            tiposComida: comidasSeleccionadas,
            alergenosExcluidos,
            ...overrides,
        });
    };

    // 2. Funciones controladoras específicas que calculan el cambio y emiten en el acto:
    const manejarCambioEtapa = (label) => {
        const proximasEtapas = etapasSeleccionadas.includes(label)
            ? etapasSeleccionadas.filter((item) => item !== label)
            : [...etapasSeleccionadas, label];

        setEtapasSeleccionadas(proximasEtapas);
        emitirCambios({ etapas: proximasEtapas }); // Se envía modificado al padre al instante
    };

    const manejarCambioComida = (dbValue) => {
        const proximasComidas = comidasSeleccionadas.includes(dbValue)
            ? comidasSeleccionadas.filter((item) => item !== dbValue)
            : [...comidasSeleccionadas, dbValue];

        setComidasSeleccionadas(proximasComidas);
        emitirCambios({ tiposComida: proximasComidas });
    };

    const manejarCambioAlergenos = (descrip) => {
        const proximosAlergenos = alergenosExcluidos.includes(descrip)
            ? alergenosExcluidos.filter((item) => item !== descrip)
            : [...alergenosExcluidos, descrip];

        setAlergenosExcluidos(proximosAlergenos);
        emitirCambios({ alergenosExcluidos: proximosAlergenos });
    };
    
    return (
        <div className="bg-card py-4 pl-4 md:py-6 md:pl-4 pr-0.5 rounded-xl shadow-lg border border-primary/30 w-full flex flex-col h-[75vh] min-h-[400px] ">
            <div className="overflow-y-auto pr-2 scrollbar-thin [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full">

                {/* Título */}
                <h2 className="text-xl font-bold text-foreground mb-4">
                    Filtros y Búsqueda
                </h2>

                {/* Buscador */}
                <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        type="text"
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            emitirCambios({ busqueda: e.target.value });
                        }}
                        placeholder="Buscar recetas..."
                        className="pl-9"

                    />

                </div>

                {/* Etapa de Edad */}
                <SeccionFiltro
                    icono="🍼"
                    titulo="Etapa de Edad"
                    abierta={seccionesAbiertas.edad}
                    onToggle={() => toggleSeccion("edad")}
                >
                    <div className="flex flex-col">
                        {ETAPAS_EDAD_LIST.map((etapa) => (
                            <CheckboxOpcion
                                key={etapa.id}
                                label={etapa.label}
                                // Cambiado: Ahora verifica por el label ("6-8 meses")
                                checked={etapasSeleccionadas.includes(etapa.label)}
                                onChange={() => manejarCambioEtapa(etapa.label)} // <-- Conectado
                            />
                        ))}
                    </div>
                </SeccionFiltro>

                {/* Tipo de Comida */}
                <SeccionFiltro
                    icono="🍽️"
                    titulo="Tipo de Comida"
                    abierta={seccionesAbiertas.comida}
                    onToggle={() => toggleSeccion("comida")}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {TIPOS_COMIDA_LIST.map((tipo) => (
                            <PillOpcion
                                key={tipo.id}
                                label={tipo.label}
                                // Cambiado: Ahora verifica por el valor de la BD (ej: "Desayuno")
                                checked={comidasSeleccionadas.includes(tipo.dbValue)}
                                onChange={() => manejarCambioComida(tipo.dbValue)} // <-- Conectado
                            />
                        ))}
                    </div>
                </SeccionFiltro>

                {/* Alérgenos (Excluir) */}
                <SeccionFiltro
                    icono="🚫"
                    titulo="Alérgenos (Excluir)"
                    abierta={seccionesAbiertas.alergenos}
                    onToggle={() => toggleSeccion("alergenos")}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {alergiasAlimentarias?.map((alergeno) => (
                            <PillOpcion
                                key={alergeno.id_alergia}
                                label={alergeno.descrip_alergia}
                                variante="alergeno"
                                checked={alergenosExcluidos.includes(alergeno.descrip_alergia)}
                                onChange={() => manejarCambioAlergenos(alergeno.descrip_alergia)}
                            />
                        ))}
                    </div>
                </SeccionFiltro>
            </div>

        </div>
    );
}