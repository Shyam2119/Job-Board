import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/not-found-content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist on TalentFlow.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return <NotFoundContent />;
}
