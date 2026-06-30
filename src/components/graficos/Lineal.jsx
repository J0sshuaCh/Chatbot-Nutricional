import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler // Requerido para el sombreado inferior
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// El registro debe ir AFUERA del componente para evitar re-registros en cada render
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const Lineal = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que se adapte al contenedor flex/grid
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 12,
                    usePointStyle: true, // Leyenda con puntos circulares en vez de rectángulos
                    font: { size: 13, family: 'sans-serif', weight: '500' },
                    color: '#475569'
                }
            },
            tooltip: {
                backgroundColor: '#1e293b', // Fondo Slate-800 oscuro moderno
                titleColor: '#f8fafc',
                bodyColor: '#cbd5e1',
                padding: 12,
                cornerRadius: 10,
                displayColors: false, // Oculta el cuadro de color repetitivo en el tooltip
                callbacks: {
                    label: function (context) {
                        return ` Peso: ${context.parsed.y} kg`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false }, // Limpieza visual: sin líneas verticales
                title: {
                    display: true,
                    text: 'Edad (Meses)',
                    color: '#64748b',
                    font: { weight: '600' }
                },
                ticks: { color: '#64748b' }
            },
            y: {
                grid: { color: 'rgba(226, 232, 240, 0.6)', strokeDashArray: [4] }, // Líneas horizontales discontinuas y tenues
                title: {
                    display: true,
                    text: 'Peso (kg)',
                    color: '#64748b',
                    font: { weight: '600' }
                },
                ticks: { color: '#64748b' }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false, // El tooltip se activa al pasar cerca, no exige puntería exacta
        }
    };

    return (
        // Quitamos el md:w-1/2 para que use todo el ancho disponible del contenedor de la gráfica
        <div className="relative w-full h-72 md:h-96">
            <div className="absolute inset-0 w-full h-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};
