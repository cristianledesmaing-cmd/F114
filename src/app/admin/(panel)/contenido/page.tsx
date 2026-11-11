import { HomeForm } from "@/app/admin/_components/HomeForm";
import { getHomeContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Textos e imágenes" };

export default async function AdminContentPage() {
  const home = await getHomeContent();

  return <HomeForm home={home} />;
}
