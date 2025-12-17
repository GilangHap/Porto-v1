import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return NextResponse.json(skills);
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const maxOrder = await prisma.skill.aggregate({ _max: { order: true } });

  const skill = await prisma.skill.create({
    data: {
      name: data.name,
      category: data.category,
      description: data.description || null,
      icon: data.icon || null,
      order: (maxOrder._max.order || 0) + 1,
    },
  });

  return NextResponse.json(skill);
}
