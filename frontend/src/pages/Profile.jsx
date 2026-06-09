import { Mail, BookOpen, Hash, Building2 } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-campus-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
      <PageHeader title="Profile" />

      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-campus-primary text-2xl font-bold text-white">
          {initials}
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">{user?.name}</h2>
        <p className="mt-1 text-campus-primary">{user?.department}</p>
        <span className="mt-3 inline-block rounded-full bg-purple-50 px-4 py-1 text-sm font-medium text-campus-primary capitalize">
          {user?.role}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow icon={Hash} label="Student ID" value={user?.studentId} />
        <InfoRow icon={BookOpen} label="Semester" value={user?.semester} />
        <InfoRow icon={Building2} label="Department" value={user?.departmentShort} />
        <InfoRow icon={Mail} label="Email" value={user?.email} />
      </div>

      <button
        onClick={handleLogout}
        className="w-full rounded-xl bg-campus-primary py-3 text-sm font-semibold text-white transition hover:bg-campus-dark"
      >
        Sign Out
      </button>
    </div>
  );
}
