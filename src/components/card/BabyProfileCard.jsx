import React from 'react'
import { Calendar, Weight, Droplet, Ruler, UserCheck, ArrowUpCircle } from 'lucide-react'
import { BabyNina } from '../icon/BabyNina'
import { BabyNino } from '../icon/BabyNino'
import { calculateAge } from '../../utils/calculateAge'
import { useAnalisisBebe } from '../../hook/useAnalisisQuery'
import { Loading } from '../ui/Loading'


export const BabyProfileCard = ({ babySelect }) => {
    const noHayBebeSeleccionado = !babySelect || Object.keys(babySelect).length === 0;
    // 1. Llamada al hook de TanStack Query
    const { data: analisis, isLoading } = useAnalisisBebe(babySelect?.id_bebe);

    // 2. Extracción del control más reciente
    const ultimoControl = analisis && analisis.length > 0 ? analisis[0] : null;

    // 3. Valores por defecto corregidos sin llaves inválidas
    const nombre = babySelect?.name || '[Nombre del Bebé]'
    const edad = calculateAge(babySelect?.fecha_nacimiento) || '[Edad]'
    const peso = ultimoControl?.peso ? `${ultimoControl.peso} kg` : '0 Peso'
    const talla = ultimoControl?.talla ? `${ultimoControl.talla} cm` : '0 Talla'
    const genero = babySelect?.genero || 'niño' // 'niño' o 'niña'

    // 2. Estilos dinámicos según el género del bebé seleccionado
    const esNina = genero === 'F'

    // Fondo del encabezado (celeste para niño, rosa/pastel para niña)
    const headerBgColor = esNina ? 'bg-baby-pink' : 'bg-baby-blue'

    // Fondo del círculo del avatar
    const avatarBgColor = 'bg-bg-dorado'

    return (
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-md border border-slate-100 ">

            {/* ENCABEZADO SEMICIRCULAR */}
            <div className={`h-24 ${headerBgColor} rounded-b-[40%] transition-colors duration-300 relative`} />

            {/* AVATAR (Posicionado encima del corte del semicírculo) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <div className={`w-24 h-24 ${avatarBgColor} rounded-full border-4 border-white flex items-center justify-center shadow-sm overflow-hidden transition-colors duration-300`}>
                    {esNina ? <BabyNina className="w-16 h-16" /> : <BabyNino className="w-16 h-16" />}
                </div>
            </div>

            {/* CONTENIDO DE DATOS */}
            <div className="pt-14 p-6 text-center">


                {/* LISTA DE ATRIBUTOS */}
                <div className="space-y-3 text-left max-w-[200px] mx-auto text-slate-700 font-medium ">

                    {noHayBebeSeleccionado ? (
                        // CASO A: El usuario no ha seleccionado ningún bebé
                        <div className="flex flex-col items-center text-center space-y-1.5 animate-pulse py-2">
                            <p className="text-xs font-semibold text-slate-600">Por favor, elige un bebé</p>
                            <ArrowUpCircle className="w-6 h-6 text-bg-primary rotate-180" strokeWidth={1.5} />

                        </div>
                    ) : isLoading ? (
                        // CASO B: El bebé está seleccionado pero los datos se están cargando de Supabase
                        <Loading />
                    ) : (
                        // CASO C: Bebé seleccionado con datos listos para mostrar
                        <>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 transition-all text-center">
                                {nombre}
                            </h2>
                            <div className="space-y-3 text-left text-slate-700 font-medium w-full">
                                {/* Edad */}
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-7 h-7 text-slate-400 fill-slate-100" strokeWidth={2} />
                                    <span className="text-slate-600 text-sm">{edad || 'Edad no disponible'}</span>
                                </div>

                                {/* Peso */}
                                <div className="flex items-center gap-3">
                                    <Weight className="w-7 h-7 text-slate-400 fill-slate-100" strokeWidth={2} />
                                    <span className={`text-sm ${!ultimoControl?.peso ? 'text-slate-400 font-normal italic' : 'text-slate-600'}`}>
                                        {peso}
                                    </span>
                                </div>

                                {/* Talla */}
                                <div className="flex items-center gap-3">
                                    <Ruler className="w-7 h-7 text-slate-400 fill-slate-100" strokeWidth={2} />
                                    <span className={`text-sm ${!ultimoControl?.talla ? 'text-slate-400 font-normal italic' : 'text-slate-600'}`}>
                                        {talla}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
