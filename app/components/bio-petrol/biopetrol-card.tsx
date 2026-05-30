import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { FuelIcon, MapPinIcon, NavigationIcon } from "lucide-react"
import type { BioPetrolStation } from "~/utils/bioPetrol"
import { formatDistance } from "~/utils/distance"

interface Props extends BioPetrolStation {
  distance?: number
  fuelLabel?: string
}

export default function BioPetrolCard({
  name,
  address,
  aproxWaitTime,
  cars,
  fuelVol,
  lat,
  lon,
  distance,
  fuelLabel = "Combustible",
}: Props) {
  const openDirections = () => {
    if (!lat || !lon) return
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, "_blank")
  }

  const isAvailable = !!fuelVol && fuelVol.trim() !== "" && !fuelVol.toUpperCase().includes("AGOTADO")

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm leading-tight">{name}</CardTitle>
          {distance !== undefined && (
            <span className="text-xs font-semibold text-blue-600 shrink-0">{formatDistance(distance)}</span>
          )}
        </div>
        <CardDescription className="text-xs flex items-center gap-1">
          <span className={isAvailable ? "text-green-600 font-medium" : "text-red-500"}>
            {isAvailable ? "1/1 disponible" : "agotado"}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <Accordion type="multiple" defaultValue={isAvailable ? ["fuel"] : []}>
          <AccordionItem value="fuel">
            <AccordionTrigger className="text-xs py-2 hover:no-underline">
              <div className="flex items-center gap-2 flex-1 mr-2">
                <FuelIcon className="h-3 w-3 shrink-0" />
                <span className="font-medium">{fuelLabel}</span>
                <Badge
                  className="text-xs py-0 h-4 ml-auto shrink-0"
                  variant={isAvailable ? "default" : "destructive"}
                >
                  {isAvailable ? "✓ disponible" : "agotado"}
                </Badge>
              </div>
            </AccordionTrigger>
            {isAvailable && (
              <AccordionContent>
                <ul className="space-y-0.5 text-xs pl-5">
                  <li>⛽ Volumen: <span className="font-medium text-green-700">{fuelVol}</span></li>
                  {cars && <li>🚗 Autos: {cars}</li>}
                  {aproxWaitTime && <li>⏱ Espera: {aproxWaitTime}</li>}
                </ul>
              </AccordionContent>
            )}
          </AccordionItem>
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
