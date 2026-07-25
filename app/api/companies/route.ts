// app/api/companies/route.ts
// GET /api/companies — list all companies derived from the jobs table

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Group jobs by company and aggregate counts
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
    console.error("GET /api/companies error:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
