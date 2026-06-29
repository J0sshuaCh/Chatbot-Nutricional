import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

export default function MenuItem({ icon: Icon, title, description, route }) {
  return (
    <Link to={route} className="block group">
      <Card className="h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 cursor-pointer">
        <CardContent className="flex flex-col gap-3 p-6">
          <Icon className="size-10 text-primary" aria-hidden="true" />
          <h2 className="font-heading text-lg font-bold text-card-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
