"use client";

import { useState } from "react";
import { Volume2, Copy, Share2, Check } from "lucide-react";
import { AIAnswer } from "@/types";
import SourceCard from "@/components/SourceCard";

export default function AnswerCard({ answer }: { answer: AIAnswer }) {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(answer.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op in this prototype
    }
  }

  function handleListen() {
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), 1600);
  }

  return (
    <div className="animate-fadeUp">
      <div className="rounded-sm border border-ink/10 bg-parchment-light">
        <div className="border-b border-ink/10 px-6 py-5">
          <p className="text-xs tracking-[0.1em] text-brass">Your question</p>
          <p className="mt-1.5 font-serif text-xl text-ink">{answer.question}</p>
        </div>

        <div className="px-6 py-6">
          <p className="text-xs tracking-[0.1em] text-brass">AI response</p>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-soft">{answer.answer}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={handleListen}
              className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-ink/5"
            >
              <Volume2 size={14} className={speaking ? "animate-pulse text-navy" : ""} />
              {speaking ? "Playing…" : "Listen to answer"}
            </button>
            <button
              onClick={handleCopy}
              className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-ink/5"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-ink/15 px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-ink/5">
              <Share2 size={14} /> Share
            </button>
          </div>
          <p className="mt-4 text-[11px] text-stone-light">
            Demo response — shown for prototype purposes. Not a verified quotation from Dr. Ambedkar's writings.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-serif text-xl text-ink">Sources</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {answer.sources.map((source) => (
            <SourceCard key={source.documentId} source={source} />
          ))}
        </div>
      </div>
    </div>
  );
}
