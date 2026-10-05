import { Cpu, ShieldCheck, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-xs tracking-[0.14em] text-brass">About this project</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">A software prototype</h1>

      <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink-soft">
        This application is a Smart India Hackathon software prototype exploring how an
        AI-powered digital archive could make Dr. B. R. Ambedkar&rsquo;s writings, speeches
        and historical record more accessible for research, education and public
        engagement. It currently runs as a browser-based demonstration: hardware
        integration (a physical kiosk, microphone array, or dedicated device) is
        intentionally out of scope at this stage.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/25 text-navy">
            <Cpu size={16} strokeWidth={1.6} />
          </span>
          <p className="mt-3 text-sm font-medium text-ink">AI pipeline</p>
          <p className="mt-1 text-[13px] leading-relaxed text-stone">
            Designed around speech-to-text, semantic search, retrieval-augmented
            generation, and text-to-speech.
          </p>
        </div>
        <div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/25 text-navy">
            <Layers size={16} strokeWidth={1.6} />
          </span>
          <p className="mt-3 text-sm font-medium text-ink">Service-layer architecture</p>
          <p className="mt-1 text-[13px] leading-relaxed text-stone">
            Mock data is clearly separated from real API calls, so a backend can be
            connected without rewriting the interface.
          </p>
        </div>
        <div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/25 text-navy">
            <ShieldCheck size={16} strokeWidth={1.6} />
          </span>
          <p className="mt-3 text-sm font-medium text-ink">Historical accuracy</p>
          <p className="mt-1 text-[13px] leading-relaxed text-stone">
            Timeline milestones reflect widely documented public record. Sample
            documents and AI answers are clearly labelled demo content, not verified
            quotations.
          </p>
        </div>
      </div>

      <div className="rule my-12" />

      <h2 className="font-serif text-2xl text-ink">What&rsquo;s real, what&rsquo;s mock</h2>
      <ul className="mt-4 space-y-2 text-[14px] text-stone">
        <li>• Archive documents, AI answers, media items and graph data shown here are demo/mock records for this prototype.</li>
        <li>• Timeline dates reflect well-documented historical milestones.</li>
        <li>• The service layer (<code className="text-ink-soft">services/</code>) is structured to call a real backend once available, falling back to mock data automatically.</li>
      </ul>
    </div>
  );
}
