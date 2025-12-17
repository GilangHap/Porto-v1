import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Try to find existing settings
    let settings = await prisma.siteSettings.findFirst();

    if (settings) {
      // Update existing
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroDescription: data.heroDescription,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          whatsapp: data.whatsapp,
        },
      });
    } else {
      // Create new
      settings = await prisma.siteSettings.create({
        data: {
          id: "main-settings",
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroDescription: data.heroDescription,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          whatsapp: data.whatsapp,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
