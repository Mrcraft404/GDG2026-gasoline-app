import { getEVChargingStations } from "~/utils/evCharging"

export async function action() {
  const stations = await getEVChargingStations()
  return stations
}
