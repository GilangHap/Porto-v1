import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import prisma from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function SettingsAdmin() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const settings = await prisma.siteSettings.findFirst();

  return <SettingsClient settings={settings} />;
}
