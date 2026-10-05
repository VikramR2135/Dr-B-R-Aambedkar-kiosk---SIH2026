import { GraphEdge, GraphNode } from "@/types";

// DEMO GRAPH DATA — a small illustrative network for the prototype.
// Structured so a future Neo4j-backed service can supply the same shape
// (see services/archive.ts -> getKnowledgeGraph).

export const mockGraphNodes: GraphNode[] = [
  { id: "center", label: "Dr. B. R. Ambedkar", type: "center", summary: "Jurist, economist, social reformer, and principal architect of the Constitution of India.", x: 400, y: 300 },

  { id: "book-aoc", label: "Annihilation of Caste", type: "book", summary: "1936 undelivered address on the abolition of caste.", x: 190, y: 140 },
  { id: "book-bhd", label: "The Buddha and His Dhamma", type: "book", summary: "1957 study of Buddhist philosophy.", x: 620, y: 140 },
  { id: "book-shudras", label: "Who Were the Shudras?", type: "book", summary: "1946 historical enquiry.", x: 140, y: 300 },

  { id: "speech-mahad", label: "Mahad Satyagraha Address", type: "speech", summary: "1927 address on the right to draw water.", x: 220, y: 460 },
  { id: "speech-ca", label: "Constituent Assembly Closing Speech", type: "speech", summary: "1949 remarks on the Constitution's adoption.", x: 620, y: 460 },

  { id: "person-gandhi", label: "Mahatma Gandhi", type: "person", summary: "Negotiated the Poona Pact with Ambedkar in 1932.", x: 700, y: 300 },
  { id: "person-nehru", label: "Jawaharlal Nehru", type: "person", summary: "First Prime Minister of India; served alongside Ambedkar.", x: 720, y: 220 },

  { id: "org-drafting-committee", label: "Drafting Committee", type: "organization", summary: "The Constituent Assembly body Ambedkar chaired from 1947.", x: 470, y: 470 },
  { id: "org-buddhist-society", label: "Buddhist Society of India", type: "organization", summary: "Founded to support the mass conversion movement.", x: 560, y: 90 },

  { id: "event-poona-pact", label: "Poona Pact (1932)", type: "event", summary: "Agreement establishing reserved seats for depressed classes.", x: 640, y: 380 },
  { id: "event-conversion", label: "Conversion to Buddhism (1956)", type: "event", summary: "Mass conversion ceremony held in Nagpur.", x: 480, y: 110 },
  { id: "event-adoption", label: "Constitution Adopted (1949)", type: "event", summary: "The Constituent Assembly adopted the Constitution of India.", x: 540, y: 400 },

  { id: "place-mahad", label: "Mahad", type: "place", summary: "Site of the 1927 Satyagraha at Chavadar Tank.", x: 150, y: 400 },
  { id: "place-delhi", label: "New Delhi", type: "place", summary: "Seat of the Constituent Assembly and Ambedkar's later years.", x: 400, y: 480 },
  { id: "place-nagpur", label: "Nagpur", type: "place", summary: "Site of the 1956 conversion ceremony.", x: 330, y: 90 },

  { id: "theme-constitution", label: "Constitution of India", type: "theme", summary: "Central legal document Ambedkar helped draft.", x: 300, y: 470 },
  { id: "theme-social-reform", label: "Social Reform", type: "theme", summary: "Movement against caste discrimination.", x: 100, y: 220 },
  { id: "theme-education", label: "Education", type: "theme", summary: "Recurring theme in Ambedkar's philosophy and advocacy.", x: 260, y: 60 },
  { id: "theme-economics", label: "Economics", type: "theme", summary: "Ambedkar's academic training and early scholarly focus.", x: 130, y: 90 },
];

export const mockGraphEdges: GraphEdge[] = [
  { source: "center", target: "book-aoc" },
  { source: "center", target: "book-bhd" },
  { source: "center", target: "book-shudras" },
  { source: "center", target: "speech-mahad" },
  { source: "center", target: "speech-ca" },
  { source: "center", target: "person-gandhi" },
  { source: "center", target: "person-nehru" },
  { source: "center", target: "org-drafting-committee" },
  { source: "center", target: "org-buddhist-society" },
  { source: "center", target: "event-poona-pact" },
  { source: "center", target: "event-conversion" },
  { source: "center", target: "event-adoption" },
  { source: "center", target: "theme-constitution" },
  { source: "center", target: "theme-social-reform" },
  { source: "center", target: "theme-education" },
  { source: "center", target: "theme-economics" },

  { source: "speech-mahad", target: "place-mahad" },
  { source: "speech-mahad", target: "theme-social-reform" },
  { source: "event-poona-pact", target: "person-gandhi" },
  { source: "event-adoption", target: "place-delhi" },
  { source: "event-adoption", target: "org-drafting-committee" },
  { source: "event-adoption", target: "theme-constitution" },
  { source: "speech-ca", target: "org-drafting-committee" },
  { source: "speech-ca", target: "place-delhi" },
  { source: "event-conversion", target: "place-nagpur" },
  { source: "event-conversion", target: "org-buddhist-society" },
  { source: "book-bhd", target: "event-conversion" },
  { source: "book-aoc", target: "theme-social-reform" },
  { source: "book-shudras", target: "theme-social-reform" },
];
