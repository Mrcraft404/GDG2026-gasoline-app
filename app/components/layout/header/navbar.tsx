import { Link, useFetchers, useLocation } from "react-router"
import { useConfig } from "~/context/configCtx"
import Updater from "~/components/updater"

const FUEL_BADGE: Record<string, { label: string; color: string }> = {
  ESPECIAL: { label: "Especial", color: "bg-green-100 text-green-800" },
  PREMIUM: { label: "Premium", color: "bg-purple-100 text-purple-800" },
  DIESEL: { label: "Diesel", color: "bg-amber-100 text-amber-800" },
  ELECTRICO: { label: "⚡ EV", color: "bg-blue-100 text-blue-800" },
}

export const NAV_LINKS = [
  { to: "/",         label: "Mapa",     icon: "🗺️" },
  { to: "/biopetrol",label: "BioPetrol",icon: "🟢" },
  { to: "/genex",    label: "Genex",    icon: "🟠" },
  { to: "/electrico",label: "EV",       icon: "⚡" },
  { to: "/agencias", label: "Agencias", icon: "🚗" },
]

export default function NavBar() {
  const fetchers = useFetchers()
  const loading = fetchers.length > 0
  const { config } = useConfig()
  const badge = FUEL_BADGE[config.fuelPreference]
  const location = useLocation()

  return (
    <nav className="h-14 border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-4 gap-3">
        {/* Brand */}
        <Link to="/" className="font-bold text-base shrink-0">
          ⛽ Fuel Bolivia
        </Link>

        {/* Links — solo visibles en pantallas medianas+ */}
        <ul className="hidden md:flex items-center gap-1 text-sm flex-1 justify-center">
          {NAV_LINKS.map(({ to, label, icon }) => {
            const isActive = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-3 py-1.5 rounded-md transition-colors text-sm ${
                    isActive ? "bg-muted font-semibold" : "hover:bg-muted"
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right: badge + updater */}
        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.color}`}>
              {badge.label}
            </span>
          )}
          {loading && (
            <span className="text-xs text-muted-foreground animate-pulse hidden sm:inline">actualizando...</span>
          )}
          <Updater />
        </div>
      </div>
    </nav>
  )
}
