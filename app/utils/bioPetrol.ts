import { load } from "cheerio"
import fuelURLs from "./fuel-urls.json"
import { fetchWithRetry } from "./fetchWithRetry"

export type FuelType = "DIESEL" | "PREMIUM" | "ESPECIAL"

export interface BioPetrolStation {
  name: string
  fuelVol: string
  cars: string
  aproxWaitTime: string
  address: string
  lat?: number
  lon?: number
}

const fuelTypeIdMap: Record<FuelType, string> = {
  DIESEL: fuelURLs["bio-petrol"].diesel,
  ESPECIAL: fuelURLs["bio-petrol"].especial,
  PREMIUM: fuelURLs["bio-petrol"].premium,
}

export async function getBioPetrolData(fuelType: FuelType): Promise<BioPetrolStation[]> {
  const baseUrl = fuelURLs["bio-petrol"].url
  if (!baseUrl) throw new Error("URL de BioPetrol no configurada")

  const fuelTypeId = fuelTypeIdMap[fuelType]
  if (!fuelTypeId) throw new Error(`Tipo de combustible inválido: ${fuelType}`)

  const page = await fetchWithRetry(baseUrl + fuelTypeId)
  if (!page.data) throw new Error("Sin respuesta de BioPetrol")

  const $ = load(page.data)
  const stations: BioPetrolStation[] = []

  $(".btn-bio-app").each((_i, element) => {
    const el = $(element)
    const name = el.find(".font-18.font-weight-bold").text().trim()
    if (!name) return
    stations.push({
      name,
      fuelVol: el.find(".fa-hand-holding-water").parent().next().text().trim(),
      cars: el.find(".fa-car-side").parent().next().text().trim(),
      aproxWaitTime: el.find(".fa-stopwatch").parent().next().text().trim(),
      address: el.find(".alert-secondary .px-1").text().trim(),
    })
  })

  console.log(`[BioPetrol] ${stations.length} estaciones (${fuelType})`)
  return stations
}
