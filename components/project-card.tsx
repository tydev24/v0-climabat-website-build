"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Calendar, Eye, Thermometer, Wind, Wrench } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  id: string
  title: string
  location: string
  date: string
  category: string
  description: string
  images: string[]
  details: {
    surface?: string
    equipment?: string
    duration?: string
    budget?: string
  }
}

const categoryIcons = {
  chauffage: Thermometer,
  climatisation: Wind,
  ventilation: Wrench,
}

export function ProjectCard({ title, location, date, category, description, images, details }: ProjectCardProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons] || Wrench

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          <CategoryIcon className="h-3 w-3 mr-1" />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
        {images.length > 1 && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            +{images.length - 1} photos
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-balance">{title}</h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-pretty text-sm mb-4 line-clamp-2">{description}</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              Voir le projet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Image gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={`${title} - Image ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Détails du projet</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Localisation:</span>
                      <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Date:</span>
                      <span>{date}</span>
                    </div>
                    {details.surface && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Surface:</span>
                        <span>{details.surface}</span>
                      </div>
                    )}
                    {details.duration && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Durée:</span>
                        <span>{details.duration}</span>
                      </div>
                    )}
                    {details.budget && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Budget:</span>
                        <span>{details.budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Description</h4>
                  <p className="text-muted-foreground text-pretty text-sm leading-relaxed">{description}</p>
                  {details.equipment && (
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Équipements installés:</h5>
                      <p className="text-sm text-muted-foreground">{details.equipment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
