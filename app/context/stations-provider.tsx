import type React from "react"
import { BioPetrolCtxProvider } from "./biopetrolCtx"
import { GenexCtxProvider } from "./genexCtx"
import { EvCtxProvider } from "./evCtx"
import { LocationProvider } from "./locationCtx"

export default function StationsProvider({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <BioPetrolCtxProvider>
        <GenexCtxProvider>
          <EvCtxProvider>
            {children}
          </EvCtxProvider>
        </GenexCtxProvider>
      </BioPetrolCtxProvider>
    </LocationProvider>
  )
}
