import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  DiscordLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { BriefBuilder } from "@/components/portfolio/brief-builder";
import { identity } from "@/data/portfolio";
export const metadata: Metadata = {
  title: "Start a Roblox project",
  description:
    "Discuss a Roblox scripting commission with ScriptLilla. Share the mechanic, scope and requirements through Discord or email.",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="page-intro shell">
          <Link className="back-link" href="/" prefetch={false}>
            <ArrowLeft size={16} aria-hidden />
            Back to portfolio
          </Link>
          <h1>
            What does your
            <br />
            game need?
          </h1>
          <p>
            A new mechanic, a system that needs connecting or a focused fix.
            Tell me the goal and we’ll work out the scope.
          </p>
        </div>
        <div className="contact-layout shell">
          <aside className="contact-options" aria-label="Contact options">
            <section className="contact-card">
              <DiscordLogo size={32} weight="duotone" aria-hidden />
              <h2>Start on Discord</h2>
              <p>
                Join the server and ask for <strong>@{identity.handle}</strong>{" "}
                about a commission. Server enquiries are the best way to reach
                me on Discord.
              </p>
              <a
                href={identity.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="link-action"
              >
                Join the server <ArrowUpRight size={17} aria-hidden />
              </a>
            </section>
            <section className="contact-card">
              <EnvelopeSimple size={30} weight="duotone" aria-hidden />
              <h2>Prefer email?</h2>
              <p>
                Send your brief directly. You can attach a reference clip or
                relevant screenshots from your own email app.
              </p>
              <a href={`mailto:${identity.email}`} className="link-action">
                {identity.email}
              </a>
            </section>
            <p className="contact-small">
              Individual developer: {identity.name}
              <br />
              {identity.location}
              <br />
              No payment is collected on this website. Scope, delivery and
              payment terms are agreed before work begins.
            </p>
          </aside>
          <BriefBuilder />
        </div>
      </main>
      <SiteFooter compact />
    </>
  );
}
