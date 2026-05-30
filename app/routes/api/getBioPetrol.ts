import type { ActionFunctionArgs } from "react-router"
import { getBioPetrolData, type BioPetrolStation } from "~/utils/bioPetrol"

export async function action({ request }: ActionFunctionArgs) {
  try {
    const data = await request.json()
    const fuelPreference = data.fuelPreference
    const bioPetrolData = await getBioPetrolData(fuelPreference) as BioPetrolStation[]
    return bioPetrolData
  } catch (err) {
    console.error("[BioPetrol] Error al obtener datos:", (err as Error).message)
    return []
  }
}
