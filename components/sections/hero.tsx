import { ArrowUpRight } from "@/components/ui/icons";
import { AvatarStage } from "@/components/avatar-stage";
import { site } from "@/data/site";
export function Hero() {
  return <section id="top" className="game-hero shell" aria-labelledby="hero-title">
    <div className="game-hero-copy">
      <h1 id="hero-title">Asad<br /><span>Mehmood</span></h1>
      <div className="hero-introduction">
        <p>Roblox developer<br />& AI student</p>
        <p>I build game systems, interactive worlds and practical software</p>
      </div>
      <a className="button button-primary" href="#work">View work <ArrowUpRight /></a>
    </div>
    <AvatarStage />
    <div className="hero-baseline"><span>{site.location}</span><span>{site.availability}</span><a href={`mailto:${site.email}`}>Email Asad <ArrowUpRight /></a></div>
  </section>;
}
