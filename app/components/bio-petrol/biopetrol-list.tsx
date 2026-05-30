import { useBioPetrolData } from "~/context/biopetrolCtx"
import { useUserLocation } from "~/context/locationCtx"
import { haversineDistance } from "~/utils/distance"
import BioPetrolCard from "./biopetrol-card"
import { useFetchers } from "react-router"

export default function BioPetrolList() {
  const { bioPetrolStationsData } = useBioPetrolData()
  const location = useUserLocation()
  const loading = useFetchers().length > 0

  if (loading) return <p className="p-4 text-sm text-muted-foreground">Cargando estaciones...</p>
  if (!bioPetrolStationsData.length)
    return (
      <p className="p-4 text-sm text-muted-foreground">
        Sin datos. Presiona Actualizar en la barra superior.
      </p>
    )

  return (
    <>
      {bioPetrolStationsData.map((station, index) => (
        <BioPetrolCard
          key={index}
          {...station}
          distance={
            location.lat && station.lat && station.lon
              ? haversineDistance(location.lat, location.lon!, station.lat, station.lon)
              : undefined
          }
        />
      ))}
    </>
  )
}
