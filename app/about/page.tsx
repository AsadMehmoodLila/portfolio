import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { Certificates } from "@/components/sections/certificates";
import { identity } from "@/data/portfolio";
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
          <h1>
            Asad, also known
            <br />
            as ScriptLilla
          </h1>
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
            <h2>How I approach the work</h2>
            <p>
              I like taking a game idea apart into the things that need to
              happen: what the player does, what the server decides and how the
              next action becomes available. That is the focus of my scripting
              work.
            </p>
            <p>
              My portfolio includes Escape Tsunami with Dragons, a published
              Roblox experience with gameplay, progression and reward systems.
              The project page explains my contribution and links to the game.
            </p>
            <p>
              I study BS Artificial Intelligence at the University of Management
              and Technology. That background supports my interest in logic and
              debugging. A commission is scoped around the practical
              requirements of your game.
            </p>
            <h2>Working tools</h2>
            <div className="tools-strip">
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
        <Certificates />
      </main>
      <SiteFooter />
    </>
  );
}
