// Solo carga en el cliente
import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { EVStationBolivia, StationStatus } from "~/utils/evStationsBolivia"
import { haversineDistance, formatDistance } from "~/utils/distance"

const STATUS_COLORS: Record<StationStatus, string> = {
  operacional:      "#16a34a",
  en_construccion:  "#d97706",
  fuera_servicio:   "#dc2626",
  desconocido:      "#6b7280",
}

const STATUS_LABEL: Record<StationStatus, string> = {
  operacional:      "Operacional",
  en_construccion:  "En construcción",
  fuera_servicio:   "Fuera de servicio",
  desconocido:      "Desconocido",
}

const ACCESS_LABEL: Record<string, string> = {
  publico:      "Público",
  semi_publico: "Semi-público",
  privado:      "Privado",
}

const COST_LABEL: Record<string, string> = {
  gratis:      "Gratuito",
  pago:        "Pago",
  suscripcion: "Suscripción",
}

function makeEVPin(status: StationStatus) {
  const color = STATUS_COLORS[status]
  const letter = status === "operacional" ? "⚡" : status === "en_construccion" ? "🔧" : "✕"
  const textEl = status === "operacional"
    ? `<text x="16" y="20" text-anchor="middle" font-size="11" fill="white" font-family="system-ui,sans-serif">⚡</text>`
    : `<text x="16" y="19.5" text-anchor="middle" font-size="9" font-weight="800" fill="${color}" font-family="system-ui,sans-serif">${status === "en_construccion" ? "WIP" : "OFF"}</text>`
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44"
               style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
      <path d="M16 2C8.8 2 3 7.8 3 15c0 10.5 13 27 13 27S29 25.5 29 15C29 7.8 23.2 2 16 2z"
            fill="${color}" stroke="white" stroke-width="2.5"/>
      <circle cx="16" cy="15" r="7" fill="white"/>
      ${textEl}
    </svg>`,
    className: "",
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -46],
  })
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
  stations: (EVStationBolivia & { distance?: number })[]
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

export default function EVMap({ stations, selectedId, userLat, userLon, onSelect }: Props) {
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
      attribution: "© OpenStreetMap",
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

    stations.forEach((station) => {
      const icon = makeEVPin(station.status)
      const isSelected = station.id === selectedId

      const marker = L.marker([station.lat, station.lon], { icon, zIndexOffset: isSelected ? 1000 : 0 })
        .addTo(layer!)

      const connectorsHtml = station.connectors.map(c =>
        `<span style="font-size:10px;background:#f0fdf4;color:#166534;padding:1px 5px;border-radius:99px;border:1px solid #bbf7d0;display:inline-block;margin:1px">
          ${c.standard} ${c.type} · ${c.powerKW} kW ×${c.quantity}
        </span>`
      ).join("")

      const buildPopup = (extra = "") => `
        <div style="min-width:220px;font-family:system-ui,sans-serif">
          <p style="font-size:14px;font-weight:700;margin:0 0 3px">${station.name}</p>
          <p style="font-size:11px;color:#6b7280;margin:1px 0">${station.operator}</p>
          <p style="font-size:11px;color:#6b7280;margin:1px 0">📍 ${station.address}, ${station.city}</p>
          <div style="margin:4px 0">
            <span style="font-size:10px;background:${STATUS_COLORS[station.status]}22;color:${STATUS_COLORS[station.status]};padding:1px 6px;border-radius:99px;border:1px solid ${STATUS_COLORS[station.status]}44">
              ${STATUS_LABEL[station.status]}
            </span>
            <span style="font-size:10px;background:#eff6ff;color:#1d4ed8;padding:1px 5px;border-radius:99px;border:1px solid #bfdbfe;margin-left:3px">
              ${ACCESS_LABEL[station.access] ?? station.access}
            </span>
            <span style="font-size:10px;background:#fefce8;color:#713f12;padding:1px 5px;border-radius:99px;border:1px solid #fde68a;margin-left:3px">
              ${COST_LABEL[station.cost] ?? station.cost}
            </span>
          </div>
          <div style="margin:4px 0;display:flex;flex-wrap:wrap;gap:2px">${connectorsHtml}</div>
          ${station.openHours ? `<p style="font-size:10px;color:#6b7280;margin:2px 0">🕐 ${station.openHours}</p>` : ""}
          ${station.notes ? `<p style="font-size:10px;color:#374151;margin:3px 0;font-style:italic">${station.notes}</p>` : ""}
          ${station.distance !== undefined ? `<p style="font-size:11px;color:#2563eb;font-weight:700;margin:3px 0">📍 ${formatDistance(station.distance)}</p>` : ""}
          ${extra}
        </div>`

      marker.bindPopup(buildPopup(), { maxWidth: 280 })
      marker.on("click", async (e) => {
        L.DomEvent.stopPropagation(e)
        onSelect(station.id)
        const { userLat: uLat, userLon: uLon } = locationRef.current
        if (!uLat || !uLon) {
          marker.getPopup()?.setContent(buildPopup(`
            <a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}" target="_blank"
              style="display:block;margin-top:6px;background:#16a34a;color:white;text-align:center;padding:5px;border-radius:6px;text-decoration:none;font-size:12px">
              🗺️ Abrir en Google Maps</a>`))
          marker.openPopup()
          return
        }
        marker.getPopup()?.setContent(buildPopup(`<p style="color:#6b7280;font-size:11px;margin-top:4px">⏳ Calculando ruta...</p>`))
        marker.openPopup()
        try {
          const { coords, distanceKm, durationMin } = await fetchRoute(uLat, uLon, station.lat, station.lon)
          if (routeRef.current) map.removeLayer(routeRef.current)
          const line = L.polyline(coords, { color: "#16a34a", weight: 6, opacity: 0.85, lineJoin: "round" }).addTo(map)
          routeRef.current = line
          map.fitBounds(line.getBounds(), { padding: [70, 70] })
          marker.getPopup()?.setContent(buildPopup(`
            <div style="margin-top:8px;padding:6px 8px;background:#f0fdf4;border-radius:6px;border:1px solid #bbf7d0">
              <p style="color:#15803d;font-weight:700;font-size:12px;margin:0">⚡ Ruta al cargador · ${distanceKm} km · ~${durationMin} min</p>
            </div>`))
          marker.openPopup()
        } catch {
          marker.getPopup()?.setContent(buildPopup(`
            <a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}" target="_blank"
              style="display:block;margin-top:6px;background:#16a34a;color:white;text-align:center;padding:5px;border-radius:6px;text-decoration:none;font-size:12px">
              🗺️ Ver en Google Maps</a>`))
          marker.openPopup()
        }
      })
    })
  }, [stations, selectedId])

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
}
