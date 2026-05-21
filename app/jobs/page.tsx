import { Suspense } from "react";
import { JobsListing } from "@/components/jobs/jobs-listing";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Job Listings — Search & Filter Jobs",
  description:
    "Search and filter thousands of jobs by keyword, location, type, salary, and category. Updated daily.",
  path: "/jobs",
});

function JobsListingFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">
      Loading jobs...
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsListingFallback />}>
      <JobsListing />
    </Suspense>
  );
}
