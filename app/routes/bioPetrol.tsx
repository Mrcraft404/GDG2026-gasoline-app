import { AdSlot } from "adkit-react"
import BioPetrolList from "~/components/bio-petrol/biopetrol-list"
import { useConfig, type FuelPreference } from "~/context/configCtx"

const FUEL_LABELS = {
  ESPECIAL: "Gasolina Especial",
  PREMIUM: "Gasolina Premium",
  DIESEL: "Diésel",
  ELECTRICO: "Eléctrico",
}

export default function BioPetrolPage() {
  const { config } = useConfig()
  return (
    <div className="container mx-auto py-4">
      <div className="mb-4 px-4">
        <h1 className="text-xl font-bold">🟢 BioPetrol</h1>
        <p className="text-sm text-muted-foreground">
          Mostrando: {FUEL_LABELS[config.fuelPreference]} · cambia el tipo en la página principal
        </p>
      </div>
      <AdSlot theme="light" slot="fuel-bol-banner" aspectRatio="banner" price={300} />
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BioPetrolList />
      </div>
    </div>
  )
}
