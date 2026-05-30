import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { MapPinIcon, PhoneIcon, NavigationIcon, WrenchIcon, CarIcon } from "lucide-react"
import { type VehicleAgency, AGENCY_TYPE_LABELS } from "~/utils/vehicleAgencies"
import { formatDistance } from "~/utils/distance"

interface Props {
  agency: VehicleAgency
  distance?: number
  selected?: boolean
}

const TYPE_COLORS: Record<string, string> = {
  concesionario: "bg-blue-100 text-blue-800 border-blue-200",
  taller: "bg-orange-100 text-orange-800 border-orange-200",
  repuestos: "bg-green-100 text-green-800 border-green-200",
  multimarca: "bg-purple-100 text-purple-800 border-purple-200",
}

export default function AgencyCard({ agency, distance, selected = false }: Props) {
  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${agency.lat},${agency.lon}`, "_blank")
  }

  return (
    <Card className={`w-full transition-all ${selected ? "ring-2 ring-blue-500 shadow-md" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <Badge className={`text-xs shrink-0 ${TYPE_COLORS[agency.type] || ""}`} variant="outline">
                {AGENCY_TYPE_LABELS[agency.type]}
              </Badge>
              {distance !== undefined && (
                <span className="text-xs font-semibold text-blue-600">{formatDistance(distance)}</span>
              )}
            </div>
            <CardTitle className="text-sm leading-tight">{agency.name}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-xs">{agency.city}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2 space-y-2">
        {/* Marcas */}
        <div className="flex flex-wrap gap-1">
          {agency.brands.map((brand) => (
            <Badge key={brand} variant="secondary" className="text-xs px-2 py-0">
              {brand}
            </Badge>
          ))}
        </div>

        {/* Servicios */}
        <div className="flex items-start gap-1.5">
          <WrenchIcon className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{agency.services.join(" · ")}</p>
        </div>

        {/* Dirección */}
        <div className="flex items-start gap-1.5">
          <MapPinIcon className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground truncate">{agency.address}</p>
        </div>

        {/* Teléfono */}
        {agency.phone && (
          <div className="flex items-center gap-1.5">
            <PhoneIcon className="h-3 w-3 shrink-0 text-muted-foreground" />
            <a href={`tel:${agency.phone}`} className="text-xs text-blue-600 hover:underline">
              {agency.phone}
            </a>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button size="sm" variant="outline" onClick={openDirections} className="w-full text-xs">
          <NavigationIcon className="h-3 w-3 mr-1" />
          Cómo llegar
        </Button>
      </CardFooter>
    </Card>
  )
}
