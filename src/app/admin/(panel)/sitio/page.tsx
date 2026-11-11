import { SiteForm } from "@/app/admin/_components/SiteForm";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Datos del sitio" };

export default async function AdminSitePage() {
  const site = await getSiteContent();

  return <SiteForm site={site} />;
}
