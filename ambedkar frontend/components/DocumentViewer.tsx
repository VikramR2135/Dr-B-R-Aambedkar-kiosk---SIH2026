"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArchiveDocument } from "@/types";
import { ChevronLeft, ChevronRight, Volume2, ScanLine, Download, Share2, MessageSquareText, QrCode } from "lucide-react";
import QRModal from "@/components/QRModal";

export default function DocumentViewer({ doc }: { doc: ArchiveDocument }) {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"text" | "scan">("text");
  const [qrOpen, setQrOpen] = useState(false);
  const totalPages = doc.pageCount ?? 1;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-3 flex gap-1 rounded-sm border border-ink/10 bg-parchment-light p-1 w-fit">
          <button
            onClick={() => setTab("text")}
            className={`rounded-sm px-3.5 py-1.5 text-[13px] ${tab === "text" ? "bg-navy text-parchment-light" : "text-ink-soft"}`}
          >
            Read text
          </button>
          <button
            onClick={() => setTab("scan")}
            className={`rounded-sm px-3.5 py-1.5 text-[13px] ${tab === "scan" ? "bg-navy text-parchment-light" : "text-ink-soft"}`}
          >
            View original scan
          </button>
        </div>

        <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-sm border border-ink/10 bg-parchment-light">
          {tab === "scan" ? (
            <Image src={doc.thumbnail} alt={`Scan preview of ${doc.title}`} fill className="object-cover" />
          ) : (
            <div className="paper-grain flex h-full w-full flex-col items-center justify-center gap-2 p-10 text-center">
              <ScanLine size={22} className="text-stone" strokeWidth={1.4} />
              <p className="max-w-xs text-sm text-stone">
                Extracted text will appear here once the archive text-extraction service is
                connected. This is a placeholder reading view for the prototype.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="focus-ring inline-flex items-center gap-1 rounded-sm border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <p className="text-[13px] text-stone">
            Page {page} of {totalPages}
          </p>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="focus-ring inline-flex items-center gap-1 rounded-sm border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div>
        <span className="rounded-sm bg-navy/10 px-2 py-0.5 text-[11px] text-navy">{doc.category}</span>
        <h1 className="mt-3 font-serif text-2xl leading-tight text-ink">{doc.title}</h1>

        <dl className="mt-5 space-y-2.5 text-[13.5px]">
          {[
            ["Author", doc.author],
            ["Year", String(doc.year)],
            ["Collection", doc.collection],
            ["Volume", doc.volume ?? "—"],
            ["Page", doc.page ? String(doc.page) : "—"],
            ["Language", doc.language],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-ink/5 pb-2">
              <dt className="text-stone">{label}</dt>
              <dd className="text-ink-soft">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-2">
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-4 py-2.5 text-sm text-parchment-light hover:bg-navy-deep">
            <Volume2 size={15} /> Listen
          </button>
          <Link
            href="/assistant"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-sm border border-ink/15 px-4 py-2.5 text-sm text-ink-soft hover:bg-ink/5"
          >
            <MessageSquareText size={15} /> Ask AI about this document
          </Link>
          <div className="mt-1 grid grid-cols-3 gap-2">
            <button className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-sm border border-ink/15 py-2 text-[12.5px] text-ink-soft hover:bg-ink/5">
              <Download size={13} /> Download
            </button>
            <button className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-sm border border-ink/15 py-2 text-[12.5px] text-ink-soft hover:bg-ink/5">
              <Share2 size={13} /> Share
            </button>
            <button
              onClick={() => setQrOpen(true)}
              className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-sm border border-ink/15 py-2 text-[12.5px] text-ink-soft hover:bg-ink/5"
            >
              <QrCode size={13} /> Scan QR
            </button>
          </div>
        </div>

        <p className="mt-5 text-[12px] leading-relaxed text-stone">{doc.description}</p>
      </div>

      {qrOpen && (
        <QRModal documentId={doc.id} documentTitle={doc.title} onClose={() => setQrOpen(false)} />
      )}
    </div>
  );
}
