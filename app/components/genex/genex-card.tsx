import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { FuelIcon, MapPinIcon, NavigationIcon } from "lucide-react"
import type { GenexStation } from "~/utils/genex"
import type { FuelPreference } from "~/context/configCtx"
import { formatDistance } from "~/utils/distance"

interface Props extends GenexStation {
  distance?: number
  fuelType?: Exclude<FuelPreference, "ELECTRICO">
}

export default function GenexCard({
  name,
  address,
  lastUpdated,
  products,
  lat,
  lon,
  distance,
  fuelType,
}: Props) {
  const openDirections = () => {
    if (!lat || !lon) return
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank")
  }

  const availableCount = products.filter((p) => p.available).length

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm leading-tight">{name}</CardTitle>
          <div className="flex items-center gap-1 shrink-0">
            {distance !== undefined && (
              <span className="text-xs font-semibold text-blue-600">{formatDistance(distance)}</span>
            )}
          </div>
        </div>
        <CardDescription className="text-xs flex items-center gap-1">
          <span>Act: {lastUpdated}</span>
          <span className="text-muted-foreground">·</span>
          <span className={availableCount > 0 ? "text-green-600 font-medium" : "text-red-500"}>
            {availableCount}/{products.length} disponibles
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <Accordion type="multiple">
          {products.map((el, index) => {
            const isSelected = fuelType && el.name.toUpperCase().includes(fuelType)
            return (
              <AccordionItem value={`${index}-${el.name}`} key={index}>
                <AccordionTrigger className="text-xs py-2 hover:no-underline">
                  <div className="flex items-center gap-2 flex-1 mr-2">
                    <FuelIcon className="h-3 w-3 shrink-0" />
                    <span className="font-medium">{el.name}</span>
                    {isSelected && (
                      <Badge className="text-xs py-0 h-4 ml-auto mr-2 bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                        seleccionado
                      </Badge>
                    )}
                    <Badge
                      className="text-xs py-0 h-4 ml-auto shrink-0"
                      variant={el.available ? "default" : "destructive"}
                    >
                      {el.available ? "✓ disponible" : "agotado"}
                    </Badge>
                  </div>
                </AccordionTrigger>
                {el.available && (
                  <AccordionContent>
                    <ul className="space-y-0.5 text-xs pl-5">
                      <li>⛽ Volumen: <span className="font-medium text-green-700">{el.volume}</span></li>
                      {el.capacity && <li>🚗 Autos: {el.capacity}</li>}
                      {el.waitTime && <li>⏱ Espera: {el.waitTime}</li>}
                    </ul>
                  </AccordionContent>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
          <MapPinIcon className="h-3 w-3 shrink-0" />
          <span className="truncate">{address}</span>
        </span>
        {lat && lon && (
          <Button size="sm" variant="outline" onClick={openDirections} className="shrink-0 text-xs">
            <NavigationIcon className="h-3 w-3 mr-1" />
            Ir
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
