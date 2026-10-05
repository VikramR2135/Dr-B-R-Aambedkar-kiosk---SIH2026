const STATS = [
  { value: "10,000+", label: "Documents" },
  { value: "500+", label: "Speeches" },
  { value: "100+", label: "Years of history" },
  { value: "4", label: "Indian languages" },
];

export default function StatBar() {
  return (
    <section className="border-y border-ink/10 bg-navy text-parchment-light">
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-parchment-light/70">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-parchment-light/50">
          Demo values shown for prototype purposes — figures will reflect the connected archive backend.
        </p>
      </div>
    </section>
  );
}
