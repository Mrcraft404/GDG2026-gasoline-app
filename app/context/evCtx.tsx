import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react"

interface EvContextType {
  selectedEvId: string | null
  setSelectedEvId: Dispatch<SetStateAction<string | null>>
}

const EvCtx = createContext<EvContextType>({
  selectedEvId: null,
  setSelectedEvId: () => {},
})

export function EvCtxProvider({ children }: { children: React.ReactNode }) {
  const [selectedEvId, setSelectedEvId] = useState<string | null>(null)
  return (
    <EvCtx.Provider value={{ selectedEvId, setSelectedEvId }}>
      {children}
    </EvCtx.Provider>
  )
}

export const useEvData = () => useContext(EvCtx)
