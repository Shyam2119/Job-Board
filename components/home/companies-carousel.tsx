"use client";

import Image from "next/image";
import Link from "next/link";

interface Company {
  name: string;
  slug: string;
  logo: string;
}

interface CompaniesCarouselProps {
  companies: Company[];
}

export function CompaniesCarousel({ companies }: CompaniesCarouselProps) {
  const duplicated = [...companies, ...companies];

  return (
    <section className="overflow-hidden border-y border-border bg-card py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Featured Companies
        </p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-card to-transparent sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-card to-transparent sm:w-24" />
        <div className="flex animate-marquee gap-8 hover:[animation-play-state:paused]">
          {duplicated.map((company, i) => (
            <Link
              key={`${company.slug}-${i}`}
              href={`/companies/${company.slug}`}
              className="group flex shrink-0 flex-col items-center gap-2 rounded-xl border border-border bg-background px-6 py-4 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-lg border border-border object-cover transition-transform group-hover:scale-105"
                unoptimized
              />
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors group-hover:text-accent">
                {company.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
