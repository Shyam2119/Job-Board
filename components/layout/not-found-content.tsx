import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundContentProps {
  title?: string;
  description?: string;
  showHome?: boolean;
}

export function NotFoundContent({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or may have been moved.",
  showHome = true,
}: NotFoundContentProps) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center animate-in sm:px-6">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-accent">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {showHome && (
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
