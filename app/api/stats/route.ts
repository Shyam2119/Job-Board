// app/api/stats/route.ts
// GET /api/stats — returns platform statistics for the hero/stats section

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [jobCount, companyCount, applicationCount] = await Promise.all([
      prisma.job.count(),
      prisma.job.groupBy({ by: ["companySlug"] }).then((r) => r.length),
      prisma.application.count(),
    ]);

    return NextResponse.json({
      jobs: jobCount,
      companies: companyCount,
      seekers: Math.max(applicationCount * 40, 1000), // estimated seekers
      placements: Math.max(Math.floor(applicationCount * 0.3), 500),
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
