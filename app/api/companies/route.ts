// app/api/companies/route.ts
// GET /api/companies — list all companies derived from the jobs table (with static fallback)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobs as staticJobs } from "@/data/jobs";
import { getCompaniesFromJobs } from "@/lib/jobs";

export async function GET() {
  try {
    const companyGroups = await prisma.job.groupBy({
      by: ["company", "companySlug", "logo"],
      _count: { id: true },
      _avg: { companyRating: true },
      orderBy: { _count: { id: "desc" } },
    });

    const companies = companyGroups.map((g) => ({
      name: g.company,
      slug: g.companySlug,
      logo: g.logo,
      jobCount: g._count.id,
      rating: Math.round((g._avg.companyRating ?? 4) * 10) / 10,
    }));

    return NextResponse.json({ companies });
  } catch (error) {
    console.warn("GET /api/companies DB error, using static fallback:", error);
    const companies = getCompaniesFromJobs(staticJobs).map((c) => ({
      ...c,
      rating: 4.5,
    }));
    return NextResponse.json({ companies });
  }
}
