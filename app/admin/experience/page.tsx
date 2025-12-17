import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

export default async function ExperienceAdmin() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return <ExperienceClient experiences={experiences} />;
}
