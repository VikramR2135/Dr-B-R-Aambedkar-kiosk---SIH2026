import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getDocumentById } from "@/services/archive";
import DocumentViewer from "@/components/DocumentViewer";

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const doc = await getDocumentById(params.id);
  if (!doc) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <Link href="/archive" className="focus-ring mb-8 inline-flex items-center gap-1 text-sm text-stone hover:text-navy">
        <ChevronLeft size={14} /> Back to archive
      </Link>
      <DocumentViewer doc={doc} />
    </div>
  );
}
