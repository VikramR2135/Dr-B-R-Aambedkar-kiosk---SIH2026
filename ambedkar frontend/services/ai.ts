// services/ai.ts
//
// Represents the intended pipeline:
//   Question -> Semantic Search -> RAG -> LLM -> Answer -> Sources
// and, for voice, an upstream Speech-to-Text stage and a downstream
// Text-to-Speech stage.
//
// In this prototype every function returns clearly-flagged mock data
// (`isMock: true`) after a simulated delay. Once a real backend exists,
// replace the body of each function with an `apiRequest(...)` call —
// the function signatures are designed to stay stable.

import { AIAnswer } from "@/types";
import { apiRequest, MOCK_MODE, mockDelay } from "./api";

const MOCK_ANSWER_TEXT =
  "This is a demo response generated for prototype purposes. When the retrieval-augmented generation pipeline is connected, this area will show an answer synthesized from Dr. Ambedkar's actual writings and speeches, grounded in the cited sources below. No verified quotation is shown here.";

export async function askQuestion(question: string): Promise<AIAnswer> {
  if (!MOCK_MODE) {
    try {
      return await apiRequest<AIAnswer>("/api/ai/ask", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
    } catch {
      // fall through to mock so the demo never dead-ends
    }
  }

  await mockDelay(1400);

  return {
    question,
    answer: MOCK_ANSWER_TEXT,
    isMock: true,
    generatedAt: new Date().toISOString(),
    sources: [
      {
        documentId: "doc-annihilation-of-caste",
        title: "Annihilation of Caste",
        author: "Dr. B. R. Ambedkar",
        publication: "Collected Works",
        volume: "Vol. 1",
        chapter: "Undelivered Address",
        page: 42,
        year: 1936,
        isMock: true,
      },
      {
        documentId: "doc-constituent-assembly-speech",
        title: "Constituent Assembly — Closing Speech",
        author: "Dr. B. R. Ambedkar",
        publication: "Constituent Assembly Debates",
        volume: "Vol. XI",
        page: 1,
        year: 1949,
        isMock: true,
      },
    ],
  };
}

// Speech-to-Text stage. In production this posts recorded audio to a
// Faster-Whisper (or similar) endpoint and returns a transcript.
export async function transcribeAudio(_audioBlob: Blob): Promise<string> {
  if (!MOCK_MODE) {
    try {
      const form = new FormData();
      form.append("audio", _audioBlob);
      return (
        await apiRequest<{ transcript: string }>("/api/ai/transcribe", {
          method: "POST",
          body: form,
          headers: {}, // let the browser set multipart boundary
        })
      ).transcript;
    } catch {
      // fall through to mock
    }
  }

  await mockDelay(1100);
  return "What was Ambedkar's role in drafting the Constitution?";
}

// Text-to-Speech stage. In production this returns an audio URL or stream
// for the answer text. The mock resolves to null so the UI can show a
// "voice playback unavailable in this demo" state.
export async function synthesizeSpeech(_text: string): Promise<string | null> {
  if (!MOCK_MODE) {
    try {
      const { audioUrl } = await apiRequest<{ audioUrl: string }>(
        "/api/ai/speak",
        { method: "POST", body: JSON.stringify({ text: _text }) }
      );
      return audioUrl;
    } catch {
      return null;
    }
  }
  await mockDelay(500);
  return null;
}
