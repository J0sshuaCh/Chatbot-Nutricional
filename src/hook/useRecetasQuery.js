import { useQuery } from "@tanstack/react-query";
import { getRecetasConIngredientes } from "../services/recetasService";


export const useRecetas = () => {
  return useQuery({
    queryKey: ['recetas', 'completo'],
    queryFn: getRecetasConIngredientes,
    staleTime: 1000 * 60 * 5, // La data se considera fresca por 5 minutos
  });
};
