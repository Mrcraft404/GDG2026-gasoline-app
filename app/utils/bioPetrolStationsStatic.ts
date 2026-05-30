export type BioPetrolFuelType =
  | "Gasolina Especial"
  | "Gasolina Premium"
  | "Diesel"
  | "GLP Vehicular"

export interface BioPetrolStationStatic {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lon: number
  fuels: BioPetrolFuelType[]
  phone?: string
  openHours?: string
  notes?: string
}

export const BIOPETROL_FUEL_COLORS: Record<BioPetrolFuelType, string> = {
  "Gasolina Especial": "bg-green-100 text-green-800 border-green-200",
  "Gasolina Premium":  "bg-purple-100 text-purple-800 border-purple-200",
  "Diesel":            "bg-amber-100 text-amber-800 border-amber-200",
  "GLP Vehicular":     "bg-blue-100 text-blue-800 border-blue-200",
}

// ═══════════════════════════════════════════════════════════════════════
// DATOS ESTÁTICOS — Surtidores BioPetrol en Bolivia
// BioPetrol: red de distribución de combustibles afiliada a YPFB
// Combustibles rastreados vía API: Diesel (132), Premium (133), Especial (134)
// ═══════════════════════════════════════════════════════════════════════
export const bioPetrolStationsStatic: BioPetrolStationStatic[] = [

  // ─── SANTA CRUZ DE LA SIERRA ──────────────────────────────────────

  {
    id: "bp-sc-centro",
    name: "BioPetrol – Santa Cruz Centro",
    address: "Av. Grigotá, 1er anillo",
    city: "Santa Cruz",
    lat: -17.7890,
    lon: -63.1820,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "00:00 – 24:00",
    notes: "Estación 24 horas. Una de las más concurridas del centro.",
  },

  {
    id: "bp-sc-equipetrol",
    name: "BioPetrol – Equipetrol",
    address: "Av. San Martín, 3er anillo, Equipetrol",
    city: "Santa Cruz",
    lat: -17.7860,
    lon: -63.1730,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:00 – 23:00",
    notes: "Zona Equipetrol. Alta demanda de Premium.",
  },

  {
    id: "bp-sc-banzer",
    name: "BioPetrol – Av. Banzer",
    address: "Av. Banzer, 4to anillo norte",
    city: "Santa Cruz",
    lat: -17.7540,
    lon: -63.1960,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel", "GLP Vehicular"],
    openHours: "00:00 – 24:00",
    notes: "Estación con GLP. Zona norte, alto flujo de vehículos pesados.",
  },

  {
    id: "bp-sc-las-palmas",
    name: "BioPetrol – Las Palmas",
    address: "Av. Las Palmas, zona residencial",
    city: "Santa Cruz",
    lat: -17.7780,
    lon: -63.1650,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:30 – 22:30",
    notes: "Zona residencial este. Predomina Especial y Premium.",
  },

  {
    id: "bp-sc-hernando-siles",
    name: "BioPetrol – Av. Hernando Siles",
    address: "Av. Hernando Siles, 2do anillo",
    city: "Santa Cruz",
    lat: -17.7950,
    lon: -63.1740,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:00 – 22:00",
  },

  {
    id: "bp-sc-cañoto",
    name: "BioPetrol – Av. Cañoto",
    address: "Av. Cañoto, zona centro",
    city: "Santa Cruz",
    lat: -17.7810,
    lon: -63.1800,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:00 – 22:00",
    notes: "Zona centro histórico.",
  },

  {
    id: "bp-sc-busch",
    name: "BioPetrol – Av. Busch",
    address: "Av. Busch, 3er anillo sur",
    city: "Santa Cruz",
    lat: -17.7910,
    lon: -63.1640,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:30 – 22:30",
    notes: "Corredor sur. Acceso a zonas industriales.",
  },

  {
    id: "bp-sc-doble-via-cochabamba",
    name: "BioPetrol – Doble Vía Cochabamba",
    address: "Doble Vía a Cochabamba Km 6",
    city: "Santa Cruz",
    lat: -17.7720,
    lon: -63.2180,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:00 – 22:00",
    notes: "Corredor oeste, salida hacia Cochabamba. Alto flujo de camiones (Diesel).",
  },

  {
    id: "bp-sc-plan3000",
    name: "BioPetrol – Plan 3000",
    address: "Plan 3 Mil, Av. Principal",
    city: "Santa Cruz",
    lat: -17.8200,
    lon: -63.1500,
    fuels: ["Gasolina Especial", "Diesel"],
    openHours: "05:30 – 21:30",
    notes: "Zona Plan 3000. Solo Especial y Diesel en esta estación.",
  },

  // ─── LA PAZ ────────────────────────────────────────────────────────

  {
    id: "bp-lpz-miraflores",
    name: "BioPetrol – Miraflores",
    address: "Av. Saavedra, Miraflores",
    city: "La Paz",
    lat: -16.4960,
    lon: -68.1160,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Zona Miraflores. Alta demanda institucional y gubernamental.",
  },

  {
    id: "bp-lpz-sopocachi",
    name: "BioPetrol – Sopocachi",
    address: "Av. 20 de Octubre, Sopocachi",
    city: "La Paz",
    lat: -16.5120,
    lon: -68.1210,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Zona Sopocachi. Alta demanda de Premium.",
  },

  {
    id: "bp-lpz-zona-sur",
    name: "BioPetrol – Zona Sur",
    address: "Av. Ballivián, San Miguel",
    city: "La Paz",
    lat: -16.5370,
    lon: -68.0790,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Zona Sur, San Miguel. Alta demanda de Premium.",
  },

  {
    id: "bp-lpz-villa-fatima",
    name: "BioPetrol – Villa Fátima",
    address: "Av. de las Américas, Villa Fátima",
    city: "La Paz",
    lat: -16.4900,
    lon: -68.1080,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:30 – 22:00",
    notes: "Zona norte La Paz. Punto de salida hacia El Alto.",
  },

  // ─── EL ALTO ───────────────────────────────────────────────────────

  {
    id: "bp-elalto-16-julio",
    name: "BioPetrol – El Alto (16 de Julio)",
    address: "Av. 16 de Julio, feria 16 de Julio",
    city: "El Alto",
    lat: -16.5100,
    lon: -68.1750,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel", "GLP Vehicular"],
    openHours: "05:00 – 22:00",
    notes: "Una de las estaciones más activas de El Alto. Zona comercial feria 16 de Julio.",
  },

  {
    id: "bp-elalto-aeropuerto",
    name: "BioPetrol – El Alto (Aeropuerto)",
    address: "Av. Costanera, zona aeropuerto",
    city: "El Alto",
    lat: -16.5130,
    lon: -68.1920,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:00 – 23:00",
    notes: "Cercano al Aeropuerto Internacional El Alto. Alto flujo de vehículos.",
  },

  // ─── COCHABAMBA ────────────────────────────────────────────────────

  {
    id: "bp-cbba-america",
    name: "BioPetrol – Av. América",
    address: "Av. América, zona norte",
    city: "Cochabamba",
    lat: -17.3840,
    lon: -66.1560,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Zona norte Cochabamba.",
  },

  {
    id: "bp-cbba-heroinas",
    name: "BioPetrol – Av. Heroínas",
    address: "Av. Heroínas, zona central",
    city: "Cochabamba",
    lat: -17.3930,
    lon: -66.1580,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "00:00 – 24:00",
    notes: "Estación 24 horas en zona central.",
  },

  {
    id: "bp-cbba-blanco-galindo",
    name: "BioPetrol – Blanco Galindo",
    address: "Av. Blanco Galindo Km 5, zona industrial",
    city: "Cochabamba",
    lat: -17.3880,
    lon: -66.1900,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "05:00 – 22:00",
    notes: "Corredor industrial oeste. Alto flujo de Diesel por transporte pesado.",
  },

  // ─── SUCRE ─────────────────────────────────────────────────────────

  {
    id: "bp-sucre-central",
    name: "BioPetrol – Sucre",
    address: "Av. Hernando Siles, Sucre",
    city: "Sucre",
    lat: -19.0450,
    lon: -65.2600,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Principal estación BioPetrol en la capital constitucional.",
  },

  // ─── ORURO ─────────────────────────────────────────────────────────

  {
    id: "bp-oruro-central",
    name: "BioPetrol – Oruro",
    address: "Av. 6 de Agosto, Oruro",
    city: "Oruro",
    lat: -17.9660,
    lon: -67.1120,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Estación principal de Oruro. Corredor altiplánico La Paz–Oruro–Potosí.",
  },

  // ─── TARIJA ────────────────────────────────────────────────────────

  {
    id: "bp-tarija-central",
    name: "BioPetrol – Tarija",
    address: "Av. Las Américas, Tarija",
    city: "Tarija",
    lat: -21.5310,
    lon: -64.7280,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "Tarija. Importante para la ruta Bolivia-Argentina vía La Quiaca.",
  },

  // ─── POTOSÍ ────────────────────────────────────────────────────────

  {
    id: "bp-potosi-central",
    name: "BioPetrol – Potosí",
    address: "Av. Villazón, Potosí",
    city: "Potosí",
    lat: -19.5860,
    lon: -65.7550,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel"],
    openHours: "06:00 – 22:00",
    notes: "A 3967 msnm. Punto de paso ruta La Paz–Potosí–Sucre.",
  },
]

export const BIOPETROL_CITIES = [...new Set(bioPetrolStationsStatic.map((s) => s.city))].sort()
