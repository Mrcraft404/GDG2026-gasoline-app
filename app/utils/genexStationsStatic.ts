export type GenexFuelType =
  | "Gasolina Especial"
  | "Gasolina Premium"
  | "Diesel Oil"
  | "GLP Vehicular"
  | "Kerosene"

export interface GenexStationStatic {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lon: number
  fuels: GenexFuelType[]
  phone?: string
  openHours?: string
  notes?: string
}

export const GENEX_FUEL_COLORS: Record<GenexFuelType, string> = {
  "Gasolina Especial": "bg-green-100 text-green-800 border-green-200",
  "Gasolina Premium":  "bg-purple-100 text-purple-800 border-purple-200",
  "Diesel Oil":        "bg-amber-100 text-amber-800 border-amber-200",
  "GLP Vehicular":     "bg-blue-100 text-blue-800 border-blue-200",
  "Kerosene":          "bg-gray-100 text-gray-700 border-gray-200",
}

// ═══════════════════════════════════════════════════════════════════════
// DATOS ESTÁTICOS — Surtidores Genex en Bolivia
// Fuente: genex.com.bo · coordenadas verificadas con OpenStreetMap
// ═══════════════════════════════════════════════════════════════════════
export const genexStationsStatic: GenexStationStatic[] = [

  // ─── SANTA CRUZ DE LA SIERRA ──────────────────────────────────────

  {
    id: "genex-sc-equipetrol",
    name: "Genex – Equipetrol",
    address: "Av. San Martín, zona Equipetrol, 3er anillo",
    city: "Santa Cruz",
    lat: -17.7870,
    lon: -63.1710,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "00:00 – 24:00",
    notes: "Estación 24 horas. Zona Equipetrol, una de las más concurridas de la ciudad.",
  },

  {
    id: "genex-sc-cristo-redentor",
    name: "Genex – Cristo Redentor",
    address: "Av. Cristo Redentor esq. 2do anillo",
    city: "Santa Cruz",
    lat: -17.7847,
    lon: -63.1746,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 23:00",
    notes: "Zona de alto tránsito, cerca del 2do anillo.",
  },

  {
    id: "genex-sc-banzer-norte",
    name: "Genex – Av. Banzer Norte",
    address: "Av. Banzer, 3er anillo externo norte",
    city: "Santa Cruz",
    lat: -17.7560,
    lon: -63.1950,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil", "GLP Vehicular"],
    openHours: "00:00 – 24:00",
    notes: "Una de las pocas estaciones Genex con GLP vehicular. Zona comercial norte.",
  },

  {
    id: "genex-sc-alemana",
    name: "Genex – Av. Alemana",
    address: "Av. Alemana, 4to anillo",
    city: "Santa Cruz",
    lat: -17.7620,
    lon: -63.1880,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:30 – 22:30",
    notes: "Zona norte. Flujo constante de vehículos pesados (Diesel).",
  },

  {
    id: "genex-sc-monsenor-rivero",
    name: "Genex – Monseñor Rivero",
    address: "Av. Monseñor Rivero, 2do anillo",
    city: "Santa Cruz",
    lat: -17.7750,
    lon: -63.1820,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 22:00",
    notes: "Zona céntrica. Alta demanda de Gasolina Especial.",
  },

  {
    id: "genex-sc-beni",
    name: "Genex – Av. Beni",
    address: "Av. Beni, 2do anillo",
    city: "Santa Cruz",
    lat: -17.7820,
    lon: -63.1780,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 23:00",
    notes: "Zona este, acceso a barrios residenciales.",
  },

  {
    id: "genex-sc-canoto",
    name: "Genex – Av. Cañoto",
    address: "Av. Cañoto, zona centro norte",
    city: "Santa Cruz",
    lat: -17.7770,
    lon: -63.1840,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:30 – 22:00",
    notes: "Zona centro. Una de las estaciones más antiguas de la red.",
  },

  {
    id: "genex-sc-roca-coronado",
    name: "Genex – Roca y Coronado",
    address: "Av. Roca y Coronado, 3er anillo",
    city: "Santa Cruz",
    lat: -17.7680,
    lon: -63.1900,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "00:00 – 24:00",
    notes: "Estación 24 horas. Zona norte-oeste.",
  },

  {
    id: "genex-sc-el-trompillo",
    name: "Genex – El Trompillo",
    address: "Av. El Trompillo, zona sur",
    city: "Santa Cruz",
    lat: -17.7960,
    lon: -63.1720,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 22:00",
    notes: "Zona aeropuerto viejo (El Trompillo). Alto tránsito.",
  },

  {
    id: "genex-sc-mutualista",
    name: "Genex – Mutualista",
    address: "Av. Mutualista, 2do anillo sur",
    city: "Santa Cruz",
    lat: -17.7930,
    lon: -63.1800,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:30 – 22:30",
    notes: "Zona sur residencial.",
  },

  {
    id: "genex-sc-4anillo-norte",
    name: "Genex – 4to Anillo Norte",
    address: "Av. Cristóbal de Mendoza, 4to anillo norte",
    city: "Santa Cruz",
    lat: -17.7500,
    lon: -63.1770,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil", "GLP Vehicular"],
    openHours: "00:00 – 24:00",
    notes: "Estación 24 horas con GLP vehicular. Corredor norte de la ciudad.",
  },

  {
    id: "genex-sc-warnes",
    name: "Genex – Doble Vía a Warnes",
    address: "Doble Vía a Warnes Km 4",
    city: "Santa Cruz",
    lat: -17.7200,
    lon: -63.2080,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 22:00",
    notes: "Corredor norte hacia Warnes y Montero. Alto tránsito de camiones (Diesel).",
  },

  {
    id: "genex-sc-la-guardia",
    name: "Genex – Doble Vía La Guardia",
    address: "Doble Vía a La Guardia Km 5",
    city: "Santa Cruz",
    lat: -17.8310,
    lon: -63.1560,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 22:00",
    notes: "Corredor sur-este. Acceso a zonas industriales.",
  },

  {
    id: "genex-sc-san-martin",
    name: "Genex – Av. San Martín Este",
    address: "Av. San Martín, 4to anillo este",
    city: "Santa Cruz",
    lat: -17.7900,
    lon: -63.1640,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "00:00 – 24:00",
    notes: "Estación 24 horas. Zona este de la ciudad.",
  },

  {
    id: "genex-sc-piraí",
    name: "Genex – Av. Piraí",
    address: "Av. Piraí, 3er anillo oeste",
    city: "Santa Cruz",
    lat: -17.7730,
    lon: -63.2060,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:30 – 22:30",
    notes: "Zona oeste. Acceso hacia la doble vía a Cochabamba.",
  },

  // ─── LA PAZ ────────────────────────────────────────────────────────

  {
    id: "genex-lpz-sopocachi",
    name: "Genex – Sopocachi",
    address: "Av. 6 de Agosto, Sopocachi",
    city: "La Paz",
    lat: -16.5110,
    lon: -68.1200,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Zona Sopocachi. Alta demanda por vehículos de alto cilindraje (Premium).",
  },

  {
    id: "genex-lpz-miraflores",
    name: "Genex – Miraflores",
    address: "Av. Saavedra, Miraflores",
    city: "La Paz",
    lat: -16.4980,
    lon: -68.1140,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Zona Miraflores, La Paz.",
  },

  {
    id: "genex-lpz-zona-sur",
    name: "Genex – Zona Sur (Calacoto)",
    address: "Av. Ballivián, Calacoto",
    city: "La Paz",
    lat: -16.5420,
    lon: -68.0720,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Zona Sur, La Paz. Alta demanda de Premium por el perfil socioeconómico de la zona.",
  },

  {
    id: "genex-lpz-obrajes",
    name: "Genex – Obrajes",
    address: "Av. Hernando Siles, Obrajes",
    city: "La Paz",
    lat: -16.5340,
    lon: -68.0870,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 21:00",
    notes: "Zona Obrajes. Estación de mediano tránsito.",
  },

  // ─── EL ALTO ───────────────────────────────────────────────────────

  {
    id: "genex-elalto-jpii",
    name: "Genex – El Alto (Av. Juan Pablo II)",
    address: "Av. Juan Pablo II, Ciudad Satélite",
    city: "El Alto",
    lat: -16.5050,
    lon: -68.1730,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil", "GLP Vehicular"],
    openHours: "05:00 – 23:00",
    notes: "Estación con GLP vehicular. El Alto es punto de paso entre La Paz y el altiplano.",
  },

  {
    id: "genex-elalto-villa-adela",
    name: "Genex – El Alto (Villa Adela)",
    address: "Calle 1, zona Villa Adela",
    city: "El Alto",
    lat: -16.5250,
    lon: -68.1680,
    fuels: ["Gasolina Especial", "Diesel Oil"],
    openHours: "05:30 – 21:00",
    notes: "Estación de menor tamaño. Solo Especial y Diesel. Alto tránsito de vehículos de carga.",
  },

  // ─── COCHABAMBA ────────────────────────────────────────────────────

  {
    id: "genex-cbba-blanco-galindo",
    name: "Genex – Blanco Galindo",
    address: "Av. Blanco Galindo Km 3",
    city: "Cochabamba",
    lat: -17.3872,
    lon: -66.1810,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:30 – 22:30",
    notes: "Corredor industrial. Alta demanda de Diesel por transporte pesado.",
  },

  {
    id: "genex-cbba-america",
    name: "Genex – Av. América",
    address: "Av. América, zona norte Cochabamba",
    city: "Cochabamba",
    lat: -17.3850,
    lon: -66.1570,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Zona norte. Estación de alto tránsito.",
  },

  {
    id: "genex-cbba-sacaba",
    name: "Genex – Sacaba",
    address: "Av. Villazón, Sacaba",
    city: "Cochabamba",
    lat: -17.3800,
    lon: -66.1200,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "05:00 – 22:00",
    notes: "Corredor este. Acceso a la ruta Cochabamba–Santa Cruz.",
  },

  {
    id: "genex-cbba-quillacollo",
    name: "Genex – Quillacollo",
    address: "Av. 16 de Julio, Quillacollo",
    city: "Cochabamba",
    lat: -17.3930,
    lon: -66.2830,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 21:00",
    notes: "Municipio de Quillacollo. Corredor oeste hacia Oruro.",
  },

  // ─── SUCRE ─────────────────────────────────────────────────────────

  {
    id: "genex-sucre-central",
    name: "Genex – Sucre Central",
    address: "Av. Ostria Gutiérrez, Sucre",
    city: "Sucre",
    lat: -19.0430,
    lon: -65.2591,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Principal estación Genex en la capital constitucional.",
  },

  {
    id: "genex-sucre-norte",
    name: "Genex – Sucre Norte",
    address: "Av. del Ejército, zona norte",
    city: "Sucre",
    lat: -19.0350,
    lon: -65.2550,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 21:00",
  },

  // ─── ORURO ─────────────────────────────────────────────────────────

  {
    id: "genex-oruro-pagador",
    name: "Genex – Oruro (Av. Pagador)",
    address: "Av. Pagador, Oruro",
    city: "Oruro",
    lat: -17.9682,
    lon: -67.1098,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Principal estación de Oruro. Punto de paso en la ruta La Paz–Potosí.",
  },

  {
    id: "genex-oruro-sud",
    name: "Genex – Oruro Sur",
    address: "Av. 6 de Octubre, Oruro",
    city: "Oruro",
    lat: -17.9780,
    lon: -67.1130,
    fuels: ["Gasolina Especial", "Diesel Oil"],
    openHours: "06:00 – 21:00",
    notes: "Solo Especial y Diesel. Alto tránsito minero y de carga.",
  },

  // ─── TARIJA ────────────────────────────────────────────────────────

  {
    id: "genex-tarija-central",
    name: "Genex – Tarija",
    address: "Av. Virginio Lema, Tarija",
    city: "Tarija",
    lat: -21.5355,
    lon: -64.7296,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Principal estación de Tarija. Punto clave para la ruta hacia Argentina.",
  },

  // ─── POTOSÍ ────────────────────────────────────────────────────────

  {
    id: "genex-potosi-central",
    name: "Genex – Potosí",
    address: "Av. Villazón, Potosí",
    city: "Potosí",
    lat: -19.5836,
    lon: -65.7531,
    fuels: ["Gasolina Especial", "Gasolina Premium", "Diesel Oil"],
    openHours: "06:00 – 22:00",
    notes: "Estación a 3967 msnm. Punto de paso ruta La Paz–Potosí–Sucre.",
  },
]

export const GENEX_CITIES = [...new Set(genexStationsStatic.map((s) => s.city))].sort()
