"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "@/components/LanguageSelector";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/archive", label: "Digital Archive" },
  { href: "/timeline", label: "Timeline" },
  { href: "/knowledge-graph", label: "Knowledge Graph" },
  { href: "/media", label: "Media Archive" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-parchment/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 focus-ring rounded-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/40 text-navy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          </span>
          <span className="font-serif text-[15px] leading-tight tracking-tight">
            <span className="block text-ink">Ambedkar</span>
            <span className="block text-[11px] font-sans text-stone -mt-0.5">Digital Heritage Archive</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "focus-ring relative rounded-sm px-3 py-2 text-[13.5px] transition-colors",
                  active ? "text-navy" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-navy" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="focus-ring rounded-sm p-2 text-ink-soft transition-colors hover:bg-ink/5"
            aria-label="Search the archive"
            aria-expanded={searchOpen}
          >
            <Search size={18} strokeWidth={1.75} />
          </button>
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <button
            className="focus-ring rounded-sm p-2 text-ink-soft transition-colors hover:bg-ink/5 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink/10 bg-parchment-light px-5 py-3 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <Search size={16} className="text-stone" />
            <input
              autoFocus
              type="text"
              placeholder="Search writings, speeches, documents, photographs…"
              className="focus-ring w-full bg-transparent py-1 text-sm text-ink placeholder:text-stone/70 focus:outline-none"
            />
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="border-t border-ink/10 bg-parchment-light px-5 py-3 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-sm px-2 py-2.5 text-sm",
                    pathname === link.href ? "font-medium text-navy" : "text-ink-soft"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-ink/10 pt-3 sm:hidden">
            <LanguageSelector />
          </div>
        </nav>
      )}
    </header>
  );
}
