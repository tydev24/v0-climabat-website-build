import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  href: string
}

export function ServiceCard({ icon: Icon, title, description, features, href }: ServiceCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <p className="text-muted-foreground text-pretty">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={href}>En savoir plus</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
