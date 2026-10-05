"use client";

import { useState } from "react";
import { TimelineEvent } from "@/types";
import { cn } from "@/lib/utils";
import { MapPin, FileText, X } from "lucide-react";
import { mockDocuments } from "@/data/mock/documents";

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  const [activeId, setActiveId] = useState<string | null>(events[0]?.id ?? null);
  const active = events.find((e) => e.id === activeId) ?? null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <ol className="relative border-l border-ink/15 pl-8">
        {events.map((event) => {
          const isActive = event.id === activeId;
          return (
            <li key={event.id} className="relative mb-8 last:mb-0">
              <button
                onClick={() => setActiveId(event.id)}
                className={cn(
                  "focus-ring absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors",
                  isActive ? "border-navy bg-navy" : "border-ink/25 bg-parchment"
                )}
                aria-label={`View details for ${event.title}`}
              />
              <button
                onClick={() => setActiveId(event.id)}
                className={cn(
                  "focus-ring block w-full rounded-sm px-4 py-3 text-left transition-colors",
                  isActive ? "bg-parchment-light border border-navy/20" : "hover:bg-ink/5"
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-lg text-navy">{event.yearLabel}</span>
                  <span className="text-[11px] text-stone-light">{event.category}</span>
                </div>
                <p className="mt-1 text-[15px] font-medium text-ink">{event.title}</p>
                <p className="mt-1 line-clamp-2 text-[13px] text-stone">{event.description}</p>
              </button>
            </li>
          );
        })}
      </ol>

      {active && (
        <aside className="sticky top-24 h-fit rounded-sm border border-ink/10 bg-parchment-light p-6 lg:block">
          <button
            onClick={() => setActiveId(null)}
            className="focus-ring float-right rounded-sm p-1 text-stone hover:bg-ink/5 lg:hidden"
            aria-label="Close"
          >
            <X size={15} />
          </button>
          <p className="font-serif text-2xl text-navy">{active.yearLabel}</p>
          <h3 className="mt-1.5 font-serif text-xl text-ink">{active.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-stone">{active.description}</p>

          {active.relatedPlaces.length > 0 && (
            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-soft">
                <MapPin size={13} /> Related places
              </p>
              <p className="mt-1 text-sm text-stone">{active.relatedPlaces.join(", ")}</p>
            </div>
          )}

          {active.relatedDocuments.length > 0 && (
            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-soft">
                <FileText size={13} /> Related documents
              </p>
              <ul className="mt-1.5 space-y-1">
                {active.relatedDocuments.map((docId) => {
                  const doc = mockDocuments.find((d) => d.id === docId);
                  if (!doc) return null;
                  return (
                    <li key={docId}>
                      <a href={`/archive/${docId}`} className="text-sm text-navy underline decoration-dotted underline-offset-2">
                        {doc.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
