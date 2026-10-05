import Link from "next/link";
import Image from "next/image";
import { ArchiveDocument } from "@/types";

export default function ArchiveCard({ doc }: { doc: ArchiveDocument }) {
  return (
    <Link
      href={`/archive/${doc.id}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-parchment-light transition-shadow hover:shadow-[0_10px_28px_rgba(23,19,16,0.10)]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-ink/5">
        <Image
          src={doc.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-2.5 top-2.5 rounded-sm bg-parchment/90 px-2 py-0.5 text-[11px] text-ink-soft">
          {doc.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between text-[11px] text-stone">
          <span>{doc.year}</span>
          <span>{doc.language}</span>
        </div>
        <h3 className="font-serif text-[17px] leading-snug text-ink">{doc.title}</h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone">{doc.description}</p>
        <span className="mt-auto pt-2 text-[13px] font-medium text-navy">Open record</span>
      </div>
    </Link>
  );
}
