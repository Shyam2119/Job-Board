// app/api/profile/route.ts
// GET /api/profile?sessionId=  — get user profile
// PUT /api/profile             — upsert user profile (body includes sessionId)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ profile: null });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { sessionId },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ profile: null });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, ...data } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const profile = await prisma.userProfile.upsert({
      where: { sessionId },
      update: {
        fullName: data.fullName ?? undefined,
        email: data.email ?? undefined,
        phone: data.phone ?? undefined,
        city: data.city ?? undefined,
        linkedin: data.linkedin ?? undefined,
        portfolio: data.portfolio ?? undefined,
        headline: data.headline ?? undefined,
        about: data.about ?? undefined,
        skills: data.skills ?? undefined,
        experiences: data.experiences ?? undefined,
        education: data.education ?? undefined,
        certifications: data.certifications ?? undefined,
        preferences: data.preferences ?? undefined,
        resumeFileName: data.resumeFileName ?? undefined,
        resumeSize: data.resumeSize ?? undefined,
        resumeUploadedAt: data.resumeUploadedAt ?? undefined,
      },
      create: {
        sessionId,
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        city: data.city ?? "",
        linkedin: data.linkedin ?? "",
        portfolio: data.portfolio ?? "",
        headline: data.headline ?? "",
        about: data.about ?? "",
        skills: data.skills ?? [],
        experiences: data.experiences ?? [],
        education: data.education ?? [],
        certifications: data.certifications ?? [],
        preferences: data.preferences ?? {},
        resumeFileName: data.resumeFileName ?? "",
        resumeSize: data.resumeSize ?? "",
        resumeUploadedAt: data.resumeUploadedAt ?? "",
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
