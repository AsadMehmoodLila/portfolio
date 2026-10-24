import Link from "next/link";
import {
  ArrowUpRight,
  DiscordLogo,
  EnvelopeSimple,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import { identity } from "@/data/portfolio";
export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={`site-footer${compact ? " compact-footer" : ""}`}>
      {!compact && (
        <div className="footer-invitation shell">
          <h2>
            Have a mechanic
            <br />
            in mind?
          </h2>
          <div>
            <p>
              Tell me what your game needs.
              <br />
              Let’s work out a clear scope.
            </p>
            <Link href="/contact/" prefetch={false} className="button">
              Start a project <ArrowUpRight size={19} aria-hidden />
            </Link>
          </div>
        </div>
      )}
      <div className="footer-main shell">
        <Link className="wordmark" href="/" prefetch={false}>
          <span className="brand-symbol" aria-hidden="true">
            sl<span>/</span>
          </span>
          {identity.brand}
        </Link>
        <span>Roblox scripting by {identity.name}</span>
        <nav aria-label="Contact and social links">
          <a href={identity.discord} target="_blank" rel="noopener noreferrer">
            <DiscordLogo size={20} aria-hidden />
            <span className="sr-only">
              Join the Discord server (opens a new tab)
            </span>
          </a>
          <a href={`mailto:${identity.email}`}>
            <EnvelopeSimple size={20} aria-hidden />
            <span className="sr-only">Email Asad</span>
          </a>
          <a href={identity.github} target="_blank" rel="noopener noreferrer">
            <GithubLogo size={20} aria-hidden />
            <span className="sr-only">GitHub (opens a new tab)</span>
          </a>
        </nav>
      </div>
      <div className="footer-legal shell">
        <span>© 2026 {identity.name}</span>
        <nav aria-label="Policies">
          <a href="/licenses/credits.txt">Asset credits</a>
          {[
            ["privacy", "Privacy"],
            ["terms", "Commission terms"],
            ["cookies", "Cookies"],
            ["refunds", "Cancellations"],
            ["accessibility", "Accessibility"],
          ].map(([slug, label]) => (
            <Link key={slug} href={`/${slug}/`} prefetch={false}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
