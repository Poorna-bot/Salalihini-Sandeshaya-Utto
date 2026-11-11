import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getVerse, parseVerseNumber, TOTAL_VERSES } from "@/data";
import { VerseReader } from "@/components/VerseReader";

export function generateStaticParams() {
  return Array.from({ length: TOTAL_VERSES - 1 }, (_, i) => ({
    n: String(i + 2)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n: raw } = await params;
  const num = parseVerseNumber(raw);
  if (!num) {
    return { title: "Verse Not Found" };
  }
  const verse = getVerse(num);
  if (!verse) {
    return { title: "Verse Not Found" };
  }
  const title = `Verse ${verse.n} · ${verse.section.en}`;
  return {
    title,
    description: verse.en,
    alternates: {
      canonical: verse.n === 1 ? "/" : `/verse/${verse.n}`
    },
    openGraph: {
      title: `${title} · Salalihini Sandeshaya`,
      description: verse.en
    }
  };
}

async function VerseResolver({
  params
}: {
  params: Promise<{ n: string }>;
}) {
  const { n: raw } = await params;
  const num = parseVerseNumber(raw);
  if (num === null) {
    notFound();
  }
  if (num === 1) {
    redirect("/");
  }
  const verse = getVerse(num);
  if (!verse) {
    notFound();
  }
  return <VerseReader verse={verse} />;
}

export default function VersePage({
  params
}: {
  params: Promise<{ n: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-ink-soft">
          Loading verse…
        </div>
      }
    >
      <VerseResolver params={params} />
    </Suspense>
  );
}
