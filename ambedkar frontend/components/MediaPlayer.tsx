"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Play, Pause, Volume2 } from "lucide-react";
import { MediaItem } from "@/types";

export default function MediaPlayer({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 px-5" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-sm bg-parchment-light" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-56 w-full bg-ink/10">
          <Image src={item.thumbnail} alt="" fill className="object-cover" />
          <button onClick={onClose} className="focus-ring absolute right-3 top-3 rounded-sm bg-ink/60 p-1.5 text-parchment-light" aria-label="Close player">
            <X size={16} />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="focus-ring absolute inset-0 flex items-center justify-center"
            aria-label={playing ? "Pause" : "Play"}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment-light/95 text-navy">
              {playing ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
            </span>
          </button>
        </div>

        <div className="p-6">
          <p className="text-[11px] text-stone">{item.category} · {item.date}</p>
          <h3 className="mt-1 font-serif text-xl text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone">{item.description}</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
              <div className={`h-full bg-navy transition-all duration-1000 ${playing ? "w-2/3" : "w-0"}`} />
            </div>
            <span className="flex items-center gap-1 text-[12px] text-stone">
              <Volume2 size={13} /> {item.duration}
            </span>
          </div>
          <p className="mt-4 text-[11px] text-stone-light">
            Demo placeholder player — no media file is attached in this prototype.
          </p>
        </div>
      </div>
    </div>
  );
}
