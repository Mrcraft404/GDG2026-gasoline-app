import { useState, useEffect, useMemo, useRef } from "react"
import { ClientOnly } from "~/components/ClientOnly"
import { vehicleAgencies, type VehicleAgency } from "~/utils/vehicleAgencies"
import AgencyCard from "~/components/agencies/agency-card"
import { haversineDistance } from "~/utils/distance"
import { useUserLocation } from "~/context/locationCtx"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

function LazyAgencyMap({
  agencies,
  selectedId,
  userLat,
  userLon,
  onSelect,
}: {
  agencies: (VehicleAgency & { distance?: number })[]
  selectedId: string | null
  userLat: number | null
  userLon: number | null
  onSelect: (id: string) => void
}) {
  const [AgencyMap, setAgencyMap] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    import("~/components/agencies/agency-map").then((m) => setAgencyMap(() => m.default))
  }, [])

  if (!AgencyMap) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
        Cargando mapa...
      </div>
    )
  }

  return <AgencyMap agencies={agencies} selectedId={selectedId} userLat={userLat} userLon={userLon} onSelect={onSelect} />
}

export default function AgenciasPage() {
  const userLocation = useUserLocation()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [cityFilter, setCityFilter] = useState("todas")
  const [typeFilter, setTypeFilter] = useState("todos")

  const cities = useMemo(
    () => ["todas", ...Array.from(new Set(vehicleAgencies.map((a) => a.city)))],
    []
  )

  const filtered = useMemo(() => {
    return vehicleAgencies
      .filter((a) => {
        const matchSearch =
          !search ||
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.brands.some((b) => b.toLowerCase().includes(search.toLowerCase()))
        const matchCity = cityFilter === "todas" || a.city === cityFilter
        const matchType = typeFilter === "todos" || a.type === typeFilter
        return matchSearch && matchCity && matchType
      })
      .map((a) => ({
        ...a,
        distance:
          userLocation.lat && userLocation.lon
            ? haversineDistance(userLocation.lat, userLocation.lon, a.lat, a.lon)
            : undefined,
      }))
      .sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance
        if (a.distance !== undefined) return -1
        if (b.distance !== undefined) return 1
        return a.city.localeCompare(b.city)
      })
  }, [search, cityFilter, typeFilter, userLocation.lat, userLocation.lon])

  useEffect(() => {
    if (selectedId) {
      document.getElementById(`agency-${selectedId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [selectedId])

  return (
    <div className="map-layout flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 flex flex-col border-r shrink-0 overflow-hidden bg-background">
        <div className="p-3 border-b">
          <h2 className="font-bold text-base mb-2">🚗 Agencias Vehiculares · Bolivia</h2>

          <Input
            placeholder="Buscar marca, nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 h-8 text-sm"
          />

          <div className="flex gap-2">
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="h-7 text-xs flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c} className="text-xs">
                    {c === "todas" ? "Todas las ciudades" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-7 text-xs flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos" className="text-xs">Todos</SelectItem>
                <SelectItem value="concesionario" className="text-xs">Concesionario</SelectItem>
                <SelectItem value="taller" className="text-xs">Taller</SelectItem>
                <SelectItem value="repuestos" className="text-xs">Repuestos</SelectItem>
                <SelectItem value="multimarca" className="text-xs">Multimarca</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="px-3 py-2 border-b bg-muted/30">
          <p className="text-xs text-muted-foreground">
            {filtered.length} agencias{cityFilter !== "todas" ? ` en ${cityFilter}` : " en Bolivia"}
            {userLocation.lat ? " · por cercanía" : ""}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Toca un pin para ver la ruta</p>
        </div>

        {/* Leyenda */}
        <div className="px-3 py-2 border-b bg-muted/10 flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-700 border-2 border-white shadow-sm" />Concesionario</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-600 border-2 border-white shadow-sm" />Taller</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-sm" />Repuestos</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-600 border-2 border-white shadow-sm" />Multimarca</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
              <span className="text-3xl">🔍</span>
              No se encontraron agencias
            </div>
          ) : (
            filtered.map((agency) => (
              <div
                key={agency.id}
                id={`agency-${agency.id}`}
                className={`transition-all rounded-lg cursor-pointer ${selectedId === agency.id ? "ring-2 ring-blue-500 ring-offset-1" : ""}`}
                onClick={() => setSelectedId(agency.id)}
              >
                <AgencyCard agency={agency} distance={agency.distance} selected={selectedId === agency.id} />
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
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              Cargando mapa...
            </div>
          }
        >
          {() => (
            <LazyAgencyMap
              agencies={filtered}
              selectedId={selectedId}
              userLat={userLocation.lat}
              userLon={userLocation.lon}
              onSelect={setSelectedId}
            />
          )}
        </ClientOnly>
      </div>
    </div>
  )
}
