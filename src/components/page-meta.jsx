import { Helmet } from "react-helmet-async"

const SITE_NAME = "ANMI - Asistente Nutricional Materno Infantil"

export default function PageMeta({ title, description }) {
  const fullTitle = title ? `${title} | ANMI` : SITE_NAME
  const desc = description || "Asistente nutricional para la prevención de anemia infantil en el Perú"

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
    </Helmet>
  )
}
