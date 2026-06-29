import { useState } from 'react'
import { Link } from "react-router-dom"
import { ChevronDown, ChevronUp, X, ArrowLeft, Beef, Leaf, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageMeta from "@/components/page-meta"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"

export default function InformacionNutricional() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [alimentosExpandidos, setAlimentosExpandidos] = useState({})
  const [imagenAmpliada, setImagenAmpliada] = useState(null)

  const alimentos = [
    {
      id: 1,
      nombre: "Sangrecita",
      categoria: "animal",
      imagen: "https://imgmedia.larepublica.pe/850x501/larepublica/original/2022/07/15/62d1ef83cf063b32bb72da89.webp",
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
      imagen: "https://imag.bonviveur.com/higaditos-de-pollo-al-ajillo-con-perejil.webp",
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
      imagen: "https://bacaporarancho.mx/wp-content/uploads/2024/07/Carne-magra-de-res-870x500.webp",
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
      imagen: "https://tvazteca.brightspotcdn.com/dims4/default/bc6c1bf/2147483647/strip/true/crop/1280x728+0+0/resize/968x551!/format/webp/quality/90/?url=http%3A%2F%2Ftv-azteca-brightspot.s3.amazonaws.com%2F7a%2F8c%2Ffae101874a3cb1fb688d481b2991%2Fdiseno-sin-titulo.jpg",
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
      imagen: "https://portal.andina.pe/EDPfotografia/Thumbnail/2015/09/23/000315691W.jpg",
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
      imagen: "https://www.gastronomiavasca.net/uploads/image/file/4295/w700_lentejas.jpg",
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
      imagen: "https://imgmedia.buenazo.pe/640x371/buenazo/original/2021/05/04/60917b2f4fd7611159462e03.webp",
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
      imagen: "https://www.gob.mx/cms/uploads/article/main_image/62820/garbanzo.jpg",
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
      imagen: "https://manitoba.com.co/storage/2017/04/los-beneficios-de-la-quinua-y-la-avena-manitoba-1024x683.jpg",
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
      imagen: "https://content21.sabervivirtv.com/medio/2024/02/28/avena_5963dcb7_886668116(1)_240228140755_1200x630.webp",
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
      imagen: "https://www.gastronomiavasca.net/uploads/image/file/3368/espinacas.jpg",
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
      imagen: "https://dojiw2m9tvv09.cloudfront.net/53648/product/sintitulo3914.png",
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
  ]

  const categorias = [
    { id: 'todas', nombre: 'Todos', icon: Sparkles },
    { id: 'animal', nombre: 'Origen Animal', icon: Beef },
    { id: 'vegetal', nombre: 'Origen Vegetal', icon: Leaf }
  ]

  const alimentosFiltrados = categoriaActiva === 'todas'
    ? alimentos
    : alimentos.filter(a => a.categoria === categoriaActiva)

  const toggleAlimento = (id) => {
    setAlimentosExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <>
      <PageMeta title="Información Nutricional" description="Alimentos ricos en hierro, clasificados por categorías, para la prevención de anemia en niños y madres" />
      <div className="flex flex-col px-4 py-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Volver al inicio" nativeButton={false} render={<Link to="/" />}>
            <ArrowLeft />
          </Button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Información Nutricional
          </h1>
        </div>

        {/* Intro card */}
        <Card>
          <CardContent className="p-6 md:p-8 flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold text-card-foreground">
              Alimentos ricos en hierro para bebés de 6 a 12 meses
            </h2>
            <p className="text-muted-foreground">
              Guías sobre alimentos ricos en hierro, vitaminas y nutrientes esenciales para el desarrollo infantil.
            </p>
            <div className="bg-muted border-l-4 border-accent rounded-r-lg px-4 py-3 text-sm text-muted-foreground">
              <strong className="text-foreground">Importante:</strong> Esta información es educativa.
              Consulta con un pediatra o nutricionista para un plan personalizado.
            </div>
          </CardContent>
        </Card>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categorias.map(cat => (
            <Button
              key={cat.id}
              variant={categoriaActiva === cat.id ? "default" : "outline"}
              onClick={() => setCategoriaActiva(cat.id)}
              className={cn(
                categoriaActiva === cat.id && "scale-105"
              )}
            >
              <cat.icon data-icon="inline-start" />
              {cat.nombre}
            </Button>
          ))}
        </div>

        {/* Food grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alimentosFiltrados.map(alimento => (
            <Card key={alimento.id} className="overflow-hidden">
              {/* Image */}
              <div
                className="relative h-48 overflow-hidden cursor-pointer group"
                onClick={() => setImagenAmpliada({ imagen: alimento.imagen, nombre: alimento.nombre })}
              >
                <img
                  src={alimento.imagen}
                  alt={alimento.nombre}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                <Badge
                  variant={alimento.categoria === 'animal' ? 'default' : 'secondary'}
                  className="absolute top-3 right-3"
                >
                  {alimento.categoria === 'animal' ? <Beef data-icon="inline-start" /> : <Leaf data-icon="inline-start" />}
                  {alimento.categoria === 'animal' ? 'Animal' : 'Vegetal'}
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-card-foreground mb-1">
                    {alimento.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {alimento.descripcion}
                  </p>
                </div>

                {/* Nutricional info */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-primary/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Hierro</p>
                    <p className="font-bold text-sm text-primary">{alimento.hierro}</p>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Proteína</p>
                    <p className="font-bold text-sm text-secondary">{alimento.proteina}</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Energía</p>
                    <p className="font-bold text-sm text-accent">{alimento.energia}</p>
                  </div>
                </div>

                {/* Toggle recommendations */}
                <Button
                  variant={alimentosExpandidos[alimento.id] ? "secondary" : "default"}
                  onClick={() => toggleAlimento(alimento.id)}
                >
                  {alimentosExpandidos[alimento.id] ? <ChevronUp data-icon="inline-start" /> : <ChevronDown data-icon="inline-start" />}
                  {alimentosExpandidos[alimento.id] ? 'Ver menos' : 'Ver recomendaciones'}
                </Button>

                {alimentosExpandidos[alimento.id] && (
                  <div className="bg-muted rounded-xl p-4 animate-fadeIn flex flex-col gap-2">
                    <h4 className="font-heading font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="size-4 text-primary" />
                      Recomendaciones para padres:
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {alimento.recomendaciones.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">✓</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips card */}
        <Card>
          <CardContent className="p-6 flex flex-col gap-3">
            <h3 className="font-heading font-bold text-lg text-card-foreground flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Consejos Importantes:
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Combina alimentos vegetales con vitamina C (limón, tomate, naranja) para mejorar la absorción de hierro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Evita dar té o grandes cantidades de lácteos en la misma comida rica en hierro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Varía las fuentes de hierro durante la semana para una nutrición completa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Ajusta texturas según la edad: puré fino (6 meses), aplastado (7-8 meses), picado (9-12 meses)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Back button */}
        <div className="flex justify-center">
          <Button variant="link" nativeButton={false} render={<Link to="/" />}>
            Volver al Menú Principal
          </Button>
        </div>
      </div>

      {/* Image modal */}
      <Dialog open={!!imagenAmpliada} onOpenChange={(open) => !open && setImagenAmpliada(null)}>
        <DialogContent className="max-w-4xl p-2">
          <DialogTitle className="sr-only">Imagen ampliada</DialogTitle>
          <DialogClose />
          {imagenAmpliada && (
            <div className="flex flex-col items-center gap-3 p-2">
              <img
                src={imagenAmpliada.imagen}
                alt={imagenAmpliada.nombre}
                loading="lazy"
                className="max-w-full max-h-[80dvh] rounded-xl object-contain"
              />
              <p className="text-sm font-medium text-foreground">{imagenAmpliada.nombre}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </>
  )
}
