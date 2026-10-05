"use client";

import { useEffect, useMemo, useState } from "react";
import MediaCard from "@/components/MediaCard";
import MediaPlayer from "@/components/MediaPlayer";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { getMedia } from "@/services/archive";
import { MediaItem, MediaCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: MediaCategory[] = ["Speeches", "Interviews", "Lectures", "Documentaries", "Historical Recordings"];

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState<MediaCategory | null>(null);
  const [nowPlaying, setNowPlaying] = useState<MediaItem | null>(null);

  function load() {
    setItems(null);
    setError(false);
    getMedia().then(setItems).catch(() => setError(true));
  }

  useEffect(load, []);

  const filtered = useMemo(
    () => (items ?? []).filter((item) => !category || item.category === category),
    [items, category]
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.14em] text-brass">Listen and watch</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Audio &amp; video archive</h1>
        <p className="mt-3 text-[15px] text-stone">
          Explore speeches, interviews, lectures, documentaries and historical recordings.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-1.5">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "focus-ring rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
            category === null ? "border-navy bg-navy text-parchment-light" : "border-ink/15 text-ink-soft hover:border-navy/40"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "focus-ring rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
              category === cat ? "border-navy bg-navy text-parchment-light" : "border-ink/15 text-ink-soft hover:border-navy/40"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {error && <ErrorState kind="backend-unavailable" onRetry={load} />}
        {!error && !items && <LoadingState label="Loading media archive…" />}
        {!error && items && filtered.length === 0 && <ErrorState kind="no-results" />}
        {!error && items && filtered.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <MediaCard key={item.id} item={item} onPlay={setNowPlaying} />
            ))}
          </div>
        )}
      </div>

      {nowPlaying && <MediaPlayer item={nowPlaying} onClose={() => setNowPlaying(null)} />}
    </div>
  );
}
