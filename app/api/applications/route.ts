// app/api/applications/route.ts
// POST /api/applications — submit a job application
// GET  /api/applications — list applications (for recruiter dashboard)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, fullName, email, phone, coverLetter, resumeFile } = body;

    if (!jobId || !fullName || !email || !coverLetter) {
      return NextResponse.json(
        { error: "jobId, fullName, email, and coverLetter are required" },
        { status: 400 }
      );
    }

    // Verify job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        fullName,
        email,
        phone: phone ?? "",
        coverLetter,
        resumeFile: resumeFile ?? null,
      },
      include: { job: { select: { title: true, company: true } } },
    });

    // Increment applicant count on the job
    await prisma.job.update({
      where: { id: jobId },
      data: { applicantCount: { increment: 1 } },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const jobId = searchParams.get("jobId");
    const limit = parseInt(searchParams.get("limit") ?? "50");

    const applications = await prisma.application.findMany({
      where: jobId ? { jobId } : undefined,
      orderBy: { appliedAt: "desc" },
      take: limit,
      include: {
        job: { select: { id: true, title: true, company: true } },
      },
    });

    return NextResponse.json({ applications, total: applications.length });
  } catch (error) {
    console.error("GET /api/applications error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
