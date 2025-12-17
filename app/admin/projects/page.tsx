import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsAdmin() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  const parsedProjects = projects.map((project) => ({
    ...project,
    features: JSON.parse(project.features || "[]"),
    techStack: JSON.parse(project.techStack || "[]"),
    screenshots: JSON.parse(project.screenshots || "[]"),
  }));

  return <ProjectsClient projects={parsedProjects} />;
}
