"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { MOCK_MODE } from "@/services/api";

// Shows a quiet, dismissible strip when the app is running fully on mock
// data (i.e. no live backend attached). Intentionally understated — this
// is a prototype status note, not an error.
export default function ConnectionBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("archive-banner-dismissed");
    if (stored === "1") setDismissed(true);
  }, []);

  if (!MOCK_MODE || dismissed) return null;

  return (
    <div className="border-b border-brass/30 bg-brass/10 px-5 py-2 text-center text-xs text-ink-soft lg:px-8">
      <span className="inline-flex items-center gap-1.5">
        <WifiOff size={13} />
        Running in prototype mode — AI answers and archive records shown are demo data, not a connected backend.
      </span>
      <button
        onClick={() => {
          sessionStorage.setItem("archive-banner-dismissed", "1");
          setDismissed(true);
        }}
        className="focus-ring ml-3 underline decoration-dotted underline-offset-2"
      >
        Dismiss
      </button>
    </div>
  );
}
