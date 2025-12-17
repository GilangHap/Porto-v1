import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Get max order
    const maxOrder = await prisma.project.aggregate({
      _max: { order: true },
    });

    const project = await prisma.project.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        overview: data.overview,
        role: data.role,
        features: JSON.stringify(data.features || []),
        techStack: JSON.stringify(data.techStack || []),
        screenshots: JSON.stringify(data.screenshots || []),
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        order: (maxOrder._max.order || 0) + 1,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
