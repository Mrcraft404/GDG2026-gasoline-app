import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"

export type FuelPreference = "DIESEL" | "PREMIUM" | "ESPECIAL" | "GAS" | "ELECTRICO"

interface ConfigData {
  fuelPreference: FuelPreference
}

const DEFAULT_CONFIG: ConfigData = { fuelPreference: "ESPECIAL" }

interface ConfigCtxType {
  config: ConfigData
  setConfig: Dispatch<SetStateAction<ConfigData>>
}

const ConfigCtx = createContext<ConfigCtxType>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
})

export default function ConfigCtxProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfigData>(DEFAULT_CONFIG)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("config")
    if (stored) {
      try {
        setConfig(JSON.parse(stored))
      } catch {
        localStorage.removeItem("config")
      }
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (!initialized) return
    localStorage.setItem("config", JSON.stringify(config))
  }, [config, initialized])

  return <ConfigCtx.Provider value={{ config, setConfig }}>{children}</ConfigCtx.Provider>
}

export const useConfig = () => useContext(ConfigCtx)
