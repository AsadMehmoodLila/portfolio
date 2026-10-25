import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  FilmSlate,
} from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { VideoPlayer } from "@/components/portfolio/video-player";
import { work } from "@/data/portfolio";
export const dynamicParams = false;
export function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find((item) => item.slug === slug);
  return {
    title: project?.title ?? "Project",
    description: project?.summary,
    alternates: { canonical: `/work/${slug}/` },
    robots:
      project?.status === "planned"
        ? { index: false, follow: false }
        : undefined,
    openGraph: {
      title: project?.title,
      description: project?.summary,
      url: `/work/${slug}/`,
      ...(project?.media.poster
        ? {
            images: [
              {
                url: project.media.poster,
                width: 1280,
                height: 720,
                alt: project.media.alt,
              },
            ],
          }
        : {}),
    },
  };
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = work.find((item) => item.slug === slug);
  if (!project) notFound();
  const published = project.status === "published";
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="page-intro case-intro shell">
          <Link href="/#work" prefetch={false} className="back-link">
            <ArrowLeft size={16} aria-hidden />
            Back to work
          </Link>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        {published ? (
          <>
            <div className="case-layout shell">
              <VideoPlayer media={project.media} title={project.title} />
              <aside className="case-sidebar" aria-label="Project details">
                <div>
                  <h2>My contribution</h2>
                  <ul>
                    {project.role.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>Built with</h2>
                  <ul className="case-tools">
                    {project.tools.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {project.live && (
                    <a
                      href={project.live}
                      className="button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open experience <ArrowUpRight size={17} aria-hidden />
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      className="link-action"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source <ArrowUpRight size={17} aria-hidden />
                    </a>
                  )}
                  <Link
                    href="/contact/"
                    className="link-action"
                    prefetch={false}
                  >
                    Discuss a similar system{" "}
                    <ArrowUpRight size={17} aria-hidden />
                  </Link>
                </div>
              </aside>
            </div>
            <div className="case-body shell">
              <section>
                <h2>Project overview</h2>
                <p>{project.description}</p>
              </section>
              {!!project.approach.length && (
                <section>
                  <h2>How the systems connect</h2>
                  <div className="case-approach">
                    {project.approach.map((item) => (
                      <div key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {!!project.screenshots.length && (
                <section>
                  <h2>A closer look</h2>
                  <div className="case-screenshots">
                    {project.screenshots.map((image) => (
                      <figure key={image.src}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          width={1280}
                          height={720}
                        />
                        {image.caption && (
                          <figcaption>{image.caption}</figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}
              {(project.evidence.length > 0 ||
                project.credits.length > 0 ||
                project.notes) && (
                <details className="case-references">
                  <summary>Project references and asset credits</summary>
                  {!!project.evidence.length && (
                    <ul>
                      {project.evidence.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {!!project.credits.length && (
                    <ul>
                      {project.credits.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {project.notes && <p>{project.notes}</p>}
                </details>
              )}
            </div>
          </>
        ) : (
          <section
            className="draft-showcase shell"
            aria-labelledby="upcoming-title"
          >
            <FilmSlate size={40} aria-hidden />
            <div>
              <h2 id="upcoming-title">A closer look is on the way</h2>
              <p>{project.description}</p>
              <Link
                href="/#work"
                className="button button-outline"
                prefetch={false}
              >
                Explore published work <ArrowUpRight size={17} aria-hidden />
              </Link>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
