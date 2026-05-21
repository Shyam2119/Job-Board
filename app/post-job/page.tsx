import { PostJobForm } from "@/components/jobs/post-job-form";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Post a Job — Reach Top Talent",
  description:
    "List your job opening for free and connect with thousands of qualified candidates.",
  path: "/post-job",
});

export default function PostJobPage() {
  return (
    <div className="mx-auto max-w-3xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Post a Job</h1>
        <p className="mt-2 text-muted-foreground">
          Fill out the form below to list your opening. Listings are saved locally
          and appear alongside our featured jobs.
        </p>
      </div>
      <PostJobForm />
    </div>
  );
}
