import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/site";

export function Skills() {
  return (
    <section id="skills" className="skills-section shell" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="Working stack"
        title="Tools I have used to make real systems."
        body="No percentages. No made-up mastery bars. Just the technologies that appear in the work above."
      />
      <div className="skill-groups">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.05}>
            <article className="skill-group">
              <div className="skill-group-title">
                <span>0{groupIndex + 1}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="skill-grid">
                {group.skills.map((skill) => (
                  <div key={skill} className="skill-item"><i>{skill.slice(0, 2).toUpperCase()}</i><span>{skill}</span></div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
