import Image from "next/image";
import { Play, Mic2, Video } from "lucide-react";
import { MediaItem } from "@/types";

export default function MediaCard({
  item,
  onPlay,
}: {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
}) {
  return (
    <button
      onClick={() => onPlay(item)}
      className="focus-ring group flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-parchment-light text-left transition-shadow hover:shadow-[0_10px_28px_rgba(23,19,16,0.10)]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-ink/5">
        <Image src={item.thumbnail} alt="" fill sizes="320px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute inset-0 flex items-center justify-center bg-ink/25 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-parchment-light text-navy">
            <Play size={17} fill="currentColor" />
          </span>
        </span>
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-sm bg-parchment/90 px-2 py-0.5 text-[11px] text-ink-soft">
          {item.kind === "audio" ? <Mic2 size={11} /> : <Video size={11} />}
          {item.category}
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-sm bg-ink/70 px-1.5 py-0.5 text-[11px] text-parchment-light">
          {item.duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] text-stone">{item.date}</p>
        <h3 className="font-serif text-[16px] leading-snug text-ink">{item.title}</h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone">{item.description}</p>
      </div>
    </button>
  );
}
