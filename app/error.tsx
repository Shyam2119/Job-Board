"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center animate-in sm:py-24">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 dark:text-red-400">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        We hit an unexpected error. Try again or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
