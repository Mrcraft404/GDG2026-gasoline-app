import { useEffect, useRef, useState } from "react"

export interface GeoInput {
  id: string
  address: string
}

export interface Coords {
  lat: number
  lon: number
}

const CACHE_KEY = "geocoding-cache-v1"

function readCache(): Record<string, Coords | null> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}")
  } catch {
    return {}
  }
}

function writeCache(cache: Record<string, Coords | null>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {}
}

export function useProgressiveGeocode(inputs: GeoInput[]): Record<string, Coords | null> {
  const [coords, setCoords] = useState<Record<string, Coords | null>>({})
  const processingRef = useRef(false)
  const inputsKey = inputs.map((i) => i.id).join(",")

  useEffect(() => {
    if (!inputs.length) return

    const cache = readCache()

    // Apply already-cached results immediately
    const initial: Record<string, Coords | null> = {}
    for (const { id, address } of inputs) {
      if (address in cache) initial[id] = cache[address]
    }
    if (Object.keys(initial).length) setCoords(initial)

    const toFetch = inputs.filter(({ address }) => !(address in cache))
    if (!toFetch.length || processingRef.current) return

    processingRef.current = true
    let cancelled = false

    ;(async () => {
      for (const { id, address } of toFetch) {
        if (cancelled) break
        try {
          const params = new URLSearchParams({
            q: `${address}, Bolivia`,
            format: "json",
            limit: "1",
            countrycodes: "bo",
          })
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?${params}`,
            { headers: { "User-Agent": "BoliviaFuelMapper/1.0" } }
          )
          const data = await res.json()
          const result: Coords | null = data[0]
            ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
            : null
          cache[address] = result
          writeCache(cache)
          if (!cancelled) setCoords((prev) => ({ ...prev, [id]: result }))
        } catch {
          cache[address] = null
          writeCache(cache)
        }
        // Nominatim rate limit: max 1 req/sec (600ms da buen balance)
        await new Promise((r) => setTimeout(r, 600))
      }
      processingRef.current = false
    })()

    return () => {
      cancelled = true
    }
  }, [inputsKey])

  return coords
}
