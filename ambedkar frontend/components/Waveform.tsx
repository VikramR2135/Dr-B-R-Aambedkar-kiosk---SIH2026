const BAR_DELAYS = [0, 0.1, 0.2, 0.3, 0.15, 0.25, 0.05, 0.35, 0.2, 0.1];

export default function Waveform({ active = true }: { active?: boolean }) {
  return (
    <div className="flex h-10 items-end justify-center gap-1" aria-hidden="true">
      {BAR_DELAYS.map((delay, i) => (
        <span
          key={i}
          className={`w-1 rounded-full bg-navy ${active ? "animate-wave" : ""}`}
          style={{
            height: active ? "100%" : "20%",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
