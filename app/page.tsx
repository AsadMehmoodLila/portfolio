import { LegalFooter } from "@/components/legal-footer";
import { Navigation } from "@/components/navigation";
import { AboutFooter } from "@/components/sections/about-footer";
import { Certificates } from "@/components/sections/certificates";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <Certificates />
        <Skills />
        <AboutFooter />
      </main>
      <LegalFooter />
    </>
  );
}
