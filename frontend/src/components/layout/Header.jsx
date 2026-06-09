import { Menu, Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import UniversityLogo from "../ui/UniversityLogo";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200/80 bg-[#f5f5fa] px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-campus-primary hover:bg-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <UniversityLogo className="h-10 w-10 sm:h-11 sm:w-11" />
        <p className="hidden text-sm font-semibold leading-tight text-gray-900 sm:block md:text-base">
          Bangladesh Army University of
          <br className="hidden md:block" />
          <span className="md:ml-0"> Science and Technology</span>
        </p>
        <p className="text-lg font-bold text-gray-900 sm:hidden">BAUST</p>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-campus-primary text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-campus-primary ring-2 ring-[#f5f5fa]">
            2
          </span>
        </button>

        <div className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-sm sm:px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-campus-primary text-xs font-bold text-white">
            {initials}
          </div>
          <span className="hidden text-sm font-semibold text-campus-primary sm:inline">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}
