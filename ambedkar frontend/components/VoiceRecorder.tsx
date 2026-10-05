"use client";

import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import Waveform from "@/components/Waveform";
import ErrorState from "@/components/ErrorState";
import { transcribeAudio } from "@/services/ai";

type Stage = "idle" | "listening" | "transcribing" | "mic-error";

export default function VoiceRecorder({
  onTranscript,
}: {
  onTranscript: (text: string) => void;
}) {
  const [stage, setStage] = useState<Stage>("idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  async function startListening() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setStage("transcribing");
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const transcript = await transcribeAudio(blob);
        onTranscript(transcript);
        setStage("idle");
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setStage("listening");
    } catch {
      setStage("mic-error");
    }
  }

  function stopListening() {
    mediaRecorderRef.current?.stop();
  }

  if (stage === "mic-error") {
    return (
      <div className="mx-auto max-w-sm">
        <ErrorState kind="mic-permission-denied" onRetry={() => setStage("idle")} />
      </div>
    );
  }

  if (stage === "listening") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-ink/10 bg-parchment-light px-8 py-10">
        <p className="text-sm font-medium text-navy">Listening…</p>
        <Waveform active />
        <button
          onClick={stopListening}
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm text-parchment-light transition-colors hover:bg-navy-deep"
        >
          <Square size={13} /> Stop
        </button>
      </div>
    );
  }

  if (stage === "transcribing") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-ink/10 bg-parchment-light px-8 py-10">
        <p className="text-sm font-medium text-navy">Processing your question…</p>
        <Waveform active={false} />
      </div>
    );
  }

  return (
    <button
      onClick={startListening}
      className="focus-ring group flex w-full flex-col items-center gap-3 rounded-sm border border-dashed border-navy/30 bg-parchment-light px-8 py-10 transition-colors hover:border-navy/60"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-parchment-light transition-transform group-hover:scale-105">
        <Mic size={22} />
      </span>
      <span className="text-sm font-medium text-ink">Ask by voice</span>
      <span className="text-xs text-stone">Tap to start speaking your question</span>
    </button>
  );
}
