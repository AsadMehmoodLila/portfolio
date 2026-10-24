import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="not-found shell">
        <h1>This page isn’t here</h1>
        <p>
          The link may have changed. Explore the published work or get in touch
          about your game.
        </p>
        <Link href="/" prefetch={false} className="button">
          Back to portfolio <ArrowRight size={18} aria-hidden />
        </Link>
        <Link href="/contact/" prefetch={false} className="link-action">
          Contact Asad
        </Link>
      </main>
      <SiteFooter compact />
    </>
  );
}
