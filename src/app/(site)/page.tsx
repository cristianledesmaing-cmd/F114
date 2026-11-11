import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { getHomeContent, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [home, site] = await Promise.all([getHomeContent(), getSiteContent()]);

  return (
    <>
      <Hero hero={home.hero} site={site} />
      <Services section={home.servicesSection} services={home.services} site={site} />
      <Process section={home.processSection} steps={home.processSteps} />
      <Team section={home.teamSection} members={home.team} />
      <ContactSection section={home.contactSection} services={home.services} site={site} />
    </>
  );
}
