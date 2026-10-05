import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-parchment-dark/40">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-base text-ink">Ambedkar Digital Heritage Archive</p>
            <p className="mt-2 max-w-xs text-sm text-stone">
              A software prototype exploring how AI can make historical archives more
              accessible for research and public engagement.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-ink-soft">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-stone">
              <li><Link className="hover:text-navy" href="/archive">Digital Archive</Link></li>
              <li><Link className="hover:text-navy" href="/timeline">Timeline</Link></li>
              <li><Link className="hover:text-navy" href="/knowledge-graph">Knowledge Graph</Link></li>
              <li><Link className="hover:text-navy" href="/media">Media Archive</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-medium text-ink-soft">Project</p>
            <ul className="mt-3 space-y-2 text-sm text-stone">
              <li><Link className="hover:text-navy" href="/about">About this prototype</Link></li>
              <li><Link className="hover:text-navy" href="/assistant">Ask Ambedkar AI</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-medium text-ink-soft">Status</p>
            <p className="mt-3 text-sm text-stone">
              Software-only prototype, built for demonstration. Content marked
              "demo" is placeholder data pending real archive integration.
            </p>
          </div>
        </div>
        <div className="rule my-8" />
        <p className="text-xs text-stone-light">
          Built as an SIH software prototype. Historical dates and milestones reflect
          widely documented public record; document text is not reproduced.
        </p>
      </div>
    </footer>
  );
}
