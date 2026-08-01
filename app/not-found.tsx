import { ArrowUpRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main className="not-found shell">
      <p className="eyebrow">404 · Nothing here</p>
      <h1>This page didn’t ship.</h1>
      <p>The portfolio is still one click away.</p>
      <a className="button button-primary" href="/">Return home <ArrowUpRight /></a>
    </main>
  );
}
