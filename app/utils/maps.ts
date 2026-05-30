import axios from "axios"

export async function getForawardEncodeingLocationIQ(stationName: string) {
  const apiURL = new URL("https://us1.locationiq.com/v1/search")

  if (!process.env.LOCATION_IQ_API_KEY) throw Error("LOCATION_IQ api key missing")

  apiURL.searchParams.append("key", process.env.LOCATION_IQ_API_KEY)
  apiURL.searchParams.append("format", "json")
  apiURL.searchParams.append("q", stationName)

  const stationCords = await axios({
    url: apiURL.href,
    method: "GET"
  })

  console.log(stationCords)
}