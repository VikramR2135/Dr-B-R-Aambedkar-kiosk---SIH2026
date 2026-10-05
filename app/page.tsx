import { BookOpen, Sparkles, Clock, Share2, Film } from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import StatBar from "@/components/StatBar";
import ArchiveCard from "@/components/ArchiveCard";
import { mockDocuments } from "@/data/mock/documents";
import { mockTimeline } from "@/data/mock/timeline";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = mockDocuments.slice(0, 3);
  const timelinePreview = mockTimeline.slice(0, 5);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-xs tracking-[0.14em] text-brass">Five ways in</p>
          <h2 className="mt-2 font-serif text-3xl text-ink">Start exploring</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Sparkles}
            title="AI Research Assistant"
            description="Ask questions about Ambedkar's writings and ideas, by text or voice."
            href="/assistant"
          />
          <FeatureCard
            icon={BookOpen}
            title="Digital Archive"
            description="Explore digitized writings, documents and manuscripts."
            href="/archive"
          />
          <FeatureCard
            icon={Clock}
            title="Timeline"
            description="Explore important events from Ambedkar's life and work."
            href="/timeline"
          />
          <FeatureCard
            icon={Share2}
            title="Knowledge Graph"
            description="Discover connections between people, works, events and ideas."
            href="/knowledge-graph"
          />
          <FeatureCard
            icon={Film}
            title="Media Archive"
            description="Explore speeches, interviews and documentaries."
            href="/media"
          />
        </div>
      </section>

      <StatBar />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.14em] text-brass">From the archive</p>
            <h2 className="mt-2 font-serif text-3xl text-ink">Featured documents</h2>
          </div>
          <Link href="/archive" className="focus-ring hidden items-center gap-1 text-sm text-navy sm:inline-flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((doc) => (
            <ArchiveCard key={doc.id} doc={doc} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment-dark/30">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.14em] text-brass">1891 – 1956</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">A life in outline</h2>
            </div>
            <Link href="/timeline" className="focus-ring hidden items-center gap-1 text-sm text-navy sm:inline-flex">
              Full timeline <ArrowRight size={14} />
            </Link>
          </div>

          <ol className="rail flex gap-6 overflow-x-auto pb-4">
            {timelinePreview.map((event) => (
              <li
                key={event.id}
                className="w-64 shrink-0 rounded-sm border border-ink/10 bg-parchment-light p-5"
              >
                <p className="font-serif text-xl text-navy">{event.yearLabel}</p>
                <p className="mt-1.5 text-[15px] font-medium text-ink">{event.title}</p>
                <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-stone">
                  {event.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
