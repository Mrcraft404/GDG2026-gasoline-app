import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { BioPetrolStation } from "~/utils/bioPetrol"

interface ContextType {
  bioPetrolStationsData: BioPetrolStation[]
  setbioPetrolStationsData: Dispatch<SetStateAction<BioPetrolStation[]>>
}

const bioPetrolCtx = createContext<ContextType>({
  bioPetrolStationsData: [],
  setbioPetrolStationsData: () => {},
})

export function BioPetrolCtxProvider({ children }: { children: React.ReactNode }) {
  const [bioPetrolStationsData, setbioPetrolStationsData] = useState<BioPetrolStation[]>([])
  const [initialized, setInitialized] = useState(false)

  // Load from cache on mount (fix: was immediately clearing cache after loading)
  useEffect(() => {
    const stored = localStorage.getItem("bio-petrol")
    if (stored) {
      try {
        setbioPetrolStationsData(JSON.parse(stored))
      } catch {
        localStorage.removeItem("bio-petrol")
      }
    }
    setInitialized(true)
  }, [])

  // Save on change, but only after initial load to avoid overwriting cache with []
  useEffect(() => {
    if (!initialized) return
    localStorage.setItem("bio-petrol", JSON.stringify(bioPetrolStationsData))
  }, [bioPetrolStationsData, initialized])

  return (
    <bioPetrolCtx.Provider value={{ bioPetrolStationsData, setbioPetrolStationsData }}>
      {children}
    </bioPetrolCtx.Provider>
  )
}

export const useBioPetrolData = () => useContext(bioPetrolCtx)
