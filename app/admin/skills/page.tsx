import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import SkillsClient from "./SkillsClient";

export default async function SkillsAdmin() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return <SkillsClient skills={skills} />;
}
