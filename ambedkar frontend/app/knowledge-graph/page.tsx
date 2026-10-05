import KnowledgeGraph from "@/components/KnowledgeGraph";
import { getKnowledgeGraph } from "@/services/archive";

export default async function KnowledgeGraphPage() {
  const { nodes, edges } = await getKnowledgeGraph();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.14em] text-brass">Connections across the archive</p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Knowledge graph</h1>
        <p className="mt-3 text-[15px] text-stone">
          Discover connections between people, works, events, places and ideas
          surrounding Dr. Ambedkar. Click any node to explore.
        </p>
      </div>
      <div className="mt-12">
        <KnowledgeGraph nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}
