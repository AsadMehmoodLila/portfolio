import { site } from "@/data/site";
import Link from "next/link";

export const policyLinks = [
  ["/privacy/", "Privacy"], ["/terms/", "Terms"], ["/cookies/", "Cookies"],
  ["/refunds/", "Refunds & returns"], ["/accessibility/", "Accessibility"],
] as const;

export function LegalFooter() {
  return <footer className="legal-footer shell">
    <div className="owner-details">
      <span>© 2026 {site.name} · Individual portfolio</span>
      <span>{site.location}</span>
      <a href={`mailto:${site.email}`}>{site.email}</a>
    </div>
    <nav aria-label="Policies">{policyLinks.map(([href, label]) => <Link key={href} href={href} prefetch={false}>{label}</Link>)}</nav>
  </footer>;
}
