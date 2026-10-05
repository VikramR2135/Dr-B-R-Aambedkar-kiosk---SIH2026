import Link from "next/link";
import ErrorState from "@/components/ErrorState";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <ErrorState kind="document-unavailable" />
      <Link href="/archive" className="focus-ring mt-6 inline-block text-sm text-navy underline decoration-dotted underline-offset-4">
        Return to the archive
      </Link>
    </div>
  );
}
