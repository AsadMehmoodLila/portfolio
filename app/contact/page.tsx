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
import { ContactQuest } from "@/components/portfolio/contact-quest";
import { identity } from "@/data/portfolio";
export const metadata: Metadata = {
  title: "Start a Roblox project",
  description:
    "Choose your Roblox system, set a rough scope and send ScriptLilla a short commission enquiry. Direct Discord and email are also available.",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="page-intro contact-intro shell">
          <Link className="back-link" href="/" prefetch={false}>
            <ArrowLeft size={16} aria-hidden />
            Back to portfolio
          </Link>
          <h1>Tell me what your game needs</h1>
          <p>
            Choose a system and send a short brief. I’ll use your email to
            continue the conversation.
          </p>
          <div className="contact-shortcuts">
            <a className="link-action" href={`mailto:${identity.email}`}>
              <EnvelopeSimple size={19} aria-hidden />
              Email directly <ArrowUpRight size={15} aria-hidden />
            </a>
            <a
              href={identity.discord}
              className="link-action"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordLogo size={19} aria-hidden />
              Discord server <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>
        <div className="contact-quest-layout shell">
          <aside className="quest-profile">
            <div className="quest-profile-image">
              <img
                src="/media/scriptlilla-portrait.webp"
                alt="ScriptLilla’s green-cap illustrated avatar"
                width={720}
                height={720}
                loading="lazy"
              />
            </div>
            <div>
              <h2>Asad / ScriptLilla</h2>
              <p>Roblox scripting & UI integration</p>
              <a
                href={identity.discord}
                className="link-action"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordLogo size={20} aria-hidden />
                Join the server <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
            <p className="quest-business">
              {identity.location}
              <br />
              Scope and payment terms agreed before work starts
            </p>
            <p className="quest-channel-note">
              On Discord, join the server and ask for{" "}
              <strong>@scriptlilla</strong> about a commission. Prefer a private
              enquiry? Use this form or email.
            </p>
          </aside>
          <ContactQuest />
        </div>
        <noscript>
          <div className="quest-nojs shell">
            <h2>Let’s talk directly</h2>
            <p>
              Contact me through Discord or email with the system you need and a
              short description.
            </p>
            <a className="button" href={identity.discord}>
              Join the server <ArrowUpRight size={17} aria-hidden />
            </a>
            <a className="link-action" href={`mailto:${identity.email}`}>
              <EnvelopeSimple size={18} aria-hidden />
              {identity.email}
            </a>
          </div>
        </noscript>
      </main>
      <SiteFooter compact />
    </>
  );
}
