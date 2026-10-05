import Timeline from "@/components/Timeline";
import { getTimeline } from "@/services/archive";

export default async function TimelinePage() {
  const events = await getTimeline();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.14em] text-brass">1891 – 1956</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Ambedkar&rsquo;s journey</h1>
        <p className="mt-3 text-[15px] text-stone">
          Major documented milestones from Dr. Ambedkar&rsquo;s life and public work. Select
          an event to see related places and documents.
        </p>
      </div>
      <div className="mt-12">
        <Timeline events={events} />
      </div>
    </div>
  );
}
