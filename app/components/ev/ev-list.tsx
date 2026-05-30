import { useUserLocation } from "~/context/locationCtx"
import { haversineDistance } from "~/utils/distance"
import { evStationsBolivia } from "~/utils/evStationsBolivia"
import { useEvData } from "~/context/evCtx"
import EVCard from "./ev-card"

interface Props {
  cityFilter?: string
  statusFilter?: string
  accessFilter?: string
  costFilter?: string
}

export default function EVList({ cityFilter, statusFilter, accessFilter, costFilter }: Props) {
  const location = useUserLocation()
  const { selectedEvId } = useEvData()

  const filtered = evStationsBolivia
    .filter((s) => {
      if (cityFilter && cityFilter !== "todas" && s.city !== cityFilter) return false
      if (statusFilter && statusFilter !== "todos" && s.status !== statusFilter) return false
      if (accessFilter && accessFilter !== "todos" && s.access !== accessFilter) return false
      if (costFilter && costFilter !== "todos" && s.cost !== costFilter) return false
      return true
    })
    .map((s) => ({
      ...s,
      distance:
        location.lat && location.lon
          ? haversineDistance(location.lat, location.lon, s.lat, s.lon)
          : undefined,
    }))
    .sort((a, b) => {
      if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance
      if (a.distance !== undefined) return -1
      if (b.distance !== undefined) return 1
      return a.city.localeCompare(b.city)
    })

  if (!filtered.length) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm gap-2">
        <span className="text-3xl">🔍</span>
        No se encontraron estaciones
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {filtered.map((station) => (
        <li key={station.id} id={`ev-${station.id}`}>
          <EVCard station={station} selected={selectedEvId === station.id} />
        </li>
      ))}
    </ul>
  )
}
