import { useEffect, useState } from "react"
import type { MapViewProps } from "./MapView"

export function LazyMapLoader(props: MapViewProps) {
  const [MapView, setMapView] = useState<React.ComponentType<MapViewProps> | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    import("./MapView")
      .then((m) => setMapView(() => m.default))
      .catch(() => setFailed(true))
  }, [])

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground p-6">
        <span className="text-2xl">🗺️</span>
        <p className="text-sm text-center">
          Mapa no disponible. Instala las dependencias con:
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded">
          npm install react-leaflet leaflet @types/leaflet
        </code>
      </div>
    )
  }

  if (!MapView) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
        Cargando mapa...
      </div>
    )
  }

  return <MapView {...props} />
}
