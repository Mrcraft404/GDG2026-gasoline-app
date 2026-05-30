import axios from "axios"

export interface EVStation {
  id: number
  name: string
  address: string
  town: string
  lat: number
  lon: number
  connections: {
    type: string
    powerKW: number | null
    quantity: number | null
  }[]
  status: string
  operatorName: string | null
}

export async function getEVChargingStations(): Promise<EVStation[]> {
  const apiKey = process.env.OPENCHARGEMAP_API_KEY

  if (!apiKey) {
    console.warn("[EV] OPENCHARGEMAP_API_KEY no configurada — la sección EV estará vacía")
    return []
  }

  const url = new URL("https://api.openchargemap.io/v3/poi/")
  url.searchParams.set("output", "json")
  url.searchParams.set("countrycode", "BO")
  url.searchParams.set("maxresults", "100")
  url.searchParams.set("compact", "true")
  url.searchParams.set("verbose", "false")
  url.searchParams.set("key", apiKey)

  try {
    const response = await axios.get(url.href, { timeout: 10000 })
    return (response.data as any[]).map((station): EVStation => ({
      id: station.ID,
      name: station.AddressInfo?.Title ?? "Sin nombre",
      address: station.AddressInfo?.AddressLine1 ?? "",
      town: station.AddressInfo?.Town ?? "",
      lat: station.AddressInfo?.Latitude,
      lon: station.AddressInfo?.Longitude,
      connections: (station.Connections ?? []).map((c: any) => ({
        type: c.ConnectionType?.Title ?? "Desconocido",
        powerKW: c.PowerKW ?? null,
        quantity: c.Quantity ?? null,
      })),
      status: station.StatusType?.Title ?? "Desconocido",
      operatorName: station.OperatorInfo?.Title ?? null,
    }))
  } catch (err) {
    console.error("[EV] Error al obtener estaciones de carga:", err)
    return []
  }
}
