import { useState, useEffect, useMemo } from "react"
import { ClientOnly } from "~/components/ClientOnly"
import { evStationsBolivia, type EVStationBolivia, type StationStatus } from "~/utils/evStationsBolivia"
import EVCard from "~/components/ev/ev-card"
import EVList from "~/components/ev/ev-list"
import { haversineDistance } from "~/utils/distance"
import { useUserLocation } from "~/context/locationCtx"
import { useEvData } from "~/context/evCtx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

function LazyEVMap({
  stations,
  selectedId,
  userLat,
  userLon,
  onSelect,
}: {
  stations: (EVStationBolivia & { distance?: number })[]
  selectedId: string | null
  userLat: number | null
  userLon: number | null
  onSelect: (id: string) => void
}) {
  const [EVMapComp, setEVMapComp] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    import("~/components/ev/ev-map").then((m) => setEVMapComp(() => m.default))
  }, [])

  if (!EVMapComp) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full" />
        Cargando mapa...
      </div>
    )
  }

  return <EVMapComp stations={stations} selectedId={selectedId} userLat={userLat} userLon={userLon} onSelect={onSelect} />
}

const ALL_CITIES = ["todas", ...Array.from(new Set(evStationsBolivia.map((s) => s.city))).sort()]

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "todos",            label: "Todos los estados" },
  { value: "operacional",      label: "Operacional" },
  { value: "en_construccion",  label: "En construcción" },
  { value: "fuera_servicio",   label: "Fuera de servicio" },
  { value: "desconocido",      label: "Desconocido" },
]

const ACCESS_OPTIONS: { value: string; label: string }[] = [
  { value: "todos",        label: "Todos los accesos" },
  { value: "publico",      label: "Público" },
  { value: "semi_publico", label: "Semi-público" },
  { value: "privado",      label: "Privado" },
]

const COST_OPTIONS: { value: string; label: string }[] = [
  { value: "todos",       label: "Cualquier costo" },
  { value: "gratis",      label: "Gratuito" },
  { value: "pago",        label: "Pago" },
  { value: "suscripcion", label: "Suscripción" },
]

export default function EVChargingPage() {
  const userLocation = useUserLocation()
  const { selectedEvId, setSelectedEvId } = useEvData()
  const [cityFilter, setCityFilter] = useState("todas")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [accessFilter, setAccessFilter] = useState("todos")
  const [costFilter, setCostFilter] = useState("todos")

  const filtered = useMemo(() => {
    return evStationsBolivia
      .filter((s) => {
        if (cityFilter !== "todas" && s.city !== cityFilter) return false
        if (statusFilter !== "todos" && s.status !== statusFilter) return false
        if (accessFilter !== "todos" && s.access !== accessFilter) return false
        if (costFilter !== "todos" && s.cost !== costFilter) return false
        return true
      })
      .map((s) => ({
        ...s,
        distance:
          userLocation.lat && userLocation.lon
            ? haversineDistance(userLocation.lat, userLocation.lon, s.lat, s.lon)
            : undefined,
      }))
      .sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance
        if (a.distance !== undefined) return -1
        if (b.distance !== undefined) return 1
        return a.city.localeCompare(b.city)
      })
  }, [cityFilter, statusFilter, accessFilter, costFilter, userLocation.lat, userLocation.lon])

  useEffect(() => {
    if (selectedEvId) {
      document.getElementById(`ev-${selectedEvId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [selectedEvId])

  const operationalCount = filtered.filter((s) => s.status === "operacional").length

  return (
    <div className="map-layout flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 flex flex-col border-r shrink-0 overflow-hidden bg-background">
        <div className="p-3 border-b">
          <h2 className="font-bold text-base mb-2">⚡ Cargadores EV · Bolivia</h2>

          <div className="flex flex-col gap-2">
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_CITIES.map((c) => (
                  <SelectItem key={c} value={c} className="text-xs">
                    {c === "todas" ? "Todas las ciudades" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-7 text-xs flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={costFilter} onValueChange={setCostFilter}>
                <SelectTrigger className="h-7 text-xs flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COST_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={accessFilter} onValueChange={setAccessFilter}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACCESS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="px-3 py-2 border-b bg-muted/30">
          <p className="text-xs text-muted-foreground">
            {filtered.length} estaciones
            {cityFilter !== "todas" ? ` en ${cityFilter}` : " en Bolivia"}
            {" · "}{operationalCount} operacionales
            {userLocation.lat ? " · por cercanía" : ""}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Toca un pin para calcular la ruta</p>
        </div>

        {/* Leyenda */}
        <div className="px-3 py-2 border-b bg-muted/10 flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-sm" />
            Operacional
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
            En construcción
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-sm" />
            Fuera de servicio
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white shadow-sm" />
            Desconocido
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
              <span className="text-3xl">🔍</span>
              No se encontraron estaciones
            </div>
          ) : (
            filtered.map((station) => (
              <div
                key={station.id}
                id={`ev-${station.id}`}
                className={`transition-all rounded-lg cursor-pointer ${selectedEvId === station.id ? "ring-2 ring-green-500 ring-offset-1" : ""}`}
                onClick={() => setSelectedEvId(station.id)}
              >
                <EVCard station={station} selected={selectedEvId === station.id} />
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Mapa */}
      <div className="flex-1 min-h-[400px]">
        <ClientOnly
          fallback={
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full" />
              Cargando mapa...
            </div>
          }
        >
          {() => (
            <LazyEVMap
              stations={filtered}
              selectedId={selectedEvId}
              userLat={userLocation.lat}
              userLon={userLocation.lon}
              onSelect={setSelectedEvId}
            />
          )}
        </ClientOnly>
      </div>
    </div>
  )
}
