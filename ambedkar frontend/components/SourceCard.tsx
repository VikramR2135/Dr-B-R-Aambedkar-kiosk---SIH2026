import Link from "next/link";
import { SourceCitation } from "@/types";
import { FileText } from "lucide-react";

export default function SourceCard({ source }: { source: SourceCitation }) {
  return (
    <div className="rounded-sm border border-ink/10 bg-parchment-light p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/25 text-navy">
          <FileText size={14} strokeWidth={1.6} />
        </span>
        <div className="min-w-0">
          <h4 className="font-serif text-[16px] text-ink">{source.title}</h4>
          <p className="mt-0.5 text-[13px] text-stone">{source.author}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12.5px] text-stone">
        <div className="flex justify-between gap-2">
          <dt className="text-stone-light">Publication</dt>
          <dd className="text-ink-soft">{source.publication}</dd>
        </div>
        {source.volume && (
          <div className="flex justify-between gap-2">
            <dt className="text-stone-light">Volume</dt>
            <dd className="text-ink-soft">{source.volume}</dd>
          </div>
        )}
        {source.chapter && (
          <div className="flex justify-between gap-2">
            <dt className="text-stone-light">Chapter</dt>
            <dd className="text-ink-soft">{source.chapter}</dd>
          </div>
        )}
        {source.page && (
          <div className="flex justify-between gap-2">
            <dt className="text-stone-light">Page</dt>
            <dd className="text-ink-soft">{source.page}</dd>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <dt className="text-stone-light">Year</dt>
          <dd className="text-ink-soft">{source.year}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/archive/${source.documentId}`}
          className="focus-ring rounded-sm border border-ink/15 px-3 py-1.5 text-[12.5px] text-ink-soft transition-colors hover:bg-ink/5"
        >
          View source
        </Link>
        <Link
          href={`/archive/${source.documentId}`}
          className="focus-ring rounded-sm bg-navy px-3 py-1.5 text-[12.5px] text-parchment-light transition-colors hover:bg-navy-deep"
        >
          Open document
        </Link>
      </div>
      <p className="mt-3 text-[11px] text-stone-light">Demo citation — sample metadata, not a verified quotation.</p>
    </div>
  );
}
