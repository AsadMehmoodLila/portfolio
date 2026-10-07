import { ArrowUpRight, ArrowVertical, GithubIcon } from "@/components/ui/icons";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/data/site";

export function AboutFooter() {
  return (
    <>
      <section id="about" className="about-section shell" aria-labelledby="about-title">
        <div className="about-grid">
          <Reveal>
            <h2 id="about-title">A developer,
still learning</h2>
          </Reveal>
          <div className="about-copy">
            <Reveal delay={0.08}>
              <p>I’m studying Artificial Intelligence at UMT and building across AI applications, Roblox game systems, and practical software projects. The common thread is simple: take an idea far enough that somebody else can actually use it.</p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>I’m currently looking for internships where I can learn from a real team, improve my engineering judgement, and contribute work that reaches users.</p>
            </Reveal>
            <Reveal delay={0.18}>
              <dl className="about-facts">
                <div><dt>Based in</dt><dd>{site.location}</dd></div>
                <div><dt>Education</dt><dd>{site.degree}, UMT</dd></div>
                <div><dt>Focus</dt><dd>AI products · games · software</dd></div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <Reveal>
            <h2>Have a role or
project in mind?</h2>
          </Reveal>
          <div className="footer-actions">
            <a href={`mailto:${site.email}`} className="text-link">Email Asad <ArrowUpRight /></a>
            <MagneticLink className="button button-primary footer-button" href={site.github} target="_blank" rel="noreferrer">
              <GithubIcon /> Explore my GitHub <ArrowUpRight />
            </MagneticLink>
            <a href="#top" className="text-link">Back to top <ArrowVertical direction="up" /></a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 {site.name}</span>
            <strong>{site.domain}</strong>
            <span>Individual portfolio · No online sales</span>
          </div>
        </div>
      </footer>
    </>
  );
}
