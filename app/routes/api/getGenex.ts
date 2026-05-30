import { getGenexData, type GenexStation } from "~/utils/genex"

export async function action() {
  try {
    const data = await getGenexData() as GenexStation[]
    return data
  } catch (err) {
    console.error("[Genex] Error al obtener datos:", (err as Error).message)
    return []
  }
}
