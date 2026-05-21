import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 animate-in">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none space-y-4 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
