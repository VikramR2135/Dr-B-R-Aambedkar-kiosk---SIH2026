import { AlertTriangle, RefreshCcw } from "lucide-react";

export type ErrorKind =
  | "backend-unavailable"
  | "websocket-disconnected"
  | "mic-permission-denied"
  | "no-results"
  | "document-unavailable"
  | "ai-unavailable"
  | "network";

const COPY: Record<ErrorKind, { title: string; body: string }> = {
  "backend-unavailable": {
    title: "The archive service isn't responding",
    body: "We couldn't reach the archive backend. Showing demo content instead where possible.",
  },
  "websocket-disconnected": {
    title: "Live connection lost",
    body: "The real-time session connection was interrupted. Reconnect to resume live features.",
  },
  "mic-permission-denied": {
    title: "Microphone access is blocked",
    body: "Allow microphone permission in your browser to ask a question by voice, or type your question instead.",
  },
  "no-results": {
    title: "No matching records",
    body: "Nothing in the archive matches this search. Try a different term or clear your filters.",
  },
  "document-unavailable": {
    title: "This document isn't available",
    body: "The requested record couldn't be loaded. It may have been moved or is not yet digitized.",
  },
  "ai-unavailable": {
    title: "Ambedkar AI is unavailable right now",
    body: "The question-answering service didn't respond. Please try again in a moment.",
  },
  network: {
    title: "Connection problem",
    body: "Check your network connection and try again.",
  },
};

export default function ErrorState({
  kind,
  onRetry,
}: {
  kind: ErrorKind;
  onRetry?: () => void;
}) {
  const copy = COPY[kind];
  return (
    <div className="flex flex-col items-center gap-3 rounded-sm border border-ink/10 bg-parchment-light px-6 py-12 text-center">
      <AlertTriangle size={22} className="text-brass" strokeWidth={1.5} />
      <p className="font-serif text-lg text-ink">{copy.title}</p>
      <p className="max-w-sm text-sm text-stone">{copy.body}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="focus-ring mt-2 inline-flex items-center gap-1.5 rounded-sm border border-ink/15 px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:bg-ink/5"
        >
          <RefreshCcw size={13} /> Try again
        </button>
      )}
    </div>
  );
}
