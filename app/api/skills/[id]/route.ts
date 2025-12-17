import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authenticated = await isAuthenticated();
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await request.json();

  const skill = await prisma.skill.update({
    where: { id },
    data: {
      name: data.name,
      category: data.category,
      description: data.description || null,
      icon: data.icon || null,
    },
  });

  return NextResponse.json(skill);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authenticated = await isAuthenticated();
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.skill.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
