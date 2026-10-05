// services/archive.ts
//
// Read access to the archive's structured content: documents, timeline
// events, the knowledge graph, and media items. Every function currently
// resolves mock fixtures from data/mock after a short simulated delay.
// Swap the body for an apiRequest(...) call once the real archive API
// (and, for the graph, a Neo4j-backed endpoint) is available — the
// return shapes are already the contract the UI expects.

import { ArchiveDocument, GraphEdge, GraphNode, MediaItem, TimelineEvent } from "@/types";
import { mockDocuments } from "@/data/mock/documents";
import { mockTimeline } from "@/data/mock/timeline";
import { mockGraphEdges, mockGraphNodes } from "@/data/mock/graph";
import { mockMedia } from "@/data/mock/media";
import { apiRequest, MOCK_MODE, mockDelay } from "./api";

export async function getDocuments(): Promise<ArchiveDocument[]> {
  if (!MOCK_MODE) {
    try {
      return await apiRequest<ArchiveDocument[]>("/api/archive/documents");
    } catch {
      /* fall through */
    }
  }
  await mockDelay(700);
  return mockDocuments;
}

export async function getDocumentById(id: string): Promise<ArchiveDocument | null> {
  if (!MOCK_MODE) {
    try {
      return await apiRequest<ArchiveDocument>(`/api/archive/documents/${id}`);
    } catch {
      /* fall through */
    }
  }
  await mockDelay(500);
  return mockDocuments.find((doc) => doc.id === id) ?? null;
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  if (!MOCK_MODE) {
    try {
      return await apiRequest<TimelineEvent[]>("/api/archive/timeline");
    } catch {
      /* fall through */
    }
  }
  await mockDelay(600);
  return mockTimeline;
}

export async function getKnowledgeGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  if (!MOCK_MODE) {
    try {
      return await apiRequest<{ nodes: GraphNode[]; edges: GraphEdge[] }>(
        "/api/archive/graph"
      );
    } catch {
      /* fall through */
    }
  }
  await mockDelay(800);
  return { nodes: mockGraphNodes, edges: mockGraphEdges };
}

export async function getMedia(): Promise<MediaItem[]> {
  if (!MOCK_MODE) {
    try {
      return await apiRequest<MediaItem[]>("/api/archive/media");
    } catch {
      /* fall through */
    }
  }
  await mockDelay(700);
  return mockMedia;
}

// Placeholder for a future backend-issued continuation link.
export async function getQrContinuationUrl(documentId: string): Promise<string> {
  if (!MOCK_MODE) {
    try {
      const { url } = await apiRequest<{ url: string }>(
        `/api/archive/documents/${documentId}/qr`
      );
      return url;
    } catch {
      /* fall through */
    }
  }
  await mockDelay(300);
  return `https://archive.ambedkar-heritage.example/continue/${documentId}`;
}
