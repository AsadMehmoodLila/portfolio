import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChatCircleDots,
  Code,
  DiscordLogo,
  EnvelopeSimple,
  GameController,
  Handshake,
  RocketLaunch,
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
  systemShowcases,
} from "@/data/portfolio";
import { CharacterStage } from "./character-stage";
import { AnimatedFaq } from "./animated-faq";
import { VideoPlayer } from "./video-player";
import { WorkingTools } from "./working-tools";
import { WorkFacts } from "./work-facts";

const icons = { sword: Sword, stack: Stack, flow: TreeStructure };
const processIcons = {
  chat: ChatCircleDots,
  scope: Handshake,
  play: GameController,
  ship: RocketLaunch,
};

export function PortfolioHome() {
  const featured =
    publishedWork.find((item) => item.slug === featuredSlug) ??
    publishedWork[0];
  const projects = [
    ...(featured ? [featured] : []),
    ...publishedWork.filter((item) => item.slug !== featured?.slug),
  ];
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            Roblox scripting
            <br />
            <span>For your next game</span>
          </h1>
          <p>
            I’m Asad, also known as ScriptLilla. I build gameplay systems and
            connect player data, interfaces and game loops.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/contact/" prefetch={false}>
              Start a project <ArrowUpRight size={18} aria-hidden />
            </Link>
            <a className="link-action" href="#work">
              See the work <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <CharacterStage />
        </div>
      </section>

      <section
        id="work"
        className="work-section section shell"
        aria-labelledby="work-title"
      >
        <div className="section-heading work-heading">
          <h2 id="work-title">Selected work</h2>
          <p>Published Roblox work, with my role and project details.</p>
        </div>
        <div
          className={`work-grid ${projects.length === 1 ? "single-work" : ""}`}
        >
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`work-card${index === 0 ? " work-card-featured" : ""}`}
            >
              {project.media.youtube || project.media.video ? (
                <VideoPlayer media={project.media} title={project.title} />
              ) : (
                <Link
                  className="work-card-image"
                  href={`/work/${project.slug}/`}
                  prefetch={false}
                >
                  {project.media.poster && (
                    <img
                      src={project.media.poster}
                      width={1280}
                      height={720}
                      alt={project.media.alt}
                      loading="lazy"
                    />
                  )}
                  {project.media.posterCaption && (
                    <span className="work-art-label">
                      {project.media.posterCaption}
                    </span>
                  )}
                </Link>
              )}
              <div className="work-card-copy">
                <span className="work-type">{project.type}</span>
                <h3>
                  <Link href={`/work/${project.slug}/`} prefetch={false}>
                    {project.title}
                  </Link>
                </h3>
                <p>{project.summary}</p>
                <WorkFacts project={project} />
                <div className="project-role">
                  <strong>My role</strong>
                  <ul>
                    {project.role.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/work/${project.slug}/`}
                  prefetch={false}
                  className="link-action"
                >
                  Explore the project <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="services-section section shell"
        aria-labelledby="services-title"
      >
        <div className="section-heading section-heading-centered">
          <h2 id="services-title">What do you need built?</h2>
        </div>

        <div className="showcase-grid-wrap">
          <div className="showcase-grid">
            {systemShowcases.map((item) => (
              <article className="showcase-card" key={item.id}>
                <VideoPlayer
                  media={item.media}
                  title={item.title}
                  duration={item.duration}
                  compact
                />
                <div className="showcase-card-bar">
                  <h3>{item.title}</h3>
                  <Link
                    href={`/contact/?service=${item.serviceId}`}
                    prefetch={false}
                    className="link-action"
                    aria-label={`Commission ${item.title}`}
                  >
                    Build similar <ArrowUpRight size={16} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="service-pills" aria-label="Systems I build">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <Link
                key={service.id}
                href={`/contact/?service=${service.id}`}
                prefetch={false}
                className="service-pill"
              >
                <Icon size={18} aria-hidden />
                <span>{service.title}</span>
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            );
          })}
          <Link
            href="/contact/?service=other"
            prefetch={false}
            className="service-pill service-pill-muted"
          >
            <Code size={18} aria-hidden />
            <span>Fixes &amp; integrations</span>
            <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      <section
        id="process"
        className="process-section section shell"
        aria-labelledby="process-title"
      >
        <div className="section-heading section-heading-centered">
          <h2 id="process-title">How a commission works</h2>
        </div>
        <div className="process-flow-wrap">
          <ol className="process-flow">
            {process.map((step, index) => {
              const StepIcon = processIcons[step.icon];
              return (
                <li className="process-card" key={step.title}>
                  <div className="process-card-top">
                    <span className="process-icon-badge" aria-hidden>
                      <StepIcon size={24} weight="duotone" />
                    </span>
                    <span className="process-step-chip" aria-hidden>
                      0{index + 1}
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <span className="process-tag">{step.tag}</span>
                  {index < process.length - 1 && (
                    <span className="process-connector" aria-hidden>
                      <ArrowRight size={16} weight="bold" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="about"
        className="about-section section shell"
        aria-labelledby="about-title"
      >
        <div className="about-identity">
          <img
            src="/media/scriptlilla-portrait.webp"
            width={240}
            height={240}
            alt="ScriptLilla’s illustrated green-cap avatar"
            loading="lazy"
          />
        </div>
        <div className="about-copy">
          <h2 id="about-title">Asad, a.k.a. ScriptLilla</h2>
          <p>
            A Roblox scripter based in {identity.location}. I study Artificial
            Intelligence at UMT and enjoy working through the logic behind a
            playable game.
          </p>
          <WorkingTools />
          <Link href="/about/" prefetch={false} className="link-action">
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

      <section className="contact-strip shell" aria-label="Direct contact">
        <div>
          <EnvelopeSimple size={24} aria-hidden />
          <span>Have a quick question?</span>
        </div>
        <a href={`mailto:${identity.email}`} className="link-action">
          Email Asad <ArrowUpRight size={17} aria-hidden />
        </a>
        <a
          href={identity.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="link-action"
        >
          <DiscordLogo size={19} aria-hidden />
          Join the Discord server <ArrowUpRight size={17} aria-hidden />
        </a>
      </section>
    </>
  );
}
