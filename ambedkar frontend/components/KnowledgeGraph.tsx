"use client";

import { useState } from "react";
import { GraphEdge, GraphNode, GraphNodeType } from "@/types";
import { X } from "lucide-react";

const TYPE_COLOR: Record<GraphNodeType, string> = {
  center: "#102A4C",
  book: "#A8783B",
  speech: "#6B6459",
  person: "#1E4272",
  organization: "#7A6A4F",
  event: "#8B5E34",
  place: "#5A6B5C",
  theme: "#102A4C",
};

const TYPE_LABEL: Record<GraphNodeType, string> = {
  center: "Central figure",
  book: "Book",
  speech: "Speech",
  person: "Person",
  organization: "Organization",
  event: "Historical event",
  place: "Place",
  theme: "Theme",
};

export default function KnowledgeGraph({
  nodes,
  edges,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
}) {
  const [activeId, setActiveId] = useState<string | null>("center");
  const active = nodes.find((n) => n.id === activeId) ?? null;
  const nodeById = (id: string) => nodes.find((n) => n.id === id);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="overflow-x-auto rounded-sm border border-ink/10 bg-parchment-light">
        <svg viewBox="0 0 820 540" className="h-[520px] w-full min-w-[680px]" role="img" aria-label="Knowledge graph of Dr. Ambedkar's works, people, events and themes">
          {edges.map((edge, i) => {
            const s = nodeById(edge.source);
            const t = nodeById(edge.target);
            if (!s || !t) return null;
            const dimmed = activeId && activeId !== edge.source && activeId !== edge.target;
            return (
              <line
                key={i}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke="#171310"
                strokeOpacity={dimmed ? 0.06 : 0.22}
                strokeWidth={1}
              />
            );
          })}

          {nodes.map((node) => {
            const isActive = node.id === activeId;
            const isCenter = node.type === "center";
            const radius = isCenter ? 30 : 16;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => setActiveId(node.id)}
              >
                <circle
                  r={radius}
                  fill={isActive ? TYPE_COLOR[node.type] : "#FAF7EE"}
                  stroke={TYPE_COLOR[node.type]}
                  strokeWidth={isActive ? 2.5 : 1.4}
                />
                <text
                  y={radius + 14}
                  textAnchor="middle"
                  fontSize={isCenter ? 12.5 : 10.5}
                  fill="#3A342C"
                  className="select-none"
                >
                  {node.label.length > 22 ? node.label.slice(0, 21) + "…" : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <aside className="h-fit rounded-sm border border-ink/10 bg-parchment-light p-6">
        {active ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <span
                className="rounded-sm px-2 py-0.5 text-[11px] text-parchment-light"
                style={{ backgroundColor: TYPE_COLOR[active.type] }}
              >
                {TYPE_LABEL[active.type]}
              </span>
              <button onClick={() => setActiveId(null)} className="focus-ring rounded-sm p-1 text-stone hover:bg-ink/5" aria-label="Clear selection">
                <X size={14} />
              </button>
            </div>
            <h3 className="mt-3 font-serif text-xl text-ink">{active.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{active.summary}</p>

            <div className="mt-5">
              <p className="text-[12px] font-medium text-ink-soft">Connected to</p>
              <ul className="mt-2 space-y-1">
                {edges
                  .filter((e) => e.source === active.id || e.target === active.id)
                  .map((e) => {
                    const otherId = e.source === active.id ? e.target : e.source;
                    const other = nodeById(otherId);
                    if (!other) return null;
                    return (
                      <li key={otherId}>
                        <button
                          onClick={() => setActiveId(otherId)}
                          className="focus-ring text-left text-[13px] text-navy underline decoration-dotted underline-offset-2"
                        >
                          {other.label}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-sm text-stone">Select a node to see its details and connections.</p>
        )}
        <p className="mt-6 text-[11px] text-stone-light">
          Demo graph data for the prototype. Structured to accept a live Neo4j-backed
          service later.
        </p>
      </aside>
    </div>
  );
}
