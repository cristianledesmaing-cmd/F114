import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Systems } from "@/components/sections/Systems";
import { Team } from "@/components/sections/Team";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Studio />
      <Services />
      <ProjectsShowcase />
      <Systems />
      <Team />
      <ContactSection />
    </>
  );
}
