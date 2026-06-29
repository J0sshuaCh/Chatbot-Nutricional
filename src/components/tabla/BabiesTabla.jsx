import React from 'react';
import { BabyNino } from '../icon/BabyNino';
import { BabyNina } from '../icon/BabyNina';
import { BotonIcon } from '../ui/BotonIcon';
import { Edit2, Trash2 } from 'lucide-react' // 👈 Asegúrate de importar tus componentes de icono
import Swal from 'sweetalert2';
import { calculateAge } from '../../utils/calculateAge';
import { Loading } from '../ui/Loading';

export default function BabiesTabla({
  babies,
  isLoading,
  setBabySelect,
  action,
  onDelete,
}) {

  // Función para formatear la fecha al estilo "July 15, 2023"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Agregamos timeZone: 'UTC' para que no convierta la fecha a tu horario local
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const actionEdit = (row) => {
    setBabySelect(row)
    action()
  };

  const handleDeleteConfirm = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Color rojo Tailwind
      cancelButtonColor: '#6b7280',  // Color gris Tailwind
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl font-sans', // Se adapta a tus estilos limpios
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se ejecuta tu función original
        onDelete(id);

        // Toast opcional de éxito
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El registro ha sido borrado.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    /* 1. Marcamos el envoltorio principal como contenedor de referencia */
    <div className="@container bg-card rounded-[2rem] @md:rounded-[2.5rem] pt-8 p-6 @md:pt-6 @md:p-8 shadow-lg border-border">

      <h2 className="text-xl @md:text-2xl font-bold text-foreground mb-6">
        Tabla de Bebés
      </h2>

      <div className="flex flex-col gap-5">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {babies && babies.map((baby) => (
              <div
                key={baby.id}
                /* Cambia de fila a columna según el tamaño del contenedor */
                className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-4 py-4 border-b border-border last:border-b-0"
              >
                {/* Sección Izquierda: Avatar e Información básica */}
                <div className="flex items-center gap-4 min-w-0 @md:min-w-[200px]">
                  <div className="w-14 h-14 @md:w-16 @sm:h-16 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0">
                    {baby.genero === 'M' ? (
                      <BabyNino className="w-full h-full object-cover" />
                    ) : (
                      <BabyNina className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base @md:text-lg text-foreground truncate">{baby.name}</h3>
                      {baby.genero === 'M' && <span className="text-base shrink-0">👶🏼</span>}
                    </div>
                    <p className="text-muted-foreground font-medium text-sm">
                      {calculateAge(baby.fecha_nacimiento)}
                    </p>
                  </div>
                </div>

                {/* Sección Central: Badge de color y fecha */}
                <div className="flex flex-row @lg:flex-col gap-2 @md:gap-1 items-center justify-between ">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap text-foreground ${baby.genero === "M" ? 'bg-secondary/20' : 'bg-primary/10'}`}>
                    Profile color
                  </span>
                  <span className="text-foreground font-medium text-sm whitespace-nowrap">
                    {formatDate(baby.fecha_nacimiento)}
                  </span>
                </div>

                {/* Sección Derecha: Acciones */}
                <div className="flex items-center justify-end gap-3 mt-2 @md:mt-0">
                  <BotonIcon
                    variant="edit"
                    icon={Edit2}
                    onAction={() => actionEdit(baby)}
                    style="bg-secondary/20 hover:bg-secondary/30 text-foreground p-3 @md:p-3.5 rounded-full transition-colors"
                  />

                  <BotonIcon
                    variant="delete"
                    icon={Trash2}
                    onAction={() => handleDeleteConfirm(baby.id_bebe)}
                    style="bg-primary/10 hover:bg-primary/20 text-foreground p-3 @md:p-3.5 rounded-full transition-colors"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}