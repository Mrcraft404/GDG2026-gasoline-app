import { useGenexData } from "~/context/genexCtx"
import { useConfig, type FuelPreference } from "~/context/configCtx"
import { useUserLocation } from "~/context/locationCtx"
import { haversineDistance } from "~/utils/distance"
import GenexCard from "./genex-card"
import { useFetchers } from "react-router"

export default function GenexList() {
  const { genexStationsData } = useGenexData()

  const { config } = useConfig()
  const location = useUserLocation()
  const loading = useFetchers().length > 0

  const fuelType =
    config.fuelPreference !== "ELECTRICO"
      ? (config.fuelPreference as Exclude<FuelPreference, "ELECTRICO">)
      : undefined

  if (loading) return <p className="p-4 text-sm text-muted-foreground">Cargando estaciones...</p>
  if (!genexStationsData.length)
    return (
      <p className="p-4 text-sm text-muted-foreground">
        Sin datos. Presiona Actualizar en la barra superior.
      </p>
    )

  return (
    <>
      {genexStationsData.map((station, index) => (
        <GenexCard
          key={index}
          {...station}
          fuelType={fuelType}
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
