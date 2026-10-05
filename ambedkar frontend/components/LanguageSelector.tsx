"use client";

import { useState, useRef, useEffect } from "react";
import { Languages, Check } from "lucide-react";
import { Language } from "@/types";
import { cn } from "@/lib/utils";

const LANGUAGES: Language[] = ["English", "Tamil", "Hindi", "Marathi"];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Language>("English");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-sm text-ink-soft transition-colors hover:bg-ink/5"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages size={16} strokeWidth={1.75} />
        <span>{selected}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-40 mt-2 w-40 rounded-sm border border-ink/10 bg-parchment-light shadow-[0_8px_24px_rgba(23,19,16,0.12)]"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={selected === lang}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-ink/5",
                selected === lang ? "text-navy font-medium" : "text-ink-soft"
              )}
            >
              {lang}
              {selected === lang && <Check size={14} />}
              {lang !== "English" && selected !== lang && (
                <span className="text-[10px] text-stone-light">Coming soon</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
