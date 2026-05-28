import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Utensils, Baby } from "lucide-react";

// --- Base de Datos: Recetas Corrientes (Familia / Niños Mayores) ---
const recetasCorrientes = [
  {
    title: "Lomito de Sangrecita con Arroz",
    slug: "lomito-sangrecita-arroz",
    ingredientes: [
      "300 g de sangrecita",
      "1 cebolla picada",
      "1 tomate picado",
      "1 cdta de ají amarillo",
      "Aceite, sal y pimienta",
      "2 tazas de arroz cocido",
    ],
    preparacion: [
      "Sofríe la cebolla y tomate.",
      "Agrega la sangrecita desmenuzada y condimenta.",
      "Cocina 5 minutos y sirve con arroz.",
    ],
    img: "/recetas/lomito-sangrecita-arroz.png",
  },
  {
    title: "Estofado de Hígado con Quinua",
    slug: "estofado-higado-quinua",
    ingredientes: [
      "250 g de hígado de pollo",
      "1 taza de quinua cocida",
      "1 cebolla picada",
      "1 tomate picado",
      "1 zanahoria en cubos",
      "1 puño de espinacas",
      "Caldo de pollo, sal y pimienta",
    ],
    preparacion: [
      "Dorar el hígado de pollo y retirar.",
      "En la misma olla, sofreír cebolla y tomate.",
      "Agregar el hígado, zanahoria y caldo. Cocinar 15 min.",
      "Añadir las espinacas y servir sobre quinua.",
    ],
    img: "/recetas/estofado-higado-quinua.png",
  },
  {
    title: "Hamburguesas de Garbanzo y Avena",
    slug: "hamburguesas-garbanzo-avena",
    ingredientes: [
      "2 tazas de garbanzos cocidos",
      "1/2 taza de avena fortificada",
      "1 huevo",
      "1/2 cebolla picada",
      "Espinacas picadas, sal y pimienta",
    ],
    preparacion: [
      "Triturar los garbanzos.",
      "Mezclar con avena, huevo, cebolla y espinacas.",
      "Formar hamburguesas y cocinar en sartén 5 min por lado.",
    ],
    img: "/recetas/hamburguesas-garbanzo-avena.png",
  },
  {
    title: "Cebiche de Anchoveta",
    slug: "cebiche-anchoveta",
    ingredientes: [
      "500 g de filete de anchoveta",
      "1 cebolla roja en juliana",
      "Jugo de 10 limones",
      "1 ají limo picado",
      "Culantro picado, sal y pimienta",
    ],
    preparacion: [
      "Cortar la anchoveta en cubos.",
      "Mezclar con limón, ají limo y sal.",
      "Refrigerar 10 min, agregar cebolla y culantro.",
    ],
    img: "/recetas/cebiche-anchoveta.png",
  },
  {
    title: "Guiso de Lentejas con Kiwicha",
    slug: "guiso-lentejas-kiwicha",
    ingredientes: [
      "2 tazas de lentejas",
      "200 g de carne magra en cubos",
      "1 cebolla picada",
      "2 cdas de kiwicha",
      "Zanahoria en cubos, sal y comino",
    ],
    preparacion: [
      "Sofreír la carne con cebolla.",
      "Agregar lentejas, zanahoria y agua. Cocinar 25 min.",
      "Añadir kiwicha los últimos 5 min de cocción.",
    ],
    img: "/recetas/guiso-lentejas-kiwicha.png",
  },
  {
    title: "Saltado de Pollo con Frijoles",
    slug: "saltado-pollo-frijoles",
    ingredientes: [
      "300 g de pollo en tiras",
      "1 taza de frijoles verdes",
      "1 cebolla en gajos",
      "1 tomate en gajos",
      "Sillao, vinagre, sal y pimienta",
    ],
    preparacion: [
      "Sellear el pollo y retirar.",
      "Saltear las verduras en el mismo sartén.",
      "Unir todo, agregar sillao y servir.",
    ],
    img: "/recetas/saltado-pollo-frijoles.png",
  },
  {
    title: "Tortilla de Sangrecita con Espinaca",
    slug: "tortilla-sangrecita-espinaca",
    ingredientes: [
      "200 g de sangrecita cocida",
      "2 huevos",
      "1 taza de espinacas picadas",
      "1/4 de cebolla picada",
      "Sal y pimienta al gusto",
    ],
    preparacion: [
      "Batir los huevos con sal y pimienta.",
      "Mezclar con sangrecita desmenuzada, espinacas y cebolla.",
      "Cocinar en sartén engrasada por 4 minutos por lado.",
    ],
    img: "/recetas/tortilla-sangrecita-espinaca.png",
  },
  {
    title: "Arroz Chaufa de Hígado de Pollo",
    slug: "arroz-chaufa-higado-pollo",
    ingredientes: [
      "200 g de hígado de pollo picado",
      "3 tazas de arroz cocido",
      "1 huevo",
      "2 cdas de sillao",
      "Cebolla china picada",
    ],
    preparacion: [
      "Saltear el hígado de pollo hasta que dore.",
      "Agregar el huevo batido y revolver.",
      "Añadir el arroz, sillao y cebolla china. Mezclar bien.",
    ],
    img: "/recetas/arroz-chaufa-higado-pollo.png",
  },
  {
    title: "Ensalada de Quinua con Pescado",
    slug: "ensalada-quinua-pescado",
    ingredientes: [
      "2 latas de anchoveta en aceite",
      "2 tazas de quinua cocida",
      "1 tomate picado",
      "1/2 cebolla roja picada",
      "Limón y sal al gusto",
    ],
    preparacion: [
      "Mezclar todos los ingredientes en un bowl.",
      "Aliñar con el aceite de la anchoveta y limón.",
      "Servir frío o a temperatura ambiente.",
    ],
    img: "/recetas/ensalada-quinua-pescado.png",
  },
  {
    title: "Puré de Lentejas con Verduras",
    slug: "pure-lentejas-verduras",
    ingredientes: [
      "2 tazas de lentejas cocidas",
      "1 zanahoria cocida",
      "1/4 de taza de avena",
      "Sal y ajo al gusto",
    ],
    preparacion: [
      "Licuar las lentejas con zanahoria y un poco de agua.",
      "Cocinar la mezcla con avena por 5 minutos.",
      "Revolver hasta obtener consistencia de puré.",
    ],
    img: "/recetas/pure-lentejas-verduras.png",
  },
  {
    title: "Sopa de Pollo con Avena",
    slug: "sopa-pollo-avena",
    ingredientes: [
      "2 muslos de pollo",
      "1/2 taza de avena",
      "1 zanahoria picada",
      "2 papas picadas",
      "Sal y pimienta al gusto",
    ],
    preparacion: [
      "Hervir el pollo con verduras por 20 minutos.",
      "Desmenuzar el pollo y regresar a la olla.",
      "Agregar avena y cocinar 5 minutos más.",
    ],
    img: "/recetas/sopa-pollo-avena.png",
  },
  {
    title: "Revoltillo de Garbanzos con Huevo",
    slug: "revoltillo-garbanzos-huevo",
    ingredientes: [
      "1 taza de garbanzos cocidos",
      "2 huevos",
      "1/4 de cebolla picada",
      "Sal y comino al gusto",
    ],
    preparacion: [
      "Saltear cebolla hasta que dore.",
      "Aplastar los garbanzos y agregar a la sartén.",
      "Añadir huevos batidos y cocinar revolviendo.",
    ],
    img: "/recetas/revoltillo-garbanzos-huevo.png",
  },
  {
    title: "Guiso de Kiwicha con Verduras",
    slug: "guiso-kiwicha-verduras",
    ingredientes: [
      "1 taza de kiwicha",
      "2 tazas de agua",
      "1 zanahoria rallada",
      "1/2 taza de espinacas picadas",
      "Sal al gusto",
    ],
    preparacion: [
      "Hervir kiwicha con agua por 15 minutos.",
      "Agregar zanahoria y espinacas.",
      "Cocinar 5 minutos más y servir.",
    ],
    img: "/recetas/guiso-kiwicha-verduras.png",
  },
  {
    title: "Frijoles Guisados con Carne",
    slug: "frijoles-guisados-carne",
    ingredientes: [
      "2 tazas de frijoles cocidos",
      "150 g de carne molida magra",
      "1 tomate picado",
      "1/4 de cebolla picada",
      "Sal y comino",
    ],
    preparacion: [
      "Dorar la carne con cebolla y tomate.",
      "Agregar frijoles y un poco de agua.",
      "Cocinar 10 minutos a fuego lento.",
    ],
    img: "/recetas/frijoles-guisados-carne.png",
  },
];

// --- Base de Datos: Recetas para Bebés ---
const recetasBebes = [
  {
    title: "Papilla de Hígado con Verduras (Alta en hierro)",
    slug: "papilla-higado-bebe",
    age: "6–8 meses (Puré Suave)",
    ingredientes: [
      "1 cucharada de hígado de pollo (bien cocido)",
      "2 cucharadas de papa sancochada",
      "1 cucharada de zanahoria picada",
      "1 cucharadita de aceite vegetal",
      "1 cucharadita de leche materna",
    ],
    preparacion: [
      "Cocina el hígado de pollo hasta que esté completamente cocido.",
      "Cocina la papa y la zanahoria.",
      "Tritura todo en un puré suave.",
      "Añade aceite y leche materna.",
      "No agregar sal.",
    ],
    img: "/recetas/papilla-higado-bebe.png",
  },
  {
    title: "Papilla de Quinua con Espinaca y Pollo",
    slug: "papilla-quinua-pollo-bebe",
    age: "6–8 meses (Puré Suave)",
    ingredientes: [
      "2 cucharadas de quinua cocida",
      "1 cucharada de espinaca cocida",
      "1 cucharada de pollo sancochado",
      "1 cucharadita de aceite vegetal",
      "1 cucharadita de leche materna",
    ],
    preparacion: [
      "Cocina bien la quinua hasta que reviente.",
      "Cocina espinaca y pollo por separado.",
      "Mezcla todo y tritura hasta lograr puré suave.",
      "Añade aceite y leche materna.",
    ],
    img: "/recetas/papilla-quinua-pollo-bebe.png",
  },
  {
    title: "Puré de Lentejas Suave con Arroz",
    slug: "pure-lentejas-arroz-bebe",
    age: "6–8 meses (Puré Fino)",
    ingredientes: [
      "2 cucharadas de lentejas bien cocidas",
      "2 cucharadas de arroz cocido",
      "1 cucharadita de aceite vegetal",
    ],
    preparacion: [
      "Cocina las lentejas hasta que queden muy suaves.",
      "Mézclalas con el arroz y tritura hasta puré fino.",
      "Añade aceite vegetal.",
    ],
    img: "/recetas/pure-lentejas-arroz-bebe.png",
  },
  {
    title: "Papilla de Bonito con Yuca",
    slug: "papilla-bonito-yuca",
    age: "9–11 meses (Triturado)",
    ingredientes: [
      "2 cucharadas de pulpa de bonito (parte oscura)",
      "2 cucharadas de yuca sancochada",
      "1 cucharada de zanahoria",
      "1 cucharadita de aceite vegetal",
    ],
    preparacion: [
      "Cocina la yuca y zanahoria.",
      "Cocina el bonito cuidando que no tenga espinas.",
      "Pisa todo hasta obtener textura triturada.",
      "Añade aceite.",
    ],
    img: "/recetas/papilla-bonito-yuca.png",
  },
  {
    title: "Puré de Garbanzos con Pollo",
    slug: "pure-garbanzos-pollo-bebe",
    age: "9–11 meses (Triturado)",
    ingredientes: [
      "2 cucharadas de garbanzos cocidos",
      "1 cucharada de pollo sancochado",
      "1 cucharada de zapallo sancochado",
      "1 cucharadita de aceite vegetal",
    ],
    preparacion: [
      "Tritura garbanzos, zapallo y pollo.",
      "Mezcla bien hasta lograr textura triturada.",
      "Añade aceite.",
    ],
    img: "/recetas/pure-garbanzos-pollo-bebe.png",
  },
  {
    title: "Papilla “Andina Suave” de Quinua y Kiwicha",
    slug: "papilla-andina-suave",
    age: "6–8 meses (Puré Suave)",
    ingredientes: [
      "1 cucharada de quinua",
      "1 cucharada de kiwicha",
      "1 cucharada de zanahoria sancochada",
      "1 cucharadita de aceite vegetal",
      "1 cucharadita de leche materna",
    ],
    preparacion: [
      "Cocina la quinua y kiwicha hasta que queden muy blandas.",
      "Agrega zanahoria y tritura.",
      "Añade aceite y leche materna.",
    ],
    img: "/recetas/papilla-andina-suave.png",
  },
  {
    title: "Papilla de Avena Fortificada con Frutas (opción dulce)",
    slug: "papilla-avena-frutas-bebe",
    age: "6–8 meses (Puré)",
    ingredientes: [
      "2 cucharadas de avena fortificada",
      "1 trocito de plátano o manzana cocida",
      "1 taza de agua o leche materna",
    ],
    preparacion: [
      "Cocina la avena en agua.",
      "Agrega la fruta y tritura.",
      "No añadir azúcar.",
    ],
    img: "/recetas/papilla-avena-frutas-bebe.png",
  },
  {
    title: "Papilla de Carne Magra con Verduras",
    slug: "papilla-carne-magra-bebe",
    age: "9–11 meses (Triturado)",
    ingredientes: [
      "1 cucharada de carne magra sancochada",
      "2 cucharadas de papa",
      "1 cucharada de zanahoria",
      "1 cucharadita de aceite vegetal",
    ],
    preparacion: [
      "Cocina la carne hasta que quede muy suave.",
      "Cocina papa y zanahoria.",
      "Tritura todo junto.",
      "Añade aceite.",
    ],
    img: "/recetas/papilla-carne-magra-bebe.png",
  },
];

// Componente individual para la tarjeta de receta
const RecipeCard = ({ recipe, isBaby }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col">
    <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
      {/* Usamos el slug para construir la ruta de la imagen */}
      <img
        src={recipe.img}
        alt={recipe.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "https://via.placeholder.com/600x400?text=Platillo+Nutritivo"; // Fallback
        }}
      />
    </div>
    <div className="p-5 flex-1">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
      {isBaby && (
        <span className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-1 rounded-full mb-3">
          👶 Edad: {recipe.age}
        </span>
      )}
      
      <div className="mt-3">
        <h4 className="font-semibold text-indigo-600 mb-1">Ingredientes:</h4>
        <ul className="list-disc list-inside text-gray-700 text-sm pl-0 space-y-0.5">
          {recipe.ingredientes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold text-indigo-600 mb-1">Preparación:</h4>
        <ol className="list-decimal list-inside text-gray-700 text-sm pl-0 space-y-0.5">
          {recipe.preparacion.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>

    </div>
  </div>
);


export default function GuiaPlatillosPage() {
  const [activeCategory, setActiveCategory] = useState("bebes"); // 'bebes' o 'corrientes'

  const recipes = activeCategory === "bebes" ? recetasBebes : recetasCorrientes;
  const isBabyCategory = activeCategory === "bebes";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50 rounded-b-3xl">
        <div className="max-w-5xl mx-auto flex items-center gap-4 p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            🍽️ Guía de Platillos Nutritivos
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 mt-6">
{/* Toggle/Selector de Categorías */}
<section className="bg-white p-6 md:p-8 rounded-3xl shadow-lg mb-8">
    <p className="text-gray-600 mb-6 text-lg text-center font-medium">
        Selecciona la categoría de recetas que deseas consultar.
    </p>

    {/* Toggle/Selector de Categorías (Aplicación del estilo degradado) */}
    <div className="flex flex-wrap gap-4 justify-center mb-6">
        {/* Botón para Recetas para Bebés */}
        <button
            onClick={() => setActiveCategory("bebes")}
            className={`flex items-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                activeCategory === "bebes"
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300' 
            }`}
        >
            <Baby size={20} className="mr-2" />
            Recetas para Bebés
        </button>

        {/* Botón para Recetas Corrientes/Familiares */}
        <button
            onClick={() => setActiveCategory("corrientes")}
            className={`flex items-center px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                activeCategory === "corrientes"
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
        >
            <Utensils size={20} className="mr-2" />
            Recetas Corrientes
        </button>
    </div>

    {/* Mensajes de Alerta/Información */}
    {isBabyCategory && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-gray-700">
            <p className="text-sm">
                ⚠️ Estas recetas son **bajas en sal/azúcar** y con texturas adaptadas (purés/triturados) para la alimentación complementaria oportuna (6 a 11 meses).
            </p>
            <p className="text-xs mt-1">Fuente: Programas del MINSA/CENAN y Cuna Más.</p>
        </div>
    )}
    {!isBabyCategory && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg text-gray-700">
            <p className="text-sm">
                🍲 Estas recetas son nutritivas y ricas en hierro, adecuadas para la **familia y niños mayores** de 12 meses.
            </p>
            <p className="text-xs mt-1">Fuente: Programas del MINSA/CENAN y A Comer Pescado.</p>
        </div>
    )}
</section>

 

        {/* Grid de Recetas - 1 columna en móvil, 2 en escritorio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} isBaby={isBabyCategory} />
          ))}
        </div>
      
        
        {/* 3. ENLACE DE PLATAFORMA (Corrección de legibilidad con fondo blanco) */}
        <div className="text-center mt-10">
            <a href="https://lamejorreceta.ins.gob.pe/" target="_blank" rel="noopener noreferrer"
               className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow-md transition-all hover:bg-gray-100 hover:text-indigo-900"
            >
                🌐 Visita la plataforma oficial La Mejor Receta (INS)
            </a>
        </div>

         {/* 🔘 Botón Volver */} 
              <div className="flex justify-center mt-8">
                <Link
                  to="/"
                  className="inline-block border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
                >
                  Volver al Menú Principal
                </Link>
              </div> 
      </div>
    </div>
  );
}