import { useState } from "react";
import { Info, Building2, Calendar, ExternalLink } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import { NOTICES, TAG_COLORS } from "../data/mockData";

export default function Notices() {
  const [search, setSearch] = useState("");

  const filtered = NOTICES.filter(
    (n) =>
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Notices" />

      <SearchBar placeholder="Search notice..." onSearch={setSearch} />

      <h2 className="text-lg font-semibold text-campus-primary">This week</h2>

      <div className="space-y-4">
        {filtered.map((notice) => (
          <article
            key={notice.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-gray-900">{notice.title}</h3>
              <button className="shrink-0 text-gray-400 hover:text-campus-primary">
                <Info className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {notice.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${TAG_COLORS[tag] || "bg-gray-100 text-gray-700"}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {notice.description}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-campus-primary" />
                  {notice.office}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-campus-primary" />
                  {notice.date}
                </span>
              </div>
              <button className="flex items-center gap-2 self-start rounded-lg bg-campus-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-campus-dark sm:self-auto">
                View
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
