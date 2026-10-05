// Shared domain types for the Ambedkar Digital Heritage Archive frontend.
// These describe the shape of data the UI expects, whether it arrives from
// mock fixtures (data/mock) or, later, from real backend services.

export type ArchiveCategory =
  | "Writings"
  | "Speeches"
  | "Books"
  | "Letters"
  | "Manuscripts"
  | "Photographs"
  | "Historical Documents"
  | "Constitutional Material";

export type Language = "English" | "Tamil" | "Hindi" | "Marathi";

export interface ArchiveDocument {
  id: string;
  title: string;
  category: ArchiveCategory;
  year: number;
  author: string;
  collection: string;
  volume?: string;
  chapter?: string;
  page?: number;
  language: Language;
  topic: string;
  description: string;
  thumbnail: string;
  pageCount?: number;
  isMock: true;
}

export interface SourceCitation {
  documentId: string;
  title: string;
  author: string;
  publication: string;
  volume?: string;
  chapter?: string;
  page?: number;
  year: number;
  isMock: true;
}

export interface AIAnswer {
  question: string;
  answer: string;
  sources: SourceCitation[];
  isMock: true;
  generatedAt: string;
}

export type TimelineCategory =
  | "Early Life"
  | "Education"
  | "Social Reform"
  | "Politics"
  | "Constitution"
  | "Religion"
  | "Legacy";

export interface TimelineEvent {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  category: TimelineCategory;
  description: string;
  relatedDocuments: string[];
  relatedPeople: string[];
  relatedPlaces: string[];
}

export type GraphNodeType =
  | "person"
  | "book"
  | "speech"
  | "organization"
  | "event"
  | "place"
  | "theme"
  | "center";

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  summary: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export type MediaCategory =
  | "Speeches"
  | "Interviews"
  | "Lectures"
  | "Documentaries"
  | "Historical Recordings";

export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  date: string;
  duration: string;
  description: string;
  thumbnail: string;
  kind: "audio" | "video";
  isMock: true;
}

export type ConnectionStatus = "connected" | "connecting" | "disconnected" | "error";

export interface AssistantPipelineStage {
  key: "listening" | "transcribing" | "searching" | "reasoning" | "answering";
  label: string;
}
