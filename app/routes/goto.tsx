import type { LoaderFunctionArgs } from "react-router";
import { getForawardEncodeingLocationIQ } from "~/utils/maps";

export async function loader({ params }: LoaderFunctionArgs) {
  // const goto = params.stationName as String

  // getForawardEncodeingLocationIQ("Biopetrol Montecristo  Vírgen de Cotoca")
}

export default function GoTo() {
  return (
      <h1>Go to wtf?</h1>
  ) 
}