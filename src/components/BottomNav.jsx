import { NavLink } from "react-router-dom";
import { getText } from "../i18n";

const navItems = [
  { path: "/", icon: "🏠", key: "home" },
  { path: "/zikr", icon: "📿", key: "zikr" },
  { path: "/dua", icon: "🤲", key: "dua" },
  { path: "/learn", icon: "📖", key: "learn" },
  { path: "/prayer", icon: "🕌", key: "prayer" },
  { path: "/qibla", icon: "🧭", key: "qibla" },
];

export default function BottomNav({ lang }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-emerald-950/95 backdrop-blur-md border-t border-emerald-800/50 z-50">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map(({ path, icon, key }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-amber-400 scale-110"
                  : "text-emerald-400/60 hover:text-emerald-300"
              }`
            }
          >
            <span className="text-xl leading-none">{icon}</span>
            <span className="text-[10px] font-body font-medium">{getText(lang, key)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
