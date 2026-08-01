import { Navigation } from "@/components/navigation";
import { AboutFooter } from "@/components/sections/about-footer";
import { Certificates } from "@/components/sections/certificates";
import { EmotionStory } from "@/components/sections/emotion-story";
import { Hero } from "@/components/sections/hero";
import { NutritionStory } from "@/components/sections/nutrition-story";
import { RobloxStory } from "@/components/sections/roblox-story";
import { Skills } from "@/components/sections/skills";
import { StudyBuddyStory } from "@/components/sections/study-buddy-story";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <RobloxStory />
        <StudyBuddyStory />
        <EmotionStory />
        <NutritionStory />
        <Certificates />
        <Skills />
        <AboutFooter />
      </main>
    </>
  );
}
