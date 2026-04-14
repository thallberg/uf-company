"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Props = {
  name: string
  description: string
  price: number
  imageUrl?: string
  badge?: string
  onAddToCart?: () => void
}

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  badge,
  onAddToCart
}: Props) {
  return (
    <Card className="overflow-hidden">
      {imageUrl && (
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          {badge && <Badge variant="blue">{badge}</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-semibold">{price} kr</span>

          <Button
            variant="green"
            size="sm"
            onClick={onAddToCart}
          >
            Lägg till
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}