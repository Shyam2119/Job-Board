"use client";

import Image from "next/image";
import Link from "next/link";
import { History } from "lucide-react";
import { useRecentlyViewedList } from "@/hooks/use-client-jobs";

export function RecentlyViewedSidebar() {
  const recent = useRecentlyViewedList();

  if (recent.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all">
      <div className="mb-4 flex items-center gap-2 font-semibold">
        <History className="h-4 w-4 text-accent" />
        Recently Viewed
      </div>
      <ul className="space-y-3">
        {recent.map((job) => (
          <li key={job.id}>
            <Link
              href={`/jobs/${job.id}`}
              className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <Image
                src={job.logo}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-md border border-border object-cover"
                unoptimized
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium group-hover:text-accent transition-colors">
                  {job.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {job.company}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
