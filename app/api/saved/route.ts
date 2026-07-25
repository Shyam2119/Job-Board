// app/api/saved/route.ts
// GET  /api/saved?sessionId=  — get saved job IDs for a session
// POST /api/saved             — toggle a saved job (save or unsave)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ savedIds: [] });
    }

    const saved = await prisma.savedJob.findMany({
      where: { sessionId },
      select: { jobId: true, savedAt: true },
      orderBy: { savedAt: "desc" },
    });

    return NextResponse.json({ savedIds: saved.map((s) => s.jobId) });
  } catch (error) {
    console.error("GET /api/saved error:", error);
    return NextResponse.json({ savedIds: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, sessionId } = body;

    if (!jobId || !sessionId) {
      return NextResponse.json(
        { error: "jobId and sessionId are required" },
        { status: 400 }
      );
    }

    // Toggle: if already saved → delete, else → create
    const existing = await prisma.savedJob.findUnique({
      where: { jobId_sessionId: { jobId, sessionId } },
    });

    if (existing) {
      await prisma.savedJob.delete({
        where: { jobId_sessionId: { jobId, sessionId } },
      });
      return NextResponse.json({ saved: false });
    } else {
      await prisma.savedJob.create({ data: { jobId, sessionId } });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error("POST /api/saved error:", error);
    return NextResponse.json(
      { error: "Failed to toggle saved job" },
      { status: 500 }
    );
  }
}
