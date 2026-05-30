import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { GenexStation } from "~/utils/genex"

interface ContextType {
  genexStationsData: GenexStation[]
  setGenexStationsData: Dispatch<SetStateAction<GenexStation[]>>
}

const genexCtx = createContext<ContextType>({
  genexStationsData: [],
  setGenexStationsData: () => {},
})

export function GenexCtxProvider({ children }: { children: React.ReactNode }) {
  const [genexStationsData, setGenexStationsData] = useState<GenexStation[]>([])
  const [initialized, setInitialized] = useState(false)

  // Load from cache on mount (fix: was immediately clearing cache after loading)
  useEffect(() => {
    const stored = localStorage.getItem("genex")
    if (stored) {
      try {
        setGenexStationsData(JSON.parse(stored))
      } catch {
        localStorage.removeItem("genex")
      }
    }
    setInitialized(true)
  }, [])

  // Save on change, but only after initial load to avoid overwriting cache with []
  useEffect(() => {
    if (!initialized) return
    localStorage.setItem("genex", JSON.stringify(genexStationsData))
  }, [genexStationsData, initialized])

  return (
    <genexCtx.Provider value={{ genexStationsData, setGenexStationsData }}>
      {children}
    </genexCtx.Provider>
  )
}

export const useGenexData = () => useContext(genexCtx)
