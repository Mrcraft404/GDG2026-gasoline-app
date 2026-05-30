import { Link, useLocation } from "react-router"
import { NAV_LINKS } from "./header/navbar"

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t">
      <ul className="flex items-stretch h-16">
        {NAV_LINKS.map(({ to, label, icon }) => {
          const isActive = location.pathname === to
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center justify-center h-full gap-0.5 transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-xl leading-none">{icon}</span>
                <span className="text-[10px] leading-tight">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
