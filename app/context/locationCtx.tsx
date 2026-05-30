import { createContext, useContext, useEffect, useState } from "react"

interface LocationState {
  lat: number | null
  lon: number | null
  error: string | null
  loading: boolean
}

const LocationCtx = createContext<LocationState>({
  lat: null,
  lon: null,
  error: null,
  loading: false,
})

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LocationState>({
    lat: null,
    lon: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ lat: null, lon: null, error: "Geolocalización no disponible", loading: false })
      return
    }

    // Usar watchPosition para mantener la ubicación actualizada
    const watchId = navigator.geolocation.watchPosition(
      (pos) =>
        setState({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          error: null,
          loading: false,
        }),
      (err) => {
        const msg = err.code === 1
          ? "Permiso de ubicación denegado — activa el GPS en el navegador"
          : err.code === 2
          ? "Ubicación no disponible — verifica el GPS"
          : "Tiempo de espera agotado para la ubicación"
        setState({ lat: null, lon: null, error: msg, loading: false })
      },
      { timeout: 15000, maximumAge: 30000, enableHighAccuracy: false }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return <LocationCtx.Provider value={state}>{children}</LocationCtx.Provider>
}

export const useUserLocation = () => useContext(LocationCtx)
