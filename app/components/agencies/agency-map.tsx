// Solo carga en el cliente
import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { type VehicleAgency } from "~/utils/vehicleAgencies"
import { haversineDistance, formatDistance } from "~/utils/distance"

function makeAgencyPin(color: string, letter: string) {
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44"
               style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4))">
      <path d="M16 2C8.8 2 3 7.8 3 15c0 10.5 13 27 13 27S29 25.5 29 15C29 7.8 23.2 2 16 2z"
            fill="${color}" stroke="white" stroke-width="2.5"/>
      <circle cx="16" cy="15" r="7" fill="white"/>
      <text x="16" y="19.5" text-anchor="middle" font-size="8" font-weight="800"
            fill="${color}" font-family="system-ui,sans-serif">${letter}</text>
    </svg>`,
    className: "",
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -46],
  })
}

const TYPE_PINS: Record<string, { color: string; letter: string }> = {
  concesionario: { color: "#1d4ed8", letter: "C" },
  taller:        { color: "#d97706", letter: "T" },
  repuestos:     { color: "#16a34a", letter: "R" },
  multimarca:    { color: "#7c3aed", letter: "M" },
}

const userPin = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48"
             style="filter:drop-shadow(0 3px 5px rgba(59,130,246,0.5))">
    <path d="M18 2C9.7 2 3 8.7 3 17c0 11.5 15 29 15 29S33 28.5 33 17C33 8.7 26.3 2 18 2z"
          fill="#3b82f6" stroke="white" stroke-width="2.5"/>
    <circle cx="18" cy="17" r="8" fill="white"/>
    <circle cx="18" cy="17" r="5" fill="#3b82f6"/>
  </svg>`,
  className: "",
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -50],
})

interface Props {
  agencies: (VehicleAgency & { distance?: number })[]
  selectedId: string | null
  userLat: number | null
  userLon: number | null
  onSelect: (id: string) => void
}

async function fetchRoute(fromLat: number, fromLon: number, toLat: number, toLon: number) {
  const url = `https://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=full&geometries=geojson`
  const res = await fetch(url)
  const data = await res.json()
  if (data.code !== "Ok") throw new Error("Ruta no encontrada")
  const route = data.routes[0]
  return {
    coords: route.geometry.coordinates.map(([lon, lat]: number[]) => [lat, lon] as [number, number]),
    distanceKm: (route.distance / 1000).toFixed(1),
    durationMin: Math.round(route.duration / 60),
  }
}

export default function AgencyMap({ agencies, selectedId, userLat, userLon, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)
  const userLayerRef = useRef<L.LayerGroup | null>(null)
  const routeRef = useRef<L.Polyline | null>(null)
  const locationRef = useRef({ userLat, userLon })
  locationRef.current = { userLat, userLon }

  useEffect(() => {
    const container = containerRef.current
    if (!container || mapRef.current) return
    const map = L.map(container, { center: [-17.4, -65.5], zoom: 6 })
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap',
    }).addTo(map)
    layerRef.current = L.layerGroup().addTo(map)
    userLayerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map
    map.on("click", () => {
      if (routeRef.current) { map.removeLayer(routeRef.current); routeRef.current = null }
    })
    return () => { map.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    const map = mapRef.current; const layer = userLayerRef.current
    if (!map || !layer) return
    layer.clearLayers()
    if (userLat && userLon) {
      L.marker([userLat, userLon], { icon: userPin }).bindPopup("Tu ubicación").addTo(layer)
      map.setView([userLat, userLon], Math.max(map.getZoom(), 12))
    }
  }, [userLat, userLon])

  useEffect(() => {
    const map = mapRef.current; const layer = layerRef.current
    if (!map || !layer) return
    layer.clearLayers()
    if (routeRef.current) { map.removeLayer(routeRef.current); routeRef.current = null }

    agencies.forEach((agency) => {
      const pinCfg = TYPE_PINS[agency.type] ?? { color: "#374151", letter: "A" }
      const icon = makeAgencyPin(pinCfg.color, pinCfg.letter)
      const isSelected = agency.id === selectedId

      const marker = L.marker([agency.lat, agency.lon], { icon, zIndexOffset: isSelected ? 1000 : 0 })
        .addTo(layer!)

      const buildPopup = (extra = "") => `
        <div style="min-width:210px;font-family:system-ui,sans-serif">
          <p style="font-size:14px;font-weight:700;margin:0 0 3px">${agency.name}</p>
          <p style="font-size:11px;color:#6b7280;margin:1px 0">${agency.type.charAt(0).toUpperCase() + agency.type.slice(1)} · ${agency.city}</p>
          <p style="font-size:11px;color:#6b7280;margin:1px 0">📍 ${agency.address}</p>
          ${agency.phone ? `<p style="font-size:11px;margin:2px 0">📞 ${agency.phone}</p>` : ""}
          <div style="display:flex;flex-wrap:wrap;gap:3px;margin:4px 0">
            ${agency.brands.map(b => `<span style="font-size:10px;background:#eff6ff;color:#1d4ed8;padding:1px 6px;border-radius:99px;border:1px solid #bfdbfe">${b}</span>`).join("")}
          </div>
          <p style="font-size:10px;color:#9ca3af;margin:2px 0">${agency.services.join(" · ")}</p>
          ${agency.distance !== undefined ? `<p style="font-size:11px;color:#2563eb;font-weight:700;margin:3px 0">📍 ${formatDistance(agency.distance)}</p>` : ""}
          ${extra}
        </div>`

      marker.bindPopup(buildPopup(), { maxWidth: 250 })
      marker.on("click", async (e) => {
        L.DomEvent.stopPropagation(e)
        onSelect(agency.id)
        const { userLat: uLat, userLon: uLon } = locationRef.current
        if (!uLat || !uLon) {
          marker.getPopup()?.setContent(buildPopup(`
            <a href="https://www.google.com/maps/dir/?api=1&destination=${agency.lat},${agency.lon}" target="_blank"
              style="display:block;margin-top:6px;background:#3b82f6;color:white;text-align:center;padding:5px;border-radius:6px;text-decoration:none;font-size:12px">
              🗺️ Abrir en Google Maps</a>`))
          marker.openPopup()
          return
        }
        marker.getPopup()?.setContent(buildPopup(`<p style="color:#6b7280;font-size:11px;margin-top:4px">⏳ Calculando ruta...</p>`))
        marker.openPopup()
        try {
          const { coords, distanceKm, durationMin } = await fetchRoute(uLat, uLon, agency.lat, agency.lon)
          if (routeRef.current) map.removeLayer(routeRef.current)
          const line = L.polyline(coords, { color: "#3b82f6", weight: 6, opacity: 0.85, lineJoin: "round" }).addTo(map)
          routeRef.current = line
          map.fitBounds(line.getBounds(), { padding: [70, 70] })
          marker.getPopup()?.setContent(buildPopup(`
            <div style="margin-top:8px;padding:6px 8px;background:#eff6ff;border-radius:6px;border:1px solid #bfdbfe">
              <p style="color:#1d4ed8;font-weight:700;font-size:12px;margin:0">🗺️ Ruta más corta · ${distanceKm} km · ~${durationMin} min</p>
            </div>`))
          marker.openPopup()
        } catch {
          marker.getPopup()?.setContent(buildPopup(`
            <a href="https://www.google.com/maps/dir/?api=1&destination=${agency.lat},${agency.lon}" target="_blank"
              style="display:block;margin-top:6px;background:#3b82f6;color:white;text-align:center;padding:5px;border-radius:6px;text-decoration:none;font-size:12px">
              🗺️ Ver en Google Maps</a>`))
          marker.openPopup()
        }
      })
    })
  }, [agencies, selectedId])

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
}
