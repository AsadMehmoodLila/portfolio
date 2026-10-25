import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { Certificates } from "@/components/sections/certificates";
import { identity } from "@/data/portfolio";
import { WorkingTools } from "@/components/portfolio/working-tools";
export const metadata: Metadata = {
  title: "About Asad",
  description:
    "Meet Asad Mehmood, known as ScriptLilla, an individual Roblox developer working on gameplay scripting and UI integration.",
  alternates: { canonical: "/about/" },
};
export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <div className="page-intro shell">
          <Link href="/" className="back-link" prefetch={false}>
            <ArrowLeft size={16} aria-hidden />
            Back to portfolio
          </Link>
          <h1>The person behind ScriptLilla</h1>
          <p>
            Roblox gameplay scripting and UI integration, from{" "}
            {identity.location}.
          </p>
        </div>
        <div className="about-page-layout shell">
          <div className="about-identity">
            <div className="about-monogram profile-portrait">
              <img
                src="/media/scriptlilla-portrait.webp"
                alt="ScriptLilla's illustrated avatar with a green plaid cap, pale green hair, blue eyes and a black high-neck jacket"
                width={720}
                height={720}
              />
            </div>
            <span>{identity.name}</span>
            <strong>@{identity.handle}</strong>
            <a
              className="link-action"
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore my GitHub <ArrowUpRight size={17} aria-hidden />
            </a>
          </div>
          <div className="about-page-copy">
            <h2>Gameplay, logic and the pieces between</h2>
            <p>
              I’m Asad Mehmood, a Roblox scripter based in {identity.location}.
              I work on gameplay scripting and UI integration: player actions,
              the checks behind them and the way systems fit into a game.
            </p>
            <p>
              Escape Tsunami with Dragons is my published Roblox project. Its
              project page describes my contribution and links to the
              experience.
            </p>
            <p>
              I study BS Artificial Intelligence at the University of Management
              and Technology. I enjoy tracing bugs and working through game
              logic.
            </p>
            <h2>Working tools</h2>
            <WorkingTools />
            <p>
              For client work, I clarify integration points, supplied assets,
              acceptance criteria and handover before the build begins. Source
              availability, ownership, revisions and support belong in that
              agreement too.
            </p>
            <Link href="/contact/" className="button" prefetch={false}>
              Discuss your game <ArrowUpRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <details className="credentials-disclosure shell">
          <summary>Certificates and professional development</summary>
          <Certificates />
        </details>
      </main>
      <SiteFooter />
    </>
  );
}
