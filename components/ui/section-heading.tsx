import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeading({ title, body }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <Reveal delay={0.05}>
        <h2>{title}</h2>
      </Reveal>
      {body ? (
        <Reveal delay={0.1}>
          <p className="section-intro">{body}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
