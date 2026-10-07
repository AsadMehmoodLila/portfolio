import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { links } from "@/data/site";

export function NutritionStory() {
  return (
    <section className="nutrition-story" aria-labelledby="nutrition-title">
      <div className="shell nutrition-grid">
        <div>

          <Reveal delay={0.05}><h2 id="nutrition-title">Nutrition answers<br />grounded in source material.</h2></Reveal>
        </div>
        <div className="nutrition-copy">
          <Reveal>
            <p>A retrieval-augmented system built to answer nutrition questions from a controlled knowledge source instead of relying only on a model’s memory. An educational prototype; outputs can be wrong and are not dietary or medical advice.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rag-flow" role="group" aria-label="Retrieval augmented generation flow">
              <span>Question</span><i />
              <span>Retrieve</span><i />
              <span>Ground</span><i />
              <span>Answer</span>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <a className="project-cta" href={links.nutritionDemo} target="_blank" rel="noreferrer">
              Watch the LinkedIn demo <ArrowUpRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
