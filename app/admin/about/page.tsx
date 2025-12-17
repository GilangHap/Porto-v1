import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AboutClient from "./AboutClient";

export default async function AboutAdmin() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const about = await prisma.about.findFirst();
  const parsedAbout = about ? { ...about, focusAreas: JSON.parse(about.focusAreas || "[]") } : null;

  return <AboutClient about={parsedAbout} />;
}
