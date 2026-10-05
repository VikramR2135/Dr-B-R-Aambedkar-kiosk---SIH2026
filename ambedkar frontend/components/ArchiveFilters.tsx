"use client";

import { cn } from "@/lib/utils";
import { archiveCategories } from "@/data/mock/documents";
import { Language } from "@/types";

const LANGUAGES: Language[] = ["English", "Tamil", "Hindi", "Marathi"];

export interface ArchiveFilterState {
  category: string | null;
  language: Language | null;
}

export default function ArchiveFilters({
  filters,
  onChange,
}: {
  filters: ArchiveFilterState;
  onChange: (next: ArchiveFilterState) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[12.5px] font-medium text-ink-soft">Type</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            onClick={() => onChange({ ...filters, category: null })}
            className={cn(
              "focus-ring rounded-full border px-3 py-1 text-[12.5px] transition-colors",
              filters.category === null
                ? "border-navy bg-navy text-parchment-light"
                : "border-ink/15 text-ink-soft hover:border-navy/40"
            )}
          >
            All
          </button>
          {archiveCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={cn(
                "focus-ring rounded-full border px-3 py-1 text-[12.5px] transition-colors",
                filters.category === cat
                  ? "border-navy bg-navy text-parchment-light"
                  : "border-ink/15 text-ink-soft hover:border-navy/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[12.5px] font-medium text-ink-soft">Language</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            onClick={() => onChange({ ...filters, language: null })}
            className={cn(
              "focus-ring rounded-full border px-3 py-1 text-[12.5px] transition-colors",
              filters.language === null
                ? "border-navy bg-navy text-parchment-light"
                : "border-ink/15 text-ink-soft hover:border-navy/40"
            )}
          >
            All
          </button>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => onChange({ ...filters, language: lang })}
              className={cn(
                "focus-ring rounded-full border px-3 py-1 text-[12.5px] transition-colors",
                filters.language === lang
                  ? "border-navy bg-navy text-parchment-light"
                  : "border-ink/15 text-ink-soft hover:border-navy/40"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
