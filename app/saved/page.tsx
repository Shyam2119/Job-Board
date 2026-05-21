import { SavedJobsList } from "@/components/jobs/saved-jobs-list";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Saved Jobs — Your Bookmarks",
  description: "Review jobs you've bookmarked for later.",
  path: "/saved",
  noIndex: true,
});

export default function SavedJobsPage() {
  return (
    <div className="mx-auto max-w-4xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
        <p className="mt-2 text-muted-foreground">
          Jobs you&apos;ve bookmarked for later review.
        </p>
      </div>
      <SavedJobsList />
    </div>
  );
}
