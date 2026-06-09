import { Link } from "react-router-dom";
import {
  Megaphone,
  CalendarCheck,
  FileText,
  Clock,
  ArrowRight,
  User,
} from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import { useAuth } from "../hooks/useAuth";
import { NOTICES, EVENTS, ASSIGNMENTS } from "../data/mockData";

const quickLinks = [
  { to: "/notices", label: "Notices", icon: Megaphone, count: NOTICES.length },
  { to: "/events", label: "Events", icon: CalendarCheck, count: EVENTS.length },
  { to: "/assignments", label: "Assignments", icon: FileText, count: ASSIGNMENTS.filter((a) => a.status === "pending").length },
  { to: "/schedule", label: "Classes", icon: Clock, count: 7 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const pending = ASSIGNMENTS.filter((a) => a.status === "pending" || a.status === "late");

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Dashboard" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">{user?.name}</h2>
        <p className="mt-1 text-sm text-campus-primary">
          {user?.departmentShort} · Semester {user?.semester}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map(({ to, label, icon: Icon, count }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-campus-light text-campus-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-campus-primary">{count}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:text-campus-primary" />
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Notices</h3>
            <Link to="/notices" className="text-sm text-campus-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {NOTICES.slice(0, 2).map((notice) => (
              <div key={notice.id} className="rounded-lg border border-gray-100 p-3">
                <p className="text-sm font-semibold text-gray-900">{notice.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {notice.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">{notice.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Upcoming Events</h3>
            <Link to="/events" className="text-sm text-campus-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {EVENTS.filter((e) => e.status === "upcoming").map((event) => (
              <div key={event.id} className="flex gap-3 rounded-lg border border-gray-100 p-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <span className="text-lg font-bold leading-none">{event.date.split(" ")[0]}</span>
                  <span className="text-[10px] font-medium">{event.date.split(" ")[1]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.statusLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Pending Assignments</h3>
          <Link to="/assignments" className="text-sm text-campus-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {pending.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="flex flex-col gap-2 rounded-lg border border-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-xs text-campus-primary">
                  <User className="h-3 w-3" />
                  {a.instructor}
                </span>
              </div>
              <span className="text-sm font-medium text-red-500">Due: {a.dueDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
