"use client";

import { useSearchParams } from "next/navigation";
import { JobsListing } from "@/components/jobs/jobs-listing";

export function JobsListingShell() {
  const searchParams = useSearchParams();
  return <JobsListing key={searchParams.toString()} />;
}
