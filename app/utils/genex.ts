import * as cheerio from "cheerio"
import fuelURLs from "./fuel-urls.json"
import { fetchWithRetry } from "./fetchWithRetry"

export interface GenexStation {
  name: string
  address: string
  lastUpdated: string
  products: {
    name: string
    volume: string      // litros disponibles o "AGOTADO"
    capacity: string    // nro de autos
    waitTime: string    // tiempo de espera
    available: boolean
  }[]
  lat?: number
  lon?: number
}

function parseFuelStations(html: string): GenexStation[] {
  const $ = cheerio.load(html)
  const stations: GenexStation[] = []

  $("tr[data-wcpt-product-id]").each((_i, row) => {
    const $row = $(row)
    const station: GenexStation = {
      name: $row.find(".station_name").first().text().trim(),
      address: $row.find(".station_address").first().text().trim(),
      lastUpdated: $row.find(".station_updated").first().text().trim(),
      products: [],
    }

    $row.find(".product_wrapper").each((_j, productEl) => {
      const $p = $(productEl)
      const volume = $p.find(".product_volume").first().text().trim()
      station.products.push({
        name: $p.find(".product_name").first().text().trim(),
        volume,
        capacity: $p.find(".product_capacity").first().text().trim(),
        waitTime: $p.find(".product_avg_time").first().text().trim(),
        available: !volume.toUpperCase().includes("AGOTADO") && volume !== "",
      })
    })

    if (station.name) stations.push(station)
  })

  return stations
}

export async function getGenexData(): Promise<GenexStation[]> {
  const response = await fetchWithRetry(fuelURLs.genex, {
    headers: { Referer: "https://genex.com.bo/" },
  })
  const stations = parseFuelStations(response.data)
  console.log(`[Genex] ${stations.length} estaciones obtenidas`)
  return stations
}
