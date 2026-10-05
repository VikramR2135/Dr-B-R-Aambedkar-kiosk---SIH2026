"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ArchiveCard from "@/components/ArchiveCard";
import ArchiveFilters, { ArchiveFilterState } from "@/components/ArchiveFilters";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { getDocuments } from "@/services/archive";
import { ArchiveDocument } from "@/types";

export default function ArchivePage() {
  const [docs, setDocs] = useState<ArchiveDocument[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<ArchiveFilterState>({ category: null, language: null });

  function load() {
    setDocs(null);
    setError(false);
    getDocuments()
      .then(setDocs)
      .catch(() => setError(true));
  }

  useEffect(load, []);

  const filtered = useMemo(() => {
    if (!docs) return [];
    return docs.filter((doc) => {
      if (filters.category && doc.category !== filters.category) return false;
      if (filters.language && doc.language !== filters.language) return false;
      if (query && !doc.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [docs, filters, query]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.14em] text-brass">Explore the collection</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Digital Archive</h1>
        <p className="mt-3 text-[15px] text-stone">
          Browse digitized writings, speeches, books, letters, manuscripts, photographs
          and constitutional material.
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-sm border border-ink/15 bg-parchment-light px-4 py-2.5">
        <Search size={16} className="text-stone" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search writings, speeches, documents, photographs…"
          className="w-full bg-transparent text-[15px] text-ink placeholder:text-stone/70 focus:outline-none"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <ArchiveFilters filters={filters} onChange={setFilters} />
        </aside>

        <div>
          {error && <ErrorState kind="backend-unavailable" onRetry={load} />}
          {!error && !docs && <LoadingState label="Searching the digital archive…" />}
          {!error && docs && filtered.length === 0 && <ErrorState kind="no-results" />}
          {!error && docs && filtered.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((doc) => (
                <ArchiveCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
