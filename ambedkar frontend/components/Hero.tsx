import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524578271613-d550eed6392c?q=80&w=1800&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />
      <div className="paper-grain absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-parchment/40 via-parchment/70 to-parchment" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-24 text-center lg:px-8 lg:pb-28 lg:pt-32">
        <p className="text-xs tracking-[0.14em] text-brass">A digital heritage archive, built for research</p>

        <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.08] text-ink sm:text-6xl">
          Dr. B. R. Ambedkar
        </h1>
        <p className="mt-1 font-serif text-2xl italic text-navy sm:text-3xl">
          Digital Heritage Archive
        </p>

        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
          Explore the writings, speeches, ideas and legacy of Dr. B. R. Ambedkar
          through an AI-powered digital archive.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/assistant"
            className="focus-ring inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-medium text-parchment-light transition-colors hover:bg-navy-deep"
          >
            <Mic size={16} /> Ask Ambedkar AI
          </Link>
          <Link
            href="/archive"
            className="focus-ring inline-flex items-center gap-2 rounded-sm border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
          >
            Explore the Archive <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
