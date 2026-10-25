import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { PortfolioHome } from "@/components/portfolio/home";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <PortfolioHome />
      </main>
      <SiteFooter compact />
    </>
  );
}
