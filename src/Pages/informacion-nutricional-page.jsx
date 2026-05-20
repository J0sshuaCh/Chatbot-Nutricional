import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Link } from "react-router-dom";
export default function InformacionNutricional() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [alimentosExpandidos, setAlimentosExpandidos] = useState({});
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  const alimentos = [
    {
      id: 1,
      nombre: "Sangrecita",
      categoria: "animal",
      imagen: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop",
      descripcion: "Uno de los alimentos con más hierro por porción y de muy buena absorción.",
      hierro: "~61 mg/100g",
      proteina: "~21 g/100g",
      energia: "~137 kcal/100g",
      recomendaciones: [
        "Ofrecer 1-2 cucharadas mezcladas en papillas 2-3 veces/semana",
        "Combinar con vitamina C (limón, tomate, naranja)",
        "Cocción completa y manipulación higiénica"
      ]
    },
    {
      id: 2,
      nombre: "Hígado de Pollo",
      categoria: "animal",
      imagen: "https://images.unsplash.com/photo-1588347818036-c61c3c69b6d4?w=400&h=300&fit=crop",
      descripcion: "Denso en hierro hemo, vitamina A, B12 y folato.",
      hierro: "~12.9 mg/100g",
      proteina: "~25.8 g/100g",
      energia: "~172 kcal/100g",
      recomendaciones: [
        "Porciones chicas (1-2 cucharadas) 1 vez/semana",
        "Textura muy fina para evitar rechazo",
        "Evitar exceso semanal por concentración de vitamina A"
      ]
    },
    {
      id: 3,
      nombre: "Carne de Res Magra",
      categoria: "animal",
      imagen: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=300&fit=crop",
      descripcion: "Hierro hemo de buena absorción, zinc y proteínas de alta calidad.",
      hierro: "~2-3 mg/100g",
      proteina: "~26 g/100g",
      energia: "~250 kcal/100g",
      recomendaciones: [
        "Ofrecer 2-3 veces/semana en papillas",
        "Iniciar con 1-2 cucharadas",
        "Combinar con menestras y vitamina C"
      ]
    },
    {
      id: 4,
      nombre: "Pollo (muslo/pechuga)",
      categoria: "animal",
      imagen: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop",
      descripcion: "Hierro hemo y proteína de alta calidad, adecuado desde 6 meses.",
      hierro: "~0.8-1 mg/100g",
      proteina: "~27 g/100g",
      energia: "~165 kcal/100g",
      recomendaciones: [
        "Desmenuzar muy fino en papillas",
        "Combinar con menestras y cítricos",
        "Asegurar cocción completa"
      ]
    },
    {
      id: 5,
      nombre: "Pescados Azules (Anchoveta, Bonito)",
      categoria: "animal",
      imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
      descripcion: "Económicos, con hierro hemo, proteína y omega-3.",
      hierro: "~3-8.66 mg/100g",
      proteina: "~19-20 g/100g",
      energia: "~185 kcal/100g",
      recomendaciones: [
        "Ofrecer 1-2 veces/semana sin espinas",
        "Bien cocido y desmenuzado fino",
        "Preferir pescados bajos en mercurio"
      ]
    },
    {
      id: 6,
      nombre: "Lentejas",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1587486937699-5096d08c3f13?w=400&h=300&fit=crop",
      descripcion: "Legumbre económica con hierro no hemo, proteína y fibra.",
      hierro: "6.6 mg/taza",
      proteina: "17.9 g/taza",
      energia: "230 kcal/taza",
      recomendaciones: [
        "Empezar con 2-3 cucharadas de puré",
        "Exprimir limón para potenciar absorción",
        "Combinar con carne para mejorar hierro total"
      ]
    },
    {
      id: 7,
      nombre: "Frijoles/Frejoles",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1589895139727-cfbf17fd61c0?w=400&h=300&fit=crop",
      descripcion: "Menestra con hierro no hemo y proteína, ideal en purés.",
      hierro: "5.1-6.6 mg/taza",
      proteina: "15 g/taza",
      energia: "245 kcal/taza",
      recomendaciones: [
        "Remojar y cocinar bien",
        "Acompañar con fruta cítrica",
        "Alternar con otras menestras"
      ]
    },
    {
      id: 8,
      nombre: "Garbanzo",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1596443686812-2f45229eebc3?w=400&h=300&fit=crop",
      descripcion: "Aporta hierro, proteína, zinc y folato con textura cremosa.",
      hierro: "~4.7 mg/taza",
      proteina: "14.5 g/taza",
      energia: "269 kcal/taza",
      recomendaciones: [
        "Triturar con limón o tomate",
        "Introducir gradualmente",
        "Evitar exceso de sal"
      ]
    },
    {
      id: 9,
      nombre: "Quinua",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      descripcion: "Cereal andino con proteína de calidad y hierro moderado.",
      hierro: "~2.8 mg/taza",
      proteina: "8.1 g/taza",
      energia: "222 kcal/taza",
      recomendaciones: [
        "Lavar bien y cocinar hasta suave",
        "Mezclar con sangrecita o pollo",
        "Acompañar con vitamina C"
      ]
    },
    {
      id: 10,
      nombre: "Avena Fortificada",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop",
      descripcion: "Cereal fortificado recomendado como primera fuente de hierro.",
      hierro: "4-8 mg/porción",
      proteina: "5-7 g/porción",
      energia: "150 kcal/porción",
      recomendaciones: [
        "Elegir versiones fortificadas con hierro",
        "Preparar con leche materna o fórmula",
        "Revisar etiqueta para confirmar aporte"
      ]
    },
    {
      id: 11,
      nombre: "Espinaca",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
      descripcion: "Hoja verde con hierro no hemo y folatos.",
      hierro: "~3-4 mg/100g",
      proteina: "~3 g/100g",
      energia: "~23 kcal/100g",
      recomendaciones: [
        "Usar en pequeñas porciones en purés",
        "Combinar con limón y carnes",
        "Bien lavada y cocida"
      ]
    },
    {
      id: 12,
      nombre: "Kiwicha",
      categoria: "vegetal",
      imagen: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop",
      descripcion: "Grano andino tradicional con hierro, proteína y fibra.",
      hierro: "~7 mg/100g",
      proteina: "~13 g/100g",
      energia: "~371 kcal/100g",
      recomendaciones: [
        "Cocinar hasta textura muy suave",
        "Mezclar con sangrecita o legumbres",
        "Añadir fruta cítrica al servir"
      ]
    }
  ];

  const categorias = [
    { id: 'todas', nombre: 'Todos', emoji: '🍽️' },
    { id: 'animal', nombre: 'Origen Animal', emoji: '🥩' },
    { id: 'vegetal', nombre: 'Origen Vegetal', emoji: '🌱' }
  ];

  const alimentosFiltrados = categoriaActiva === 'todas' 
    ? alimentos 
    : alimentos.filter(a => a.categoria === categoriaActiva);

  const toggleAlimento = (id) => {
    setAlimentosExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const abrirImagen = (imagen, nombre) => {
    setImagenAmpliada({ imagen, nombre });
  };

  const cerrarImagen = () => {
    setImagenAmpliada(null);
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            📚 Información Nutricional
          </h1>
          <p className="text-gray-600 text-lg">
            Alimentos ricos en hierro para bebés de 6 a 12 meses
          </p>
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>Importante:</strong> Esta información es educativa. Consulta con un pediatra o nutricionista para un plan personalizado.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros de Categoría */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                categoriaActiva === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Alimentos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {alimentosFiltrados.map(alimento => (
          <div
            key={alimento.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Imagen */}
            <div 
              className="relative h-48 overflow-hidden cursor-pointer group"
              onClick={() => abrirImagen(alimento.imagen, alimento.nombre)}
            >
              <img
                src={alimento.imagen}
                alt={alimento.nombre}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                  Click para ampliar
                </span>
              </div>
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                alimento.categoria === 'animal' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {alimento.categoria === 'animal' ? '🥩 Animal' : '🌱 Vegetal'}
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {alimento.nombre}
              </h3>
              <p className="text-gray-600 mb-4">
                {alimento.descripcion}
              </p>

              {/* Info Nutricional en Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-xs text-gray-600">Hierro</div>
                  <div className="font-bold text-sm text-red-700">{alimento.hierro}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💪</div>
                  <div className="text-xs text-gray-600">Proteína</div>
                  <div className="font-bold text-sm text-blue-700">{alimento.proteina}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔋</div>
                  <div className="text-xs text-gray-600">Energía</div>
                  <div className="font-bold text-sm text-yellow-700">{alimento.energia}</div>
                </div>
              </div>

              {/* Botón Ver Más */}
              <button
                onClick={() => toggleAlimento(alimento.id)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                <span>
                  {alimentosExpandidos[alimento.id] ? 'Ver menos' : 'Ver recomendaciones'}
                </span>
                {alimentosExpandidos[alimento.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {/* Recomendaciones Expandibles */}
              {alimentosExpandidos[alimento.id] && (
                <div className="mt-4 bg-purple-50 rounded-xl p-4 animate-fadeIn">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">👶</span>
                    Recomendaciones para padres:
                  </h4>
                  <ul className="space-y-2">
                    {alimento.recomendaciones.map((rec, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Nota Final */}
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-3 text-lg">
          💡 Consejos Importantes:
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Combina alimentos vegetales con vitamina C (limón, tomate, naranja) para mejorar la absorción de hierro</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Evita dar té o grandes cantidades de lácteos en la misma comida rica en hierro</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Varía las fuentes de hierro durante la semana para una nutrición completa</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Ajusta texturas según la edad: puré fino (6 meses), aplastado (7-8 meses), picado (9-12 meses)</span>
          </li>
        </ul>
      </div>

      {/* 🔘 Botón Volver */}
      <div className="flex justify-center mt-8 mb-10">
        <Link
          to="/"
          className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Volver al Menú Principal
        </Link>
      </div>  

      {/* Modal de Imagen Ampliada */}
      {imagenAmpliada && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={cerrarImagen}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={cerrarImagen}
              className="absolute -top-12 right-0 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={imagenAmpliada.imagen}
              alt={imagenAmpliada.nombre}
              className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-white text-center mt-4 text-lg font-medium">
              {imagenAmpliada.nombre}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}