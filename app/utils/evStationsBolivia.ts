export type ConnectorStandard = "Type1" | "Type2" | "CHAdeMO" | "CCS" | "Schuko" | "GBT"
export type ChargingSpeed = "lento" | "normal" | "rapido" | "ultra_rapido"
export type StationStatus = "operacional" | "en_construccion" | "fuera_servicio" | "desconocido"

export interface EVConnector {
  standard: ConnectorStandard
  type: "AC" | "DC"
  powerKW: number
  quantity: number
  description: string
}

export interface EVStationBolivia {
  id: string
  name: string
  operator: string
  address: string
  city: string
  lat: number
  lon: number
  status: StationStatus
  connectors: EVConnector[]
  access: "publico" | "semi_publico" | "privado"
  cost: "gratis" | "pago" | "suscripcion"
  openHours?: string
  phone?: string
  notes?: string
}

// Descriptor legible para cada conector
export const CONNECTOR_LABELS: Record<ConnectorStandard, string> = {
  Type1:   "Tipo 1 (SAE J1772)",
  Type2:   "Tipo 2 (IEC 62196)",
  CHAdeMO: "CHAdeMO (DC rápido)",
  CCS:     "CCS Combo 2 (DC ultra)",
  Schuko:  "Schuko (enchufe EU)",
  GBT:     "GB/T (DC China)",
}

export const CONNECTOR_COLORS: Record<ConnectorStandard, string> = {
  Type1:   "bg-blue-100 text-blue-800 border-blue-200",
  Type2:   "bg-green-100 text-green-800 border-green-200",
  CHAdeMO: "bg-orange-100 text-orange-800 border-orange-200",
  CCS:     "bg-red-100 text-red-800 border-red-200",
  Schuko:  "bg-gray-100 text-gray-700 border-gray-200",
  GBT:     "bg-purple-100 text-purple-800 border-purple-200",
}

export function getChargingSpeed(powerKW: number): ChargingSpeed {
  if (powerKW <= 3.7) return "lento"
  if (powerKW <= 22) return "normal"
  if (powerKW <= 50) return "rapido"
  return "ultra_rapido"
}

export const SPEED_LABELS: Record<ChargingSpeed, { label: string; color: string }> = {
  lento:        { label: "Lento (hasta 3.7 kW)",   color: "text-gray-500"  },
  normal:       { label: "Normal (hasta 22 kW)",    color: "text-blue-600"  },
  rapido:       { label: "Rápido (hasta 50 kW)",    color: "text-orange-600"},
  ultra_rapido: { label: "Ultra-rápido (>50 kW)",   color: "text-red-600"   },
}

// ═══════════════════════════════════════════════════════════════════════
// BASE DE DATOS ESTÁTICA — Estaciones de carga EV en Bolivia
// ═══════════════════════════════════════════════════════════════════════
export const evStationsBolivia: EVStationBolivia[] = [

  // ─── SANTA CRUZ DE LA SIERRA ──────────────────────────────────────

  {
    id: "ep-e2v-cristo-redentor",
    name: "Electropoint E2V – Cristo Redentor",
    operator: "Electropoint E2V",
    address: "Av. Cristo Redentor esq. 2do anillo",
    city: "Santa Cruz",
    lat: -17.7847,
    lon: -63.1746,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Carga rápida AC – ideal para sedanes y SUV europeos/chinos" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "Carga rápida DC – compatible con Nissan Leaf, Mitsubishi PHEV" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Pago con tarjeta o app Electropoint. ~40 min al 80% con CHAdeMO.",
  },

  {
    id: "ep-e2v-banzer-norte",
    name: "Electropoint E2V – Av. Banzer Norte",
    operator: "Electropoint E2V",
    address: "Av. Banzer, 3er anillo externo",
    city: "Santa Cruz",
    lat: -17.7580,
    lon: -63.1990,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Carga estándar AC – 22 kW" },
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 2, description: "Carga normal AC – 11 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "4 puntos de carga simultáneos. Zona comercial con estacionamiento.",
  },

  {
    id: "ep-e2v-equipetrol",
    name: "Electropoint E2V – Equipetrol",
    operator: "Electropoint E2V",
    address: "Av. San Martín, zona Equipetrol",
    city: "Santa Cruz",
    lat: -17.7870,
    lon: -63.1710,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – carga ultra rápida DC (50 kW)" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "00:00 – 24:00",
    notes: "Zona Equipetrol. Acceso 24 horas. Pago con app.",
  },

  {
    id: "ep-e2v-urbo",
    name: "Electropoint E2V – Ciudad del Urbo",
    operator: "Electropoint E2V",
    address: "Ciudad del Urbo, calle principal",
    city: "Santa Cruz",
    lat: -17.7680,
    lon: -63.2250,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "semi_publico",
    cost: "pago",
    openHours: "07:00 – 21:00",
    notes: "Zona residencial Urbo. Solo residentes y visitantes del complejo.",
  },

  {
    id: "ypfb-ev-4anillo",
    name: "YPFB EV – Surtidor 4to anillo",
    operator: "YPFB (Yacimientos Petrolíferos Fiscales Bolivianos)",
    address: "Av. Cristóbal de Mendoza, 4to anillo",
    city: "Santa Cruz",
    lat: -17.7550,
    lon: -63.1770,
    status: "operacional",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50,  quantity: 1, description: "CCS Combo 2 – DC 50 kW (carga rápida en ~40 min)" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50,  quantity: 1, description: "CHAdeMO DC – 50 kW para Nissan Leaf y otros" },
      { standard: "Type2",   type: "AC", powerKW: 22,  quantity: 1, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Surtidor integrado junto a combustibles tradicionales. YPFB. Primer punto multiconector público de Bolivia.",
  },

  {
    id: "ventura-mall-sc",
    name: "Estación Carga – Ventura Mall",
    operator: "Ventura Mall / Electropoint",
    address: "Av. San Martín, 3er anillo, Ventura Mall",
    city: "Santa Cruz",
    lat: -17.7900,
    lon: -63.1700,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 4, description: "Tipo 2 AC – 11 kW · 4 puntos en estacionamiento cubierto" },
      { standard: "Schuko",  type: "AC", powerKW: 3.7, quantity: 2, description: "Schuko AC – 3.7 kW (carga doméstica lenta)" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "10:00 – 21:00",
    notes: "Carga gratuita para clientes del mall. Estacionamiento techado. 4 horas máximo.",
  },

  {
    id: "nissan-bolivia-sc",
    name: "Nissan Bolivia – Centro de Servicio",
    operator: "Nissan Bolivia",
    address: "Av. Alemana, 4to anillo",
    city: "Santa Cruz",
    lat: -17.7620,
    lon: -63.1880,
    status: "operacional",
    connectors: [
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 2, description: "CHAdeMO DC – 50 kW · exclusivo para vehículos Nissan Leaf y e-NV200" },
      { standard: "Type1",   type: "AC", powerKW: 6.6, quantity: 2, description: "SAE J1772 Tipo 1 – 6.6 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:00 – 17:00",
    notes: "Solo días hábiles. Preferencia clientes Nissan. Mejor opción para propietarios de Nissan Leaf.",
  },

  {
    id: "byd-bolivia-sc",
    name: "BYD Bolivia – Concesionario Santa Cruz",
    operator: "BYD Bolivia",
    address: "Av. Cristo Redentor, 3er anillo",
    city: "Santa Cruz",
    lat: -17.7700,
    lon: -63.1760,
    status: "operacional",
    connectors: [
      { standard: "GBT",     type: "DC", powerKW: 100, quantity: 1, description: "GB/T DC – 100 kW ultra rápido (solo vehículos BYD)" },
      { standard: "Type2",   type: "AC", powerKW: 22,  quantity: 2, description: "Tipo 2 AC – 22 kW · compatible con todos los EV europeos/chinos" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 18:00",
    notes: "Concesionario oficial BYD. Pruebas de manejo disponibles. El cargador DC es el más potente de Bolivia.",
  },

  {
    id: "municipio-sc-arenal",
    name: "Cargador Municipal – Parque El Arenal",
    operator: "Municipio de Santa Cruz de la Sierra",
    address: "Parque El Arenal, Santa Cruz centro",
    city: "Santa Cruz",
    lat: -17.7800,
    lon: -63.1820,
    status: "operacional",
    connectors: [
      { standard: "Schuko",  type: "AC", powerKW: 3.7, quantity: 2, description: "Schuko (enchufe estándar EU) – 3.7 kW" },
      { standard: "Type2",   type: "AC", powerKW: 7.4, quantity: 1, description: "Tipo 2 AC – 7.4 kW" },
    ],
    access: "publico",
    cost: "gratis",
    openHours: "06:00 – 22:00",
    notes: "Primer cargador público municipal de Santa Cruz. Sin garantía de disponibilidad.",
  },

  {
    id: "electric-point-plan3mil",
    name: "Electric Vehicle Charging – Plan 3000",
    operator: "Privado",
    address: "Plan 3 Mil, Urb. El Quior",
    city: "Santa Cruz",
    lat: -17.8200,
    lon: -63.1500,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "semi_publico",
    cost: "pago",
    openHours: "08:00 – 20:00",
    notes: "Zona Plan 3000. Contactar antes de visitar.",
  },

  // ─── LA PAZ ────────────────────────────────────────────────────────

  {
    id: "ep-e2v-la-paz-sopocachi",
    name: "Electropoint E2V – Sopocachi",
    operator: "Electropoint E2V",
    address: "Av. 6 de Agosto, Sopocachi",
    city: "La Paz",
    lat: -16.5110,
    lon: -68.1200,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO DC – 50 kW (compatible Nissan Leaf)" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Zona Sopocachi. Nota: la altitud de La Paz (3600m) reduce la autonomía de los EV un 10-15%.",
  },

  {
    id: "ypfb-ev-la-paz",
    name: "YPFB EV – Miraflores",
    operator: "YPFB",
    address: "Av. Saavedra, Miraflores",
    city: "La Paz",
    lat: -16.4980,
    lon: -68.1140,
    status: "operacional",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – DC 50 kW rápido" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO – DC 50 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Parte de la red nacional YPFB. Junto a surtidor de combustible tradicional.",
  },

  {
    id: "megacenter-la-paz",
    name: "Cargador – Megacenter La Paz",
    operator: "Megacenter / Privado",
    address: "Av. Ballivián, zona comercial",
    city: "La Paz",
    lat: -16.5050,
    lon: -68.1150,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 3, description: "Tipo 2 AC – 11 kW · estacionamiento subterráneo" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "10:00 – 21:00",
    notes: "Gratuito para clientes del centro comercial. Estacionamiento cubierto.",
  },

  {
    id: "hotel-casa-grande-lpz",
    name: "Hotel Casa Grande – Cargador",
    operator: "Hotel Casa Grande",
    address: "Av. Arce, esq. Aspiazu",
    city: "La Paz",
    lat: -16.5080,
    lon: -68.1180,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 7.4, quantity: 1, description: "Tipo 2 AC – 7.4 kW (carga overnight)" },
      { standard: "Schuko",  type: "AC", powerKW: 3.7, quantity: 1, description: "Schuko – 3.7 kW" },
    ],
    access: "privado",
    cost: "gratis",
    openHours: "00:00 – 24:00",
    notes: "Solo para huéspedes del hotel. Reservar con antelación.",
  },

  // ─── COCHABAMBA ────────────────────────────────────────────────────

  {
    id: "ep-e2v-cbba",
    name: "Electropoint E2V – Cochabamba Norte",
    operator: "Electropoint E2V",
    address: "Av. Oquendo, zona norte",
    city: "Cochabamba",
    lat: -17.3830,
    lon: -66.1590,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO DC – 50 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
  },

  {
    id: "ypfb-ev-cbba",
    name: "YPFB EV – Cochabamba",
    operator: "YPFB",
    address: "Av. Ayacucho, zona central",
    city: "Cochabamba",
    lat: -17.3900,
    lon: -66.1580,
    status: "operacional",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – DC 50 kW ultra rápido" },
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Dentro de estación de servicio YPFB.",
  },

  {
    id: "byd-cbba",
    name: "BYD Bolivia – Cochabamba",
    operator: "BYD Bolivia",
    address: "Blanco Galindo Km 3",
    city: "Cochabamba",
    lat: -17.3872,
    lon: -66.1810,
    status: "operacional",
    connectors: [
      { standard: "GBT",     type: "DC", powerKW: 100, quantity: 1, description: "GB/T DC – 100 kW (solo BYD e-plataforma 3.0)" },
      { standard: "Type2",   type: "AC", powerKW: 22,  quantity: 1, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 18:00",
    notes: "Concesionario BYD. El cargador GB/T de 100 kW es compatible con BYD Tang, Han, Atto 3.",
  },

  {
    id: "cbba-mall-shopping",
    name: "Cargador – Cochabamba Mall",
    operator: "Cochabamba Mall",
    address: "Blanco Galindo Km 5",
    city: "Cochabamba",
    lat: -17.3860,
    lon: -66.1900,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 2, description: "Tipo 2 AC – 11 kW · estacionamiento exterior" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "10:00 – 21:00",
    notes: "Gratuito para clientes. 3 horas máximo de carga.",
  },

  // ─── ORURO ─────────────────────────────────────────────────────────

  {
    id: "ypfb-ev-oruro",
    name: "YPFB EV – Oruro",
    operator: "YPFB",
    address: "Av. 6 de Agosto, Oruro",
    city: "Oruro",
    lat: -17.9641,
    lon: -67.1138,
    status: "en_construccion",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – DC 50 kW (próximamente)" },
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW (próximamente)" },
    ],
    access: "publico",
    cost: "pago",
    notes: "En construcción. Parte del corredor YPFB La Paz → Oruro → Potosí.",
  },

  // ─── EL ALTO ───────────────────────────────────────────────────────

  {
    id: "ep-e2v-el-alto",
    name: "Electropoint E2V – El Alto",
    operator: "Electropoint E2V",
    address: "Av. Juan Pablo II, Ciudad Satélite",
    city: "El Alto",
    lat: -16.5050,
    lon: -68.1730,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO DC – 50 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "El Alto, 4060 msnm. La altitud extrema puede reducir autonomía del EV un 15-20%. Vigilar temperatura de la batería.",
  },

  {
    id: "ypfb-ev-el-alto",
    name: "YPFB EV – El Alto Norte",
    operator: "YPFB",
    address: "Av. 6 de Marzo, zona Villa Adela",
    city: "El Alto",
    lat: -16.5190,
    lon: -68.1660,
    status: "en_construccion",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – DC 50 kW (próximamente)" },
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW (próximamente)" },
    ],
    access: "publico",
    cost: "pago",
    notes: "En construcción. Parte de la expansión YPFB hacia El Alto.",
  },

  // ─── SUCRE ─────────────────────────────────────────────────────────

  {
    id: "ep-e2v-sucre",
    name: "Electropoint E2V – Sucre",
    operator: "Electropoint E2V",
    address: "Av. Ostria Gutiérrez, zona universitaria",
    city: "Sucre",
    lat: -19.0430,
    lon: -65.2591,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO DC – 50 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Primera estación de carga pública en Sucre. Sucre a 2790 msnm.",
  },

  {
    id: "byd-sucre",
    name: "BYD Bolivia – Sucre",
    operator: "BYD Bolivia",
    address: "Av. Hernando Siles, zona comercial",
    city: "Sucre",
    lat: -19.0480,
    lon: -65.2620,
    status: "operacional",
    connectors: [
      { standard: "GBT",     type: "DC", powerKW: 60,  quantity: 1, description: "GB/T DC – 60 kW (vehículos BYD)" },
      { standard: "Type2",   type: "AC", powerKW: 11,  quantity: 2, description: "Tipo 2 AC – 11 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 18:00",
    notes: "Concesionario BYD en Sucre. Carga gratuita para clientes y propietarios de vehículos BYD.",
  },

  {
    id: "ypfb-ev-sucre",
    name: "YPFB EV – Sucre",
    operator: "YPFB",
    address: "Av. Brasil, zona noroeste",
    city: "Sucre",
    lat: -19.0390,
    lon: -65.2700,
    status: "en_construccion",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – DC 50 kW (próximamente)" },
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW (próximamente)" },
    ],
    access: "publico",
    cost: "pago",
    notes: "En construcción. Corredor YPFB hacia el sur del país.",
  },

  // ─── TARIJA ────────────────────────────────────────────────────────

  {
    id: "ep-e2v-tarija",
    name: "Electropoint E2V – Tarija",
    operator: "Electropoint E2V",
    address: "Av. Víctor Paz Estenssoro, zona central",
    city: "Tarija",
    lat: -21.5355,
    lon: -64.7296,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "07:00 – 21:00",
    notes: "Primera estación de carga en Tarija. Ciudad con gran crecimiento de vehículos eléctricos importados desde Argentina.",
  },

  {
    id: "byd-tarija",
    name: "BYD Bolivia – Tarija",
    operator: "BYD Bolivia",
    address: "Av. Virginio Lema, zona sur",
    city: "Tarija",
    lat: -21.5420,
    lon: -64.7330,
    status: "operacional",
    connectors: [
      { standard: "GBT",     type: "DC", powerKW: 60, quantity: 1, description: "GB/T DC – 60 kW (solo BYD)" },
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 2, description: "Tipo 2 AC – 11 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 18:00",
    notes: "Concesionario BYD Tarija. Importante para vehículos que ingresan desde Argentina vía La Quiaca.",
  },

  {
    id: "ypfb-ev-tarija",
    name: "YPFB EV – Tarija",
    operator: "YPFB",
    address: "Av. Las Américas, Tarija",
    city: "Tarija",
    lat: -21.5280,
    lon: -64.7250,
    status: "en_construccion",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – 50 kW DC" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO – 50 kW DC" },
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    notes: "En construcción. Tarija es punto estratégico para la ruta Bolivia-Argentina.",
  },

  // ─── POTOSÍ ────────────────────────────────────────────────────────

  {
    id: "ypfb-ev-potosi",
    name: "YPFB EV – Potosí",
    operator: "YPFB",
    address: "Av. Villazón, Potosí",
    city: "Potosí",
    lat: -19.5836,
    lon: -65.7531,
    status: "en_construccion",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – 50 kW DC" },
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    notes: "En construcción. Potosí a 3967 msnm — la mayor altitud de Bolivia. El rendimiento del EV se reduce considerablemente.",
  },

  {
    id: "ep-e2v-potosi",
    name: "Electropoint E2V – Potosí",
    operator: "Electropoint E2V",
    address: "Av. Oruro, zona central",
    city: "Potosí",
    lat: -19.5800,
    lon: -65.7510,
    status: "desconocido",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 2, description: "Tipo 2 AC – 11 kW (lento a gran altitud)" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "07:00 – 19:00",
    notes: "Estado sin confirmar. Contactar antes de visitar. A 3967 msnm la carga AC es más eficiente que DC en estas condiciones.",
  },

  // ─── BENI / TRINIDAD ───────────────────────────────────────────────

  {
    id: "ep-e2v-trinidad",
    name: "Electropoint E2V – Trinidad",
    operator: "Electropoint E2V",
    address: "Av. 6 de Agosto, Trinidad",
    city: "Trinidad",
    lat: -14.8292,
    lon: -64.9017,
    status: "desconocido",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 1, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "07:00 – 20:00",
    notes: "Estado pendiente de confirmación. Trinidad tiene clima tropical — mejor rendimiento del EV que en altura.",
  },

  // ─── SANTA CRUZ (más estaciones) ──────────────────────────────────

  {
    id: "ep-e2v-sc-warnes",
    name: "Electropoint E2V – Doble Vía Warnes",
    operator: "Electropoint E2V",
    address: "Doble Vía a Warnes Km 5",
    city: "Santa Cruz",
    lat: -17.7200,
    lon: -63.2050,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CCS",     type: "DC", powerKW: 50, quantity: 1, description: "CCS Combo 2 – DC 50 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Corredor norte. Ideal para EV en tránsito hacia Warnes y Montero.",
  },

  {
    id: "ep-e2v-sc-la-guardia",
    name: "Electropoint E2V – Doble Vía La Guardia",
    operator: "Electropoint E2V",
    address: "Doble Vía a La Guardia Km 6",
    city: "Santa Cruz",
    lat: -17.8350,
    lon: -63.1590,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
      { standard: "CHAdeMO", type: "DC", powerKW: 50, quantity: 1, description: "CHAdeMO DC – 50 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Corredor sur. Punto de carga para la ruta hacia Camiri.",
  },

  {
    id: "hyundai-sc-ev",
    name: "Hyundai Bolivia – EV Center Santa Cruz",
    operator: "Hyundai Bolivia",
    address: "Av. Cristo Redentor, 2do anillo",
    city: "Santa Cruz",
    lat: -17.7800,
    lon: -63.1710,
    status: "operacional",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 100, quantity: 1, description: "CCS Combo 2 – 100 kW DC ultra rápido (IONIQ 5, IONIQ 6, Kona EV)" },
      { standard: "Type2",   type: "AC", powerKW: 11,  quantity: 2, description: "Tipo 2 AC – 11 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 17:30",
    notes: "Concesionario Hyundai. Solo días hábiles. El CCS 100 kW es compatible con Hyundai IONIQ 5, IONIQ 6, Kona EV. Carga del 10% al 80% en ~18 min.",
  },

  {
    id: "shopping-las-brisas-sc",
    name: "Cargador – Shopping Las Brisas",
    operator: "Shopping Las Brisas / Privado",
    address: "Av. Beni, 2do anillo, Las Brisas",
    city: "Santa Cruz",
    lat: -17.7820,
    lon: -63.1780,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 11, quantity: 3, description: "Tipo 2 AC – 11 kW · estacionamiento del mall" },
      { standard: "Schuko",  type: "AC", powerKW: 3.7, quantity: 2, description: "Schuko – 3.7 kW (carga lenta)" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "10:00 – 21:00",
    notes: "Gratuito para clientes del shopping. Sin garantía de disponibilidad.",
  },

  {
    id: "toyota-sc-ev",
    name: "TOYOSA – Servicio EV Santa Cruz",
    operator: "TOYOSA S.A.",
    address: "Av. Cristóbal de Mendoza, 4to anillo",
    city: "Santa Cruz",
    lat: -17.7550,
    lon: -63.1770,
    status: "operacional",
    connectors: [
      { standard: "Type1",   type: "AC", powerKW: 6.6, quantity: 2, description: "SAE J1772 Tipo 1 – 6.6 kW (Toyota Prius PHEV, RAV4 Prime)" },
      { standard: "Type2",   type: "AC", powerKW: 7.4, quantity: 1, description: "Tipo 2 AC – 7.4 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:00 – 17:00",
    notes: "Solo para vehículos Toyota híbridos enchufables y EV. Días hábiles. Compatible con Prius PHEV, RAV4 Prime, bZ4X.",
  },

  // ─── LA PAZ (más estaciones) ───────────────────────────────────────

  {
    id: "byd-la-paz",
    name: "BYD Bolivia – La Paz",
    operator: "BYD Bolivia",
    address: "Av. Arce, zona Sopocachi",
    city: "La Paz",
    lat: -16.5095,
    lon: -68.1190,
    status: "operacional",
    connectors: [
      { standard: "GBT",     type: "DC", powerKW: 100, quantity: 1, description: "GB/T DC – 100 kW (solo plataforma BYD e3.0)" },
      { standard: "Type2",   type: "AC", powerKW: 22,  quantity: 2, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 18:00",
    notes: "Concesionario BYD en La Paz. A 3600 msnm la batería GB/T entrega ~85 kW efectivos.",
  },

  {
    id: "hyundai-lpz-ev",
    name: "Hyundai Bolivia – EV Center La Paz",
    operator: "Hyundai Bolivia",
    address: "Av. Ballivián, Zona Sur",
    city: "La Paz",
    lat: -16.5420,
    lon: -68.0720,
    status: "operacional",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 100, quantity: 1, description: "CCS Combo 2 – 100 kW DC (IONIQ 5, IONIQ 6)" },
      { standard: "Type2",   type: "AC", powerKW: 11,  quantity: 2, description: "Tipo 2 AC – 11 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "09:00 – 18:00",
    notes: "Zona Sur, La Paz. Solo días hábiles. Nota: la altitud de 3600 m reduce la potencia pico del cargador DC.",
  },

  {
    id: "teleférico-lpz",
    name: "Cargador Estación Teleférico – Villa Fátima",
    operator: "Mi Teleférico / Municipio",
    address: "Estación Villa Fátima, Mi Teleférico",
    city: "La Paz",
    lat: -16.4910,
    lon: -68.1090,
    status: "desconocido",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 7.4, quantity: 2, description: "Tipo 2 AC – 7.4 kW (piloto municipal)" },
    ],
    access: "publico",
    cost: "gratis",
    openHours: "06:00 – 22:00",
    notes: "Piloto municipal de carga pública en estación del teleférico. Estado pendiente de verificación.",
  },

  // ─── COCHABAMBA (más estaciones) ──────────────────────────────────

  {
    id: "hyundai-cbba-ev",
    name: "Hyundai Bolivia – EV Center Cochabamba",
    operator: "Hyundai Bolivia",
    address: "Av. Oquendo, zona norte",
    city: "Cochabamba",
    lat: -17.3840,
    lon: -66.1600,
    status: "operacional",
    connectors: [
      { standard: "CCS",     type: "DC", powerKW: 100, quantity: 1, description: "CCS Combo 2 – 100 kW DC (IONIQ 5, IONIQ 6, Kona EV)" },
      { standard: "Type2",   type: "AC", powerKW: 11,  quantity: 2, description: "Tipo 2 AC – 11 kW" },
    ],
    access: "semi_publico",
    cost: "gratis",
    openHours: "08:30 – 17:30",
    notes: "Concesionario Hyundai Cochabamba. Solo días hábiles.",
  },

  {
    id: "cbba-sacaba-ev",
    name: "Electropoint E2V – Sacaba",
    operator: "Electropoint E2V",
    address: "Av. Blanco Galindo Km 9, Sacaba",
    city: "Cochabamba",
    lat: -17.3800,
    lon: -66.1200,
    status: "operacional",
    connectors: [
      { standard: "Type2",   type: "AC", powerKW: 22, quantity: 2, description: "Tipo 2 AC – 22 kW" },
    ],
    access: "publico",
    cost: "pago",
    openHours: "06:00 – 22:00",
    notes: "Zona de Sacaba, corredor este hacia Santa Cruz.",
  },
]
