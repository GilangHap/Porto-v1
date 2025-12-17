import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const about = await prisma.about.findFirst();
  return NextResponse.json(about);
}

export async function PUT(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  let about = await prisma.about.findFirst();

  if (about) {
    about = await prisma.about.update({
      where: { id: about.id },
      data: {
        summary: data.summary,
        education: data.education,
        focusAreas: JSON.stringify(data.focusAreas || []),
        internship: data.internship,
      },
    });
  } else {
    about = await prisma.about.create({
      data: {
        id: "main-about",
        summary: data.summary,
        education: data.education,
        focusAreas: JSON.stringify(data.focusAreas || []),
        internship: data.internship,
      },
    });
  }

  return NextResponse.json(about);
}
