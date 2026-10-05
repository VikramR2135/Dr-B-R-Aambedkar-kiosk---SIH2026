"use client";

import { useEffect, useState } from "react";
import { X, QrCode } from "lucide-react";
import { getQrContinuationUrl } from "@/services/archive";

export default function QRModal({
  documentId,
  documentTitle,
  onClose,
}: {
  documentId: string;
  documentTitle: string;
  onClose: () => void;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    getQrContinuationUrl(documentId).then(setUrl);
  }, [documentId]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 px-5"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-sm bg-parchment-light p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="focus-ring rounded-sm p-1 text-stone hover:bg-ink/5" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-sm border border-ink/15 bg-parchment">
          <QrCode size={72} strokeWidth={1} className="text-navy" />
        </div>

        <p className="mt-4 font-serif text-lg text-ink">{documentTitle}</p>
        <p className="mt-1 text-sm text-stone">Scan to continue on your phone</p>
        {url && <p className="mt-2 truncate text-[11px] text-stone-light">{url}</p>}
        <p className="mt-3 text-[11px] text-stone-light">
          Demo placeholder — the QR destination will point to a live continuation session once connected.
        </p>
      </div>
    </div>
  );
}
