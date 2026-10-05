export default function LoadingState({
  label = "Loading…",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-center ${
        compact ? "py-8" : "py-24"
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-ink/10 border-t-navy" />
      </span>
      <p className="text-sm text-stone">{label}</p>
    </div>
  );
}
