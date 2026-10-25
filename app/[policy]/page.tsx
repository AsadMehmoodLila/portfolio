import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { policies } from "@/data/policies";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(policies).map((policy) => ({ policy }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  const { policy } = await params;
  const content = policies[policy];
  return {
    title: content?.title ?? "Page",
    description: content?.summary,
    alternates: { canonical: `/${policy}/` },
  };
}
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const { policy } = await params;
  const content = policies[policy];
  if (!content) notFound();
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="policy-page shell">
        <Link href="/" prefetch={false} className="back-link">
          <ArrowLeft size={16} aria-hidden />
          Back to portfolio
        </Link>
        <h1>{content.title}</h1>
        <p className="policy-summary">{content.summary}</p>
        <p className="policy-date">
          Last updated: <time dateTime="2026-10-25">25 October 2026</time>
        </p>
        <nav className="policy-toc" aria-label="On this page">
          {content.sections.map((s, i) => (
            <a href={`#section-${i}`} key={s.title}>
              {s.title}
            </a>
          ))}
        </nav>
        {content.sections.map((s, i) => (
          <section id={`section-${i}`} key={s.title}>
            <h2>{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <nav className="policy-related" aria-label="Other policies">
          {Object.entries(policies)
            .filter(([slug]) => slug !== policy)
            .map(([slug, item]) => (
              <Link key={slug} href={`/${slug}/`} prefetch={false}>
                {item.title}
              </Link>
            ))}
        </nav>
      </main>
      <SiteFooter compact />
    </>
  );
}
