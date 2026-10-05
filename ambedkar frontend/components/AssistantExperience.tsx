"use client";

import { useState } from "react";
import { Search, Pencil } from "lucide-react";
import VoiceRecorder from "@/components/VoiceRecorder";
import AnswerCard from "@/components/AnswerCard";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { suggestedQuestions } from "@/data/mock/questions";
import { askQuestion } from "@/services/ai";
import { AIAnswer } from "@/types";
import { cn } from "@/lib/utils";

type View = "ask" | "confirm-transcript" | "processing" | "answer" | "error";

const PIPELINE_STAGES = ["Searching the digital archive", "Analyzing archival sources", "Preparing your answer"];

export default function AssistantExperience() {
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [question, setQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [view, setView] = useState<View>("ask");
  const [stageIndex, setStageIndex] = useState(0);
  const [answer, setAnswer] = useState<AIAnswer | null>(null);

  async function runPipeline(finalQuestion: string) {
    setView("processing");
    setStageIndex(0);
    const timers = PIPELINE_STAGES.map((_, i) =>
      setTimeout(() => setStageIndex(i), i * 700)
    );
    try {
      const result = await askQuestion(finalQuestion);
      setAnswer(result);
      setView("answer");
    } catch {
      setView("error");
    } finally {
      timers.forEach(clearTimeout);
    }
  }

  function handleTextSubmit(q: string) {
    if (!q.trim()) return;
    runPipeline(q.trim());
  }

  function handleTranscript(text: string) {
    setTranscript(text);
    setView("confirm-transcript");
  }

  if (view === "processing") {
    return (
      <div className="mx-auto max-w-lg">
        <LoadingState label={PIPELINE_STAGES[stageIndex]} />
        <ol className="mt-2 flex justify-center gap-4 text-[11px] text-stone-light">
          {PIPELINE_STAGES.map((stage, i) => (
            <li key={stage} className={i <= stageIndex ? "text-navy" : ""}>
              {stage}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (view === "error") {
    return (
      <div className="mx-auto max-w-lg">
        <ErrorState kind="ai-unavailable" onRetry={() => setView("ask")} />
      </div>
    );
  }

  if (view === "answer" && answer) {
    return (
      <div className="mx-auto max-w-3xl">
        <AnswerCard answer={answer} />
        <button
          onClick={() => {
            setView("ask");
            setQuestion("");
            setAnswer(null);
          }}
          className="focus-ring mt-8 text-sm text-navy underline decoration-dotted underline-offset-4"
        >
          Ask another question
        </button>
      </div>
    );
  }

  if (view === "confirm-transcript") {
    return (
      <div className="mx-auto max-w-xl rounded-sm border border-ink/10 bg-parchment-light p-6">
        <p className="flex items-center gap-1.5 text-xs tracking-[0.1em] text-brass">
          <Pencil size={12} /> Review your question
        </p>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={3}
          className="focus-ring mt-3 w-full resize-none rounded-sm border border-ink/15 bg-parchment px-4 py-3 text-[15px] text-ink"
        />
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setView("ask")}
            className="focus-ring rounded-sm border border-ink/15 px-4 py-2 text-sm text-ink-soft hover:bg-ink/5"
          >
            Cancel
          </button>
          <button
            onClick={() => handleTextSubmit(transcript)}
            className="focus-ring rounded-sm bg-navy px-4 py-2 text-sm text-parchment-light hover:bg-navy-deep"
          >
            Ask this question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex justify-center gap-1 rounded-sm border border-ink/10 bg-parchment-light p-1">
        {(["text", "voice"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setInputMode(mode)}
            className={cn(
              "focus-ring flex-1 rounded-sm px-4 py-2 text-sm transition-colors",
              inputMode === mode ? "bg-navy text-parchment-light" : "text-ink-soft hover:bg-ink/5"
            )}
          >
            {mode === "text" ? "Ask by text" : "Ask by voice"}
          </button>
        ))}
      </div>

      {inputMode === "text" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTextSubmit(question);
          }}
          className="flex items-center gap-2 rounded-sm border border-ink/15 bg-parchment-light p-2 pl-4"
        >
          <Search size={17} className="shrink-0 text-stone" />
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about Dr. B. R. Ambedkar…"
            className="focus:outline-none w-full bg-transparent py-2 text-[15px] text-ink placeholder:text-stone/70"
          />
          <button
            type="submit"
            className="focus-ring shrink-0 rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-parchment-light transition-colors hover:bg-navy-deep"
          >
            Ask
          </button>
        </form>
      ) : (
        <VoiceRecorder onTranscript={handleTranscript} />
      )}

      <div className="mt-10">
        <p className="mb-3 text-center text-xs tracking-[0.1em] text-brass">Suggested questions</p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setQuestion(q);
                setInputMode("text");
              }}
              className="focus-ring rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-navy/40 hover:text-navy"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
