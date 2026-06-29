import React from 'react'
import { ItemReceta } from './ItemReceta'
import { Loading } from '../ui/Loading'


export const ContainerLista = ({ recetas, isLoading }) => {

    return (
        <div className="w-full max-w-7xl mx-auto">
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {recetas && recetas.length === 0 ? (
                            <p className="text-gray-500 text-center py-10">No se encontraron recetas.</p>
                        ) : (
                            <div className="flex flex-wrap gap-6 justify-start items-stretch">
                                {recetas?.map((receta) => (
                                    <ItemReceta key={receta.id} receta={receta} />
                                ))}
                            </div>
                        )}
                    </>
                )
            }
        </div >
    )
}
