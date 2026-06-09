import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Megaphone,
  CalendarCheck,
  FileText,
  Calendar,
  Info,
  Settings,
  Copyright,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const topNav = [
  { to: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { to: "/notices", icon: Megaphone, label: "Notices" },
  { to: "/events", icon: CalendarCheck, label: "Events" },
  { to: "/assignments", icon: FileText, label: "Assignments" },
  { to: "/schedule", icon: Calendar, label: "Schedule" },
];

const bottomNav = [
  { to: "/profile", icon: Info, label: "Info" },
  { to: "/profile", icon: Settings, label: "Settings" },
];

function NavIcon({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={label}
      className={({ isActive }) =>
        `flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
          isActive
            ? "bg-white/20 text-white"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-[72px] flex-col items-center bg-campus-primary py-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-2">
          {topNav.map((item) => (
            <NavIcon key={item.to + item.label} {...item} onClick={onClose} />
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-2">
          {bottomNav.map((item) => (
            <NavIcon key={item.label} {...item} onClick={onClose} />
          ))}
          <NavLink
            to="/profile"
            onClick={onClose}
            title="Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 text-xs font-bold text-white"
          >
            {initials}
          </NavLink>
          <div
            className="flex h-9 w-9 items-center justify-center text-white/50"
            title="Copyright"
          >
            <Copyright className="h-4 w-4" />
          </div>
        </div>
      </aside>
    </>
  );
}
