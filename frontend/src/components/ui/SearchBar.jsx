import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ placeholder = "Search...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 text-sm outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-campus-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-campus-dark"
      >
        Search
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
