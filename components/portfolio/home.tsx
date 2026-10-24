import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  Code,
  GameController,
  DiscordLogo,
  Stack,
  Sword,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import {
  featuredSlug,
  identity,
  process,
  publishedWork,
  questions,
  services,
} from "@/data/portfolio";
import { CharacterStage } from "@/components/portfolio/character-stage";
import { AnimatedFaq } from "@/components/portfolio/animated-faq";
import { ProfileCards } from "@/components/portfolio/profile-cards";

const icons = { sword: Sword, stack: Stack, flow: TreeStructure };

export function PortfolioHome() {
  const featured =
    publishedWork.find((item) => item.slug === featuredSlug) ??
    publishedWork[0];
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-status">
            <GameController size={17} weight="duotone" aria-hidden />
            <span>ScriptLilla / Roblox scripter</span>
          </div>
          <h1 id="hero-title">
            Your game
            <br />
            <span>Built to play</span>
          </h1>
          <p>
            Combat, player data and game loops for Roblox. Built around your
            idea, with source code and a clear handover.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/contact/" prefetch={false}>
              Start a project <ArrowUpRight size={19} aria-hidden />
            </Link>
            <a className="link-action" href="#work">
              Explore the work <ArrowRight size={18} aria-hidden />
            </a>
          </div>
          <div className="hero-availability">
            <span aria-hidden />
            {identity.availability}
          </div>
        </div>
        <div className="hero-visual">
          <CharacterStage />
        </div>
      </section>
      <nav
        className="system-dock shell"
        aria-label="Discuss a scripting service"
      >
        <div>
          <span className="dock-symbol" aria-hidden>
            <BracketsCurly size={26} />
          </span>
          <span>
            Choose your
            <br />
            <strong>next system</strong>
          </span>
        </div>
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <Link
              key={service.id}
              href={`/contact/?service=${service.id}`}
              prefetch={false}
            >
              <Icon size={26} weight="duotone" aria-hidden />
              <span>{service.title}</span>
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          );
        })}
      </nav>

      <section
        id="services"
        className="services-section section shell"
        aria-labelledby="services-title"
      >
        <div className="section-heading">
          <h2 id="services-title">
            Pick the system
            <br />
            <span>Make it yours</span>
          </h2>
          <p>
            A focused mechanic or an integration with your existing game. We
            define what needs to work before the build begins.
          </p>
        </div>
        <div className="service-list">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.id}
                className={`service service-${service.id}`}
              >
                <div className="service-title">
                  <Icon size={38} weight="duotone" aria-hidden />
                  <h3>{service.title}</h3>
                </div>
                <p>{service.description}</p>
                <ul>
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="service-bottom">
                  <span>{service.deliverable}</span>
                  <Link
                    href={`/contact/?service=${service.id}`}
                    prefetch={false}
                    className="icon-button"
                    aria-label={`Discuss ${service.title}`}
                  >
                    <ArrowUpRight size={20} aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="integration-note">
          <Code size={22} aria-hidden />
          <p>
            Already have the game or the UI? I can help connect the pieces,
            assess an existing system or scope a focused fix.
          </p>
        </div>
      </section>

      <section
        id="work"
        className="work-section section shell"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <h2 id="work-title">
            Out of the editor
            <br />
            <span>Into the game</span>
          </h2>
          <p>
            A closer look at the game, the scripting role and the systems that
            connect it.
          </p>
        </div>
        <div
          className={`work-grid ${publishedWork.length === 1 ? "single-work" : ""}`}
        >
          {[
            ...(featured ? [featured] : []),
            ...publishedWork.filter((item) => item.slug !== featured?.slug),
          ].map((project, index) => (
            <article
              key={project.slug}
              className={`work-card${index === 0 ? " work-card-featured" : ""}`}
            >
              <Link
                className="work-card-image"
                href={`/work/${project.slug}/`}
                prefetch={false}
              >
                {project.media.poster ? (
                  <img
                    src={project.media.poster}
                    width={1280}
                    height={720}
                    alt={project.media.alt}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-cover" aria-hidden>
                    <BracketsCurly size={80} weight="duotone" />
                  </div>
                )}
              </Link>
              <div className="work-card-copy">
                <span className="work-type">{project.type}</span>
                <h3>
                  <Link href={`/work/${project.slug}/`} prefetch={false}>
                    {project.title}
                  </Link>
                </h3>
                <p>{project.summary}</p>
                <div className="project-role">
                  <span>My contribution</span>
                  <p>{project.role.join(", ")}</p>
                </div>
                <Link
                  href={`/work/${project.slug}/`}
                  prefetch={false}
                  className="link-action"
                >
                  View project <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="process"
        className="process-section section"
        aria-labelledby="process-title"
      >
        <div className="shell process-layout">
          <div className="section-heading">
            <h2 id="process-title">
              From first brief
              <br />
              to final build
            </h2>
            <p>
              You should know what is being made, what you receive and how the
              work is progressing.
            </p>
          </div>
          <ol className="process-list">
            {process.map((step, index) => (
              <li key={step.title}>
                <span className="process-number" aria-hidden>
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="about"
        className="about-section section shell"
        aria-labelledby="about-title"
      >
        <div className="about-identity">
          <div className="about-monogram profile-portrait">
            <img
              src="/media/scriptlilla-portrait.webp"
              alt="ScriptLilla's illustrated avatar wearing a green plaid cap and black jacket"
              width={720}
              height={720}
              loading="lazy"
            />
          </div>
          <span>{identity.name}</span>
          <strong>@{identity.handle}</strong>
          <a
            className="link-action"
            href={identity.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join my Discord <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
        <div className="about-copy">
          <h2 id="about-title">
            The scripter
            <br />
            behind the systems
          </h2>
          <ProfileCards />
          <div className="tools-strip" aria-label="Working tools">
            {[
              ["robloxstudio", "Roblox Studio"],
              ["lua", "Luau"],
              ["git", "Git"],
              ["github", "GitHub"],
            ].map(([slug, name]) => (
              <span key={slug}>
                <span
                  className="tool-logo"
                  aria-hidden
                  style={{
                    maskImage: `url(/icons/tools/${slug}.svg)`,
                    WebkitMaskImage: `url(/icons/tools/${slug}.svg)`,
                  }}
                />
                {name}
              </span>
            ))}
          </div>
          <Link href="/about/" className="link-action" prefetch={false}>
            More about me <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      <section
        id="faq"
        className="faq-section section shell"
        aria-labelledby="faq-title"
      >
        <div className="section-heading">
          <h2 id="faq-title">Before we start</h2>
          <p>A few practical details about working together.</p>
        </div>
        <div className="faq-list">
          {questions.map((item) => (
            <AnimatedFaq
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </section>

      <section
        className="discord-section shell"
        aria-labelledby="discord-title"
      >
        <DiscordLogo size={44} weight="duotone" aria-hidden />
        <div>
          <h2 id="discord-title">Let’s talk on Discord</h2>
          <p>Join the server and ask for ScriptLilla about a commission.</p>
        </div>
        <a
          href={identity.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-outline"
        >
          Join the server <ArrowUpRight size={18} aria-hidden />
        </a>
      </section>
    </>
  );
}
