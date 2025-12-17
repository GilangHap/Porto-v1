import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(experiences);
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const maxOrder = await prisma.experience.aggregate({ _max: { order: true } });

  const experience = await prisma.experience.create({
    data: {
      title: data.title,
      company: data.company,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      isCurrent: data.isCurrent || false,
      order: (maxOrder._max.order || 0) + 1,
    },
  });

  return NextResponse.json(experience);
}
