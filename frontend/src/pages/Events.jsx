import { useState } from "react";
import { Layers, CheckSquare, Star, Info, Send, FileText, User } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import { EVENTS } from "../data/mockData";

const stats = [
  { label: "Total", sub: "This semester", icon: Layers, count: 12, filled: true },
  { label: "Submitted", sub: "Online", icon: CheckSquare, count: 6, color: "text-green-600", subColor: "text-green-600" },
  { label: "Graded", sub: "Avg Score: 12.75", icon: Star, count: 2, color: "text-teal-600", subColor: "text-teal-600" },
];

function EventCard({ event }) {
  const isUpcoming = event.status === "upcoming";

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-stretch">
      <div
        className={`flex w-full shrink-0 flex-col justify-center rounded-lg px-4 py-3 sm:w-36 ${
          event.graded
            ? "bg-teal-50 text-teal-700"
            : isUpcoming
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-700"
        }`}
      >
        {event.graded ? (
          <>
            <p className="text-2xl font-bold">{event.score}</p>
            <p className="text-xs">Graded</p>
          </>
        ) : (
          <>
            <p className="text-xs font-medium">
              {isUpcoming ? "Date:" : "Submitted"}
            </p>
            <p className="text-lg font-bold">{event.date}</p>
            {event.statusLabel && (
              <p className="mt-1 text-xs">{event.statusLabel}</p>
            )}
          </>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-gray-900">{event.title}</h3>
          {event.isLive && (
            <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              LIVE
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-campus-primary">
            {event.subject}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-campus-primary">
            <User className="h-3 w-3" />
            {event.instructor}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {event.description}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        <button className="text-gray-400 hover:text-campus-primary" aria-label="Info">
          <Info className="h-5 w-5" />
        </button>
        {isUpcoming ? (
          <button className="flex items-center gap-2 rounded-lg bg-campus-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-campus-dark">
            Register
            <Send className="h-4 w-4" />
          </button>
        ) : (
          <button className="flex items-center gap-2 rounded-lg bg-campus-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-campus-dark">
            View
            <FileText className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const [search, setSearch] = useState("");

  const filtered = EVENTS.filter(
    (e) =>
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
  );

  const upcoming = filtered.filter((e) => e.status === "upcoming");
  const submitted = filtered.filter((e) => e.status === "submitted");

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Events" />

      <div className="flex gap-3 overflow-x-auto pb-1">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex min-w-[140px] flex-1 flex-col rounded-xl border p-4 shadow-sm ${
                stat.filled
                  ? "border-campus-primary bg-campus-primary text-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${stat.filled ? "text-white" : stat.color}`} />
                <span className={`text-sm font-medium ${stat.filled ? "text-purple-100" : "text-gray-600"}`}>
                  {stat.label}
                </span>
              </div>
              <p className={`mt-2 text-3xl font-bold ${stat.filled ? "text-white" : stat.color}`}>
                {stat.count}
              </p>
              <p className={`mt-1 text-xs ${stat.filled ? "text-purple-200" : stat.subColor}`}>
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      <SearchBar placeholder="Search events..." onSearch={setSearch} />

      {upcoming.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-campus-primary">Upcoming</h2>
          <div className="space-y-4">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      )}

      {submitted.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-campus-primary">Submitted</h2>
          <div className="space-y-4">
            {submitted.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
