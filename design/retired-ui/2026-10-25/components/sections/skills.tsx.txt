import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/site";

export function Skills() {
  const visualTools = [
    ["Roblox Studio", "robloxstudio"], ["Lua", "lua"], ["Python", "python"],
    ["TensorFlow", "tensorflow"], ["OpenCV", "opencv"], ["FastAPI", "fastapi"],
    ["Streamlit", "streamlit"], ["SQLite", "sqlite"], ["JavaScript", "javascript"],
    ["Git", "git"], ["GitHub", "github"], ["Rider", "rider"],
  ];
  return (
    <section id="skills" className="skills-section shell" aria-label="Working skills">
      <SectionHeading
        title="Tools I work with"
        body="Technologies used across my academic projects, applications, and game development."
      />
      <ul className="tool-wall" aria-label="Development tools">{visualTools.map(([name, slug]) => <li key={slug}><span className="tool-mark" aria-hidden="true" style={{ maskImage: `url(/icons/tools/${slug}.svg)`, WebkitMaskImage: `url(/icons/tools/${slug}.svg)` }} /><span>{name}</span></li>)}</ul>
      <div className="skill-groups">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.05}>
            <article className="skill-group">
              <div className="skill-group-title">
                <h3>{group.title}</h3>
              </div>
              <div className="skill-grid">
                {group.skills.map((skill) => (
                  <div key={skill} className="skill-item"><span>{skill}</span></div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
