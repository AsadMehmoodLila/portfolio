import type { Work } from "@/data/portfolio";

export function WorkFacts({ project }: { project: Work }) {
  if (!project.facts?.length) return null;
  return (
    <div className="work-reach">
      <dl className="work-facts">
        {project.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>
              <a href={fact.source} target="_blank" rel="noopener noreferrer">
                {fact.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
      {project.verifiedOn && (
        <p className="work-verified">
          Roblox figures · <time dateTime={project.verifiedOn}>2 November 2026</time>
        </p>
      )}
    </div>
  );
}
