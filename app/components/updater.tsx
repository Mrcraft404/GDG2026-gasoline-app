import { useEffect, useRef } from "react"
import { useFetcher, useFetchers } from "react-router"
import { useBioPetrolData } from "~/context/biopetrolCtx"
import { useConfig } from "~/context/configCtx"
import { useGenexData } from "~/context/genexCtx"
import { Button } from "./ui/button"

const REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutos

export default function Updater() {
  const genexCtx = useGenexData()
  const bioPetrolCtx = useBioPetrolData()
  const { config } = useConfig()
  const configRef = useRef(config)
  configRef.current = config

  const loading = useFetchers().length > 0
  const genexFetcher = useFetcher()
  const bioPetrolFetcher = useFetcher()

  const reload = () => {
    const currentConfig = configRef.current
    genexFetcher.submit({}, { method: "POST", action: "/api/genex" })
    if (currentConfig.fuelPreference !== "ELECTRICO" && currentConfig.fuelPreference !== "GAS") {
      bioPetrolFetcher.submit(
        { fuelPreference: currentConfig.fuelPreference },
        { method: "POST", action: "/api/biopetrol", encType: "application/json" }
      )
    }
  }

  // Carga inicial al montar
  useEffect(() => {
    reload()
    const interval = setInterval(reload, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Actualizar contextos cuando llegan datos
  useEffect(() => {
    if (genexFetcher.data) genexCtx.setGenexStationsData(genexFetcher.data)
  }, [genexFetcher.data])

  useEffect(() => {
    if (bioPetrolFetcher.data) bioPetrolCtx.setbioPetrolStationsData(bioPetrolFetcher.data)
  }, [bioPetrolFetcher.data])

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={loading}
      onClick={reload}
      className="text-xs"
    >
      {loading ? (
        <>
          <span className="animate-spin mr-1.5 h-3 w-3 border border-current border-t-transparent rounded-full inline-block" />
          Actualizando...
        </>
      ) : (
        "↺ Actualizar"
      )}
    </Button>
  )
}
