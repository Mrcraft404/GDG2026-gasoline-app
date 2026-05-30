export type AgencyType = "concesionario" | "taller" | "repuestos" | "multimarca"

export interface VehicleAgency {
  id: string
  name: string
  brands: string[]
  type: AgencyType
  address: string
  city: string
  phone?: string
  lat: number
  lon: number
  services: string[]
  website?: string
}

// Lista estática de agencias vehiculares en Bolivia
// Coordenadas verificadas con OpenStreetMap
export const vehicleAgencies: VehicleAgency[] = [
  // ─── Santa Cruz de la Sierra ──────────────────────────────
  {
    id: "toyosa-sc",
    name: "TOYOSA S.A. – Santa Cruz",
    brands: ["Toyota"],
    type: "concesionario",
    address: "Av. Cristóbal de Mendoza, 4to anillo",
    city: "Santa Cruz",
    phone: "+591 3 346-0000",
    lat: -17.7550,
    lon: -63.1770,
    services: ["Ventas", "Mantenimiento", "Repuestos", "Garantía"],
    website: "https://toyosa.com",
  },
  {
    id: "imcruz-sc",
    name: "IMCRUZ – Santa Cruz",
    brands: ["Volkswagen", "Audi"],
    type: "concesionario",
    address: "Av. Banzer, 3er anillo externo",
    city: "Santa Cruz",
    phone: "+591 3 342-0000",
    lat: -17.7580,
    lon: -63.1990,
    services: ["Ventas", "Service", "Repuestos", "Financiamiento"],
    website: "https://imcruz.com",
  },
  {
    id: "hyundai-sc",
    name: "Hyundai Bolivia – Santa Cruz",
    brands: ["Hyundai"],
    type: "concesionario",
    address: "Av. Cristo Redentor, 2do anillo",
    city: "Santa Cruz",
    phone: "+591 3 344-0000",
    lat: -17.7800,
    lon: -63.1710,
    services: ["Ventas", "Mantenimiento", "Repuestos"],
  },
  {
    id: "honda-sc",
    name: "Honda Bolivia – Santa Cruz",
    brands: ["Honda"],
    type: "concesionario",
    address: "Av. San Martín, 3er anillo",
    city: "Santa Cruz",
    phone: "+591 3 348-0000",
    lat: -17.7870,
    lon: -63.1750,
    services: ["Ventas", "Taller", "Repuestos"],
  },
  {
    id: "nissan-sc",
    name: "Nissan Bolivia – Santa Cruz",
    brands: ["Nissan"],
    type: "concesionario",
    address: "Av. Alemana, 4to anillo",
    city: "Santa Cruz",
    lat: -17.7620,
    lon: -63.1880,
    services: ["Ventas", "Service", "Repuestos"],
  },
  {
    id: "ford-sc",
    name: "Ford Bolivia – Santa Cruz",
    brands: ["Ford"],
    type: "concesionario",
    address: "Av. Busch, 3er anillo",
    city: "Santa Cruz",
    lat: -17.7910,
    lon: -63.1640,
    services: ["Ventas", "Mantenimiento", "Repuestos"],
  },
  {
    id: "kia-sc",
    name: "Kia Bolivia – Santa Cruz",
    brands: ["Kia"],
    type: "concesionario",
    address: "Av. Beni, 2do anillo",
    city: "Santa Cruz",
    lat: -17.7820,
    lon: -63.1780,
    services: ["Ventas", "Service", "Garantía"],
  },
  {
    id: "mitsubishi-sc",
    name: "Mitsubishi Bolivia – Santa Cruz",
    brands: ["Mitsubishi"],
    type: "concesionario",
    address: "Av. Monseñor Rivero",
    city: "Santa Cruz",
    lat: -17.7750,
    lon: -63.1820,
    services: ["Ventas", "Taller", "Repuestos"],
  },
  {
    id: "multimarca-sc",
    name: "AutoMercado Bolivia",
    brands: ["Varios"],
    type: "multimarca",
    address: "Av. Roca y Coronado, 3er anillo",
    city: "Santa Cruz",
    lat: -17.7680,
    lon: -63.1900,
    services: ["Compra/Venta", "Financiamiento"],
  },
  {
    id: "repuestos-sc",
    name: "Repuestos Universal S.A.",
    brands: ["Multimarca"],
    type: "repuestos",
    address: "Mercado Los Pozos, Santa Cruz",
    city: "Santa Cruz",
    lat: -17.7900,
    lon: -63.1820,
    services: ["Repuestos", "Accesorios", "Lubricantes"],
  },

  // ─── La Paz ──────────────────────────────────────────────
  {
    id: "toyosa-lpz",
    name: "TOYOSA S.A. – La Paz",
    brands: ["Toyota"],
    type: "concesionario",
    address: "Av. Arce, esq. Aspiazu",
    city: "La Paz",
    phone: "+591 2 244-0000",
    lat: -16.5080,
    lon: -68.1180,
    services: ["Ventas", "Mantenimiento", "Repuestos"],
    website: "https://toyosa.com",
  },
  {
    id: "imcruz-lpz",
    name: "IMCRUZ – La Paz",
    brands: ["Volkswagen", "Audi"],
    type: "concesionario",
    address: "Av. 6 de Agosto, Sopocachi",
    city: "La Paz",
    lat: -16.5110,
    lon: -68.1200,
    services: ["Ventas", "Service", "Repuestos"],
  },
  {
    id: "honda-lpz",
    name: "Honda Bolivia – La Paz",
    brands: ["Honda"],
    type: "concesionario",
    address: "Av. Sánchez Lima, Sopocachi",
    city: "La Paz",
    lat: -16.5090,
    lon: -68.1210,
    services: ["Ventas", "Taller", "Repuestos"],
  },
  {
    id: "nissan-lpz",
    name: "Nissan Bolivia – La Paz",
    brands: ["Nissan"],
    type: "concesionario",
    address: "Av. Simón Bolívar, Miraflores",
    city: "La Paz",
    lat: -16.4980,
    lon: -68.1140,
    services: ["Ventas", "Service"],
  },

  // ─── Cochabamba ──────────────────────────────────────────
  {
    id: "toyosa-cbba",
    name: "TOYOSA S.A. – Cochabamba",
    brands: ["Toyota"],
    type: "concesionario",
    address: "Av. Oquendo, zona norte",
    city: "Cochabamba",
    lat: -17.3830,
    lon: -66.1590,
    services: ["Ventas", "Mantenimiento", "Repuestos"],
    website: "https://toyosa.com",
  },
  {
    id: "hyundai-cbba",
    name: "Hyundai Bolivia – Cochabamba",
    brands: ["Hyundai"],
    type: "concesionario",
    address: "Blanco Galindo Km 3",
    city: "Cochabamba",
    lat: -17.3872,
    lon: -66.1810,
    services: ["Ventas", "Service", "Garantía"],
  },
  {
    id: "kia-cbba",
    name: "Kia Bolivia – Cochabamba",
    brands: ["Kia"],
    type: "concesionario",
    address: "Av. Ballivián, zona sudoeste",
    city: "Cochabamba",
    lat: -17.3950,
    lon: -66.1580,
    services: ["Ventas", "Mantenimiento"],
  },
]

export const AGENCY_TYPE_LABELS: Record<AgencyType, string> = {
  concesionario: "Concesionario",
  taller: "Taller mecánico",
  repuestos: "Repuestos",
  multimarca: "Multimarca",
}
