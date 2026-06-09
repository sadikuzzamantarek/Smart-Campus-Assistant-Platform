import { useState } from "react";
import {
  Layers,
  Clock,
  CheckSquare,
  XCircle,
  Star,
  Info,
  Send,
  FileText,
  User,
} from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import { ASSIGNMENTS } from "../data/mockData";

const stats = [
  { key: "total", label: "Total", sub: "This semester", icon: Layers, count: 12, active: true },
  { key: "pending", label: "Pending", sub: "Need attention", icon: Clock, count: 5, color: "text-red-500", subColor: "text-red-500" },
  { key: "submitted", label: "Submitted", sub: "On time", icon: CheckSquare, count: 6, color: "text-green-600", subColor: "text-green-600" },
  { key: "late", label: "Late", sub: "Mark penalty applies", icon: XCircle, count: 1, color: "text-red-800", subColor: "text-red-800" },
  { key: "graded", label: "Graded", sub: "Avg Score: 12.75", icon: Star, count: 2, color: "text-teal-600", subColor: "text-teal-600" },
];

function StatCard({ stat, activeFilter, onFilter }) {
  const Icon = stat.icon;
  const isActive = activeFilter === stat.key || (activeFilter === "all" && stat.key === "total");

  return (
    <button
      onClick={() => onFilter(stat.key === "total" ? "all" : stat.key)}
      className={`flex flex-1 min-w-[140px] flex-col rounded-xl border p-4 text-left transition shadow-sm ${
        isActive && stat.key === "total"
          ? "border-campus-primary bg-campus-primary text-white"
          : "border-gray-200 bg-white hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={`h-5 w-5 ${isActive && stat.key === "total" ? "text-white" : stat.color || "text-campus-primary"}`}
        />
        <span className={`text-sm font-medium ${isActive && stat.key === "total" ? "text-purple-100" : "text-gray-600"}`}>
          {stat.label}
        </span>
      </div>
      <p className={`mt-2 text-3xl font-bold ${isActive && stat.key === "total" ? "text-white" : stat.color || "text-campus-primary"}`}>
        {stat.count}
      </p>
      <p className={`mt-1 text-xs ${isActive && stat.key === "total" ? "text-purple-200" : stat.subColor || "text-gray-400"}`}>
        {stat.sub}
      </p>
    </button>
  );
}

function AssignmentCard({ assignment }) {
  const isPending = assignment.status === "pending";
  const isLate = assignment.status === "late";
  const isSubmitted = assignment.status === "submitted";
  const isGraded = assignment.status === "graded";

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-stretch">
      <div
        className={`flex w-full shrink-0 flex-col justify-center rounded-lg px-4 py-3 sm:w-36 ${
          isGraded
            ? "bg-teal-50 text-teal-700"
            : isSubmitted
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
        }`}
      >
        {isGraded ? (
          <>
            <p className="text-2xl font-bold">{assignment.score}</p>
            <p className="text-xs">Out of {assignment.maxScore}</p>
          </>
        ) : isSubmitted ? (
          <>
            <p className="text-xs font-medium">Submitted</p>
            <p className="text-lg font-bold">{assignment.submittedDate}</p>
          </>
        ) : (
          <>
            <p className="text-xs font-medium">Submission:</p>
            <p className="text-lg font-bold">{assignment.dueDate}</p>
            {(isPending || isLate) && (
              <p className="mt-1 text-[10px] leading-tight text-red-500">
                {assignment.penaltyNote || "* 50% mark will be deducted if submitted late"}
              </p>
            )}
          </>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-bold text-gray-900">{assignment.title}</h3>
          {assignment.daysLeft && (
            <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              {assignment.daysLeft}
            </span>
          )}
          {isLate && (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
              Late
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-medium text-campus-primary">
            {assignment.subject}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-purple-50 px-3 py-0.5 text-xs font-medium text-campus-primary">
            <User className="h-3 w-3" />
            {assignment.instructor}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {assignment.description}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        <button className="text-gray-400 hover:text-campus-primary" aria-label="Info">
          <Info className="h-5 w-5" />
        </button>
        {isPending || isLate ? (
          <button className="flex items-center gap-2 rounded-lg bg-campus-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-campus-dark">
            Submit
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

export default function Assignments() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ASSIGNMENTS.filter((a) => {
    const matchFilter = filter === "all" || a.status === filter;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const sections = [
    { key: "pending", label: "Pending" },
    { key: "late", label: "Late" },
    { key: "submitted", label: "Submitted" },
    { key: "graded", label: "Graded" },
  ];

  const showSections = filter === "all";

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Assignments" />

      <div className="flex gap-3 overflow-x-auto pb-1">
        {stats.map((stat) => (
          <StatCard
            key={stat.key}
            stat={stat}
            activeFilter={filter}
            onFilter={setFilter}
          />
        ))}
      </div>

      <SearchBar placeholder="Search assignments..." onSearch={setSearch} />

      {showSections ? (
        sections.map(({ key, label }) => {
          const items = filtered.filter((a) => a.status === key);
          if (items.length === 0) return null;
          return (
            <div key={key}>
              <h2 className="mb-3 text-lg font-semibold text-campus-primary">
                {label}
              </h2>
              <div className="space-y-4">
                {items.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      )}
    </div>
  );
}
