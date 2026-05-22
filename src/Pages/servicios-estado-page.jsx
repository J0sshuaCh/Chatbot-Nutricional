import { Link } from "react-router-dom";

const servicios = [
  {
    id: "qali-warma",
    nombre: "Programa Qali Warma",
    descripcion:
      "Servicio alimentario escolar para niños y niñas de instituciones públicas.",
    logo: "http://www.web.ugelcalca.gob.pe/images/archivos_2020/QALIWARMA/f417b7b1ac34c32aaea291f81137897a_1.jpg",
    color: "bg-red-50"
  },
  {
    id: "plan-anemia",
    nombre: "Plan Nacional Contra la Anemia",
    descripcion:
      "Estrategia multisectorial del MINSA para prevenir y reducir la anemia infantil.",
    logo: "https://www.diariomedico.pe/wp-content/uploads/2024/03/anemia-777x437.jpg",
    color: "bg-blue-50"
  },
  {
    id: "cuna-mas",
    nombre: "Programa Nacional Cuna Más",
    descripcion:
      "Atención integral y desarrollo infantil temprano para niños de 0 a 36 meses.",
    logo: "https://cdn.www.gob.pe/uploads/document/file/2728785/standard_cuna%20mas.jpg.jpg",
    color: "bg-yellow-50"
  }
];

export default function ServiciosEstado() {
  return (
    <div className="min-h-screen pt-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            🏛️ Servicios del Estado
          </h1>
          <p className="text-gray-600 text-lg">
            Programas oficiales que apoyan la nutrición, el desarrollo y la salud 
            de los niños y familias en el Perú.
          </p>
        </div>
      </div>

      {/* Grid de Servicios */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {servicios.map((servicio) => (
          <Link
            key={servicio.id}
            to={`/servicios-estado/${servicio.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden 
                       transition-all duration-300 transform 
                       hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
          >
            {/* Imagen / Logo */}
            <div className="relative h-48 overflow-hidden  flex items-center justify-center">
              <img
                src={servicio.logo}
                alt={servicio.nombre}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"

              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {servicio.nombre}
              </h3>
              <p className="text-gray-600">
                {servicio.descripcion}
              </p>
            </div>
          </Link>
        ))}
        
      </div>
       <div className="flex justify-center mt-8 ">
              <Link
                to="/"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
              >
                Volver al Menú Principal
              </Link>
            </div>  
    </div>
    
  );
}