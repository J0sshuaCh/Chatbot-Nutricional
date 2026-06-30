import { useMemo, useState } from "react";
import { ContainerLista } from "../components/recetas/ContainerLista";
import FiltrosBusqueda from "../components/recetas/FiltrosBusqueda";
import { useRecetas } from "../hook/useRecetasQuery";
import { MAPA_ALERGENOS_PRO } from "../constant/mapaAlergenos";


export const RecipesPage = () => {
    const { data: recetas, isLoading } = useRecetas()
    // 1. Estado para almacenar los filtros activos que vienen del hijo
    const [filtros, setFiltros] = useState({
        busqueda: "",
        etapas: [],
        tiposComida: [],
        alergenosExcluidos: [],
    });

    // 2. Función que recibe los cambios del hijo y actualiza el estado
    const manejarCambioFiltros = (nuevosFiltros) => {
        setFiltros(nuevosFiltros);
    };

    console.log(recetas)
    // 3. Filtrado lógico (useMemo optimiza el rendimiento al evitar recálculos innecesarios)
    const recetasFiltradas = useMemo(() => {
        // SOLUCIÓN: Si recetas es undefined (porque está cargando), usamos un arreglo vacío []
        return (recetas || []).filter((receta) => {

            // --- Filtro A: Búsqueda por texto ---
            if (filtros.busqueda) {
                const termino = filtros.busqueda.toLowerCase();
                // Aseguramos que descrip exista antes de usar toLowerCase
                const coincideNombre = receta.titulo?.toLowerCase().includes(termino);
                if (!coincideNombre) return false;
            }

            // --- Filtro B: Etapas de Edad (rangoMeses) ---
            if (filtros.etapas.length > 0) {
                const coincideEtapa = filtros.etapas.includes(receta["rangoMeses"]);
                if (!coincideEtapa) return false;
            }

            // --- Filtro C: Tipo de Comida ---
            if (filtros.tiposComida.length > 0) {
                const coincideComida = filtros.tiposComida.includes(receta.tipoComida);
                if (!coincideComida) return false;
            }

            if (filtros.alergenosExcluidos.length > 0) {

                const todasLasPalabrasProhibidas = filtros.alergenosExcluidos.flatMap(alergeno => {
                    // .trim() elimina espacios al inicio/final y reemplaza múltiples espacios por uno solo
                    const key = alergeno.toLowerCase().replace(/\s+/g, ' ').trim();

                    // Si coincide con "proteina de leche de vaca (aplv)", traerá toda la lista de lácteos
                    if (MAPA_ALERGENOS_PRO[key]) {
                        return MAPA_ALERGENOS_PRO[key];
                    }

                    // Salvaguarda por si el alérgeno no está en el mapa
                    return key.replace(/\s+y\s+|\/|,|-/g, " ").split(/\s+/).filter(p => p.length > 2);
                });

                const contieneElementoPeligroso = receta.ingredientes?.some((ingrediente) => {
                    const nombreIngrediente = ingrediente.nombre.toLowerCase();
                    return todasLasPalabrasProhibidas.some(palabraProhibida =>
                        nombreIngrediente.includes(palabraProhibida)
                    );
                });

                if (contieneElementoPeligroso) return false;
            }

            return true;
        });
    }, [filtros, recetas]);

    console.log(filtros)
    return (
        // Contenedor principal: Se apila en móvil (flex-col) y va lado a lado en escritorio (md:flex-row)
        <div className="flex flex-col lg:flex-row gap-6 py-6">

            {/* BUSQUEDAD Y FILTROS*/}
            <div className="w-full lg:w-80 lg:sticky lg:top-6 self-start ">
                <FiltrosBusqueda
                    onChange={manejarCambioFiltros}
                />
            </div>

            {/* COLUMNA DERECHA: Gestión de Alergias (Crece y hace scroll) */}
            <div className="flex-1 w-full space-y-6 min-h-screen">

                <div className="bg-card p-3 sm:p-6 rounded-xl shadow-lg border-border">
                    <div className="flex flex-row items-center gap-2 mb-2">

                        <h1 className="text-xl font-bold text-foreground">Lista de recetas
                        </h1>
                        <span className=" text-2xl font-bold text-foreground"> ({(recetas?.length || 0)} recetas)</span>
                    </div>
                    {/* Aquí van tus secciones de añadir, crear y listar alergias */}
                    <ContainerLista
                        recetas={recetasFiltradas}
                        isLoading={isLoading}
                    />
                </div>

            </div>

        </div>
    )
}
