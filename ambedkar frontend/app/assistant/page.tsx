import AssistantExperience from "@/components/AssistantExperience";
import { Mic, FileSearch, BrainCircuit, MessageSquareText } from "lucide-react";

const PIPELINE = [
  { icon: Mic, label: "Voice or text question" },
  { icon: FileSearch, label: "Semantic search over the archive" },
  { icon: BrainCircuit, label: "Retrieval-augmented generation" },
  { icon: MessageSquareText, label: "Answer with cited sources" },
];

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.14em] text-brass">AI research assistant</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Ask Ambedkar AI</h1>
        <p className="mt-3 text-[15px] text-stone">
          Ask questions about Dr. B. R. Ambedkar&rsquo;s writings, speeches, ideas and
          historical contributions.
        </p>
      </div>

      <div className="mt-12">
        <AssistantExperience />
      </div>

      <div className="mt-20 border-t border-ink/10 pt-10">
        <p className="text-center text-xs tracking-[0.14em] text-brass">How an answer is produced</p>
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {PIPELINE.map((step, i) => (
            <div key={step.label} className="text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-navy">
                <step.icon size={16} strokeWidth={1.6} />
              </span>
              <p className="mt-2 text-[12.5px] leading-snug text-stone">{step.label}</p>
              {i < PIPELINE.length - 1 && (
                <span className="mt-1 hidden text-ink/20 sm:block">—</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
