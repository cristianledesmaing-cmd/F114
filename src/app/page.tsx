import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Team />
      <ContactSection />
    </>
  );
}
