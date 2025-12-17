import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

async function getData() {
  const [settings, about, skills, projects, experiences] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.about.findFirst(),
    prisma.skill.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
    prisma.experience.findMany({
      where: { isVisible: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return { settings, about, skills, projects, experiences };
}

export default async function Home() {
  const { settings, about, skills, projects, experiences } = await getData();

  // Parse JSON fields from database
  const parsedAbout = about
    ? {
        ...about,
        focusAreas: JSON.parse(about.focusAreas || "[]"),
      }
    : undefined;

  const parsedProjects = projects.map((project) => ({
    ...project,
    features: JSON.parse(project.features || "[]"),
    techStack: JSON.parse(project.techStack || "[]"),
    screenshots: JSON.parse(project.screenshots || "[]"),
  }));

  const settingsData = settings
    ? {
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        heroDescription: settings.heroDescription,
        email: settings.email,
        github: settings.github,
        linkedin: settings.linkedin,
        whatsapp: settings.whatsapp,
      }
    : undefined;

  return (
    <>
      <Navbar githubUrl={settings?.github ? `https://github.com/${settings.github}` : undefined} />
      
      <main>
        <Hero settings={settingsData} />
        <About about={parsedAbout} />
        <Skills skills={skills} />
        <Projects projects={parsedProjects} />
        <Experience experiences={experiences} />
        <Contact settings={settingsData} />
      </main>

      <Footer settings={settingsData} />
    </>
  );
}
