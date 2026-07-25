// app/api/jobs/route.ts
// GET  /api/jobs   — list jobs with optional filters from Neon DB (with static fallback)
// POST /api/jobs   — create a new job (post-a-job form)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { jobs as staticJobs } from "@/data/jobs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const q = searchParams.get("q") ?? "";
    const category = searchParams.get("category") ?? "";
    const workMode = searchParams.get("workMode") ?? "";
    const type = searchParams.get("type") ?? "";
    const experience = searchParams.get("experience") ?? "";
    const industry = searchParams.get("industry") ?? "";
    const salaryMin = searchParams.get("salaryMin");
    const salaryMax = searchParams.get("salaryMax");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = limit ? parseInt(limit) : 12;

    const where: Prisma.JobWhereInput = {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { company: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { skills: { has: q } },
              ],
            }
          : {},
        category ? { category: { equals: category, mode: "insensitive" } } : {},
        workMode ? { workMode: { equals: workMode, mode: "insensitive" } } : {},
        type ? { type: { equals: type, mode: "insensitive" } } : {},
        experience ? { experience: { equals: experience, mode: "insensitive" } } : {},
        industry ? { industry: { equals: industry, mode: "insensitive" } } : {},
        salaryMin ? { salaryMin: { gte: parseFloat(salaryMin) } } : {},
        salaryMax ? { salaryMax: { lte: parseFloat(salaryMax) } } : {},
        featured === "true" ? { featured: true } : {},
      ],
    };

    const [total, jobs] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        orderBy: [{ featured: "desc" }, { postedDate: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({
      jobs,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.warn("GET /api/jobs DB fetch error, using static fallback:", error);

    // Fallback to static seed data if database connection is unavailable
    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q")?.toLowerCase() ?? "";
    const category = searchParams.get("category")?.toLowerCase() ?? "";

    let filtered = staticJobs;
    if (q) {
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }
    if (category) {
      filtered = filtered.filter((j) => j.category.toLowerCase() === category);
    }

    return NextResponse.json({
      jobs: filtered,
      total: filtered.length,
      page: 1,
      pageSize: filtered.length,
      totalPages: 1,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      company,
      companySlug,
      logo,
      location,
      city,
      salary,
      salaryMin,
      salaryMax,
      type,
      category,
      description,
      requirements,
      skills,
      experience,
      workMode,
      industry,
      noticePeriod,
    } = body;

    if (!title || !company || !description) {
      return NextResponse.json(
        { error: "title, company, and description are required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        companySlug:
          companySlug ?? company.toLowerCase().replace(/\s+/g, "-"),
        logo:
          logo ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=1e3a5f&color=38bdf8&bold=true`,
        location: location ?? "",
        city: city ?? location ?? "",
        salary: salary ?? "",
        salaryMin: salaryMin ? parseFloat(salaryMin) : 0,
        salaryMax: salaryMax ? parseFloat(salaryMax) : 0,
        type: type ?? "full-time",
        description,
        requirements: Array.isArray(requirements)
          ? requirements
          : typeof requirements === "string"
          ? requirements.split("\n").filter(Boolean)
          : [],
        skills: Array.isArray(skills) ? skills : [],
        category: category ?? "Tech",
        experience: experience ?? "mid",
        workMode: workMode ?? "onsite",
        industry: industry ?? "IT",
        noticePeriod: noticePeriod ?? "1-month",
        isSeeded: false,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
