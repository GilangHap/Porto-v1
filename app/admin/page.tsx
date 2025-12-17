import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
