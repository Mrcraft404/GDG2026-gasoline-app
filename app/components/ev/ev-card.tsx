import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ZapIcon, MapPinIcon, NavigationIcon, ClockIcon, InfoIcon } from "lucide-react"
import type { EVStationBolivia, StationStatus } from "~/utils/evStationsBolivia"
import { CONNECTOR_LABELS, CONNECTOR_COLORS, SPEED_LABELS, getChargingSpeed } from "~/utils/evStationsBolivia"
import { formatDistance } from "~/utils/distance"

interface Props {
  station: EVStationBolivia & { distance?: number }
  selected?: boolean
}

const STATUS_BADGE: Record<StationStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  operacional:      { label: "Operacional",      variant: "default" },
  en_construccion:  { label: "En construcción",  variant: "secondary" },
  fuera_servicio:   { label: "Fuera de servicio",variant: "destructive" },
  desconocido:      { label: "Desconocido",       variant: "outline" },
}

const ACCESS_BADGE: Record<string, string> = {
  publico:      "bg-blue-100 text-blue-800 border-blue-200",
  semi_publico: "bg-yellow-100 text-yellow-800 border-yellow-200",
  privado:      "bg-gray-100 text-gray-700 border-gray-200",
}

const ACCESS_LABEL: Record<string, string> = {
  publico:      "Público",
  semi_publico: "Semi-público",
  privado:      "Privado",
}

const COST_BADGE: Record<string, string> = {
  gratis:      "bg-green-100 text-green-800 border-green-200",
  pago:        "bg-red-100 text-red-800 border-red-200",
  suscripcion: "bg-purple-100 text-purple-800 border-purple-200",
}

const COST_LABEL: Record<string, string> = {
  gratis:      "Gratuito",
  pago:        "Pago",
  suscripcion: "Suscripción",
}

export default function EVCard({ station, selected = false }: Props) {
  const statusCfg = STATUS_BADGE[station.status]

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}`,
      "_blank"
    )
  }

  const maxPower = Math.max(...station.connectors.map((c) => c.powerKW))
  const speedInfo = SPEED_LABELS[getChargingSpeed(maxPower)]

  return (
    <Card className={`w-full transition-all ${selected ? "ring-2 ring-green-500 shadow-md" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <Badge variant={statusCfg.variant} className="text-xs shrink-0">
                {statusCfg.label}
              </Badge>
              <Badge variant="outline" className={`text-xs shrink-0 ${ACCESS_BADGE[station.access]}`}>
                {ACCESS_LABEL[station.access]}
              </Badge>
              <Badge variant="outline" className={`text-xs shrink-0 ${COST_BADGE[station.cost]}`}>
                {COST_LABEL[station.cost]}
              </Badge>
              {station.distance !== undefined && (
                <span className="text-xs font-semibold text-blue-600 ml-auto">{formatDistance(station.distance)}</span>
              )}
            </div>
            <CardTitle className="text-sm leading-tight">{station.name}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-xs mt-0.5">{station.operator}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2 space-y-2">
        {/* Velocidad máxima */}
        <p className={`text-xs font-medium ${speedInfo.color}`}>
          <ZapIcon className="inline h-3 w-3 mr-1" />
          {speedInfo.label}
        </p>

        {/* Conectores */}
        <div className="space-y-1">
          {station.connectors.map((c, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <Badge
                variant="outline"
                className={`text-xs shrink-0 px-1.5 py-0 ${CONNECTOR_COLORS[c.standard]}`}
              >
                {c.standard}
              </Badge>
              <span className="text-xs text-muted-foreground leading-tight">
                {c.type} · <span className="font-medium">{c.powerKW} kW</span> · ×{c.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Horario */}
        {station.openHours && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ClockIcon className="h-3 w-3 shrink-0" />
            {station.openHours}
          </div>
        )}

        {/* Notas */}
        {station.notes && (
          <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <InfoIcon className="h-3 w-3 shrink-0 mt-0.5" />
            <span className="italic">{station.notes}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between gap-2">
        <div className="flex items-start gap-1 min-w-0">
          <MapPinIcon className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate">
            {station.address}, {station.city}
          </span>
        </div>
        <Button size="sm" variant="outline" onClick={openDirections} className="shrink-0 text-xs">
          <NavigationIcon className="h-3 w-3 mr-1" />
          Ir
        </Button>
      </CardFooter>
    </Card>
  )
}
