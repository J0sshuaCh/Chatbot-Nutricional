import React from 'react';
import { Lineal } from './Lineal';

export const ContainerGraficas = ({ controlesBebe = [] }) => {
    // Ordenamos cronológicamente por meses para evitar que la línea retroceda si los datos vienen desordenados
    const controlesOrdenados = [...controlesBebe].sort((a, b) => a.edad_meses_en_control - b.edad_meses_en_control);

    // Mapeamos las etiquetas con formato claro
    const labels = controlesOrdenados.map(item => `Mes ${item.edad_meses_en_control}`);
    const data = controlesOrdenados.map(item => item.peso);

    const dataGrafica = {
        labels,
        datasets: [
            {
                label: 'Evolución de Peso',
                data,
                fill: true,
                tension: 0.4, // Curva orgánica moderna, no ángulos rígidos de 90°
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    // Usamos formato RGBA del color #7c3aed (124, 58, 237) para las transparencias
                    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.25)'); // Morado sutil arriba
                    gradient.addColorStop(1, 'rgba(124, 58, 237, 0.0)');  // Desvanecido a transparente abajo
                    return gradient;
                },
                // 2. Color de la línea principal (Morado sólido)
                borderColor: '#7c3aed',
                borderWidth: 3,
                // 3. Estilización de los puntos en los nodos de la gráfica
                pointBackgroundColor: '#ffffff',      // Fondo blanco para resaltar el punto
                pointBorderColor: '#7c3aed',          // Borde morado
                pointBorderWidth: 2,
                pointRadius: 5,                       // Tamaño del punto en reposo
                pointHoverRadius: 7,                  // El punto se agranda al pasar el cursor
                pointHoverBackgroundColor: '#7c3aed', // Se llena de morado en hover
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
            },
        ],
    };

    if (controlesBebe.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-muted/50 rounded-xl border border-dashed border-border">
                <p className="text-sm font-medium">No hay controles registrados para este bebé.</p>
            </div>
        );
    }

    return (

        <div className="">
            <Lineal data={dataGrafica} />
        </div>

    );
};
