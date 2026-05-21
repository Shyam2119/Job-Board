import { JobCardSkeleton } from "@/components/jobs/job-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

interface PageLoadingProps {
  variant?: "default" | "jobs" | "detail" | "form" | "simple";
}

export function PageLoading({ variant = "default" }: PageLoadingProps) {
  if (variant === "simple") {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 animate-pulse">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-48" />
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div className="mx-auto max-w-3xl animate-in px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mb-8 h-10 w-64" />
        <Skeleton className="h-[480px] w-full rounded-xl" />
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="hidden h-64 rounded-xl lg:block" />
        </div>
      </div>
    );
  }

  if (variant === "jobs") {
    return (
      <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mb-6 h-10 w-48" />
        <Skeleton className="mb-6 h-10 w-full max-w-xl" />
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Skeleton className="hidden h-80 rounded-xl lg:block" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl animate-in px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-4 h-12 w-72" />
      <Skeleton className="mb-8 h-6 w-96 max-w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
