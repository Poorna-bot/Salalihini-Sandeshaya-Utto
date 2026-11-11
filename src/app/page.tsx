import React from "react";
import { getVerse } from "@/data";
import { VerseReader } from "@/components/VerseReader";

export default function HomePage() {
  const verse = getVerse(1)!;
  return <VerseReader verse={verse} />;
}
