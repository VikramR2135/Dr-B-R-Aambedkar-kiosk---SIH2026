import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="focus-ring group flex flex-col justify-between rounded-sm border border-ink/10 bg-parchment-light p-6 transition-colors hover:border-navy/30"
    >
      <div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/25 text-navy">
          <Icon size={17} strokeWidth={1.6} />
        </span>
        <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-stone">{description}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-[13px] text-navy opacity-0 transition-opacity group-hover:opacity-100">
        Explore <ArrowRight size={13} />
      </span>
    </Link>
  );
}
