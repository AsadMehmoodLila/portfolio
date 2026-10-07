import { ArrowUpRight } from "@/components/ui/icons";
import { links } from "@/data/site";

const software = [
  { title: "Study Buddy", type: "AI learning tools", tools: "Python / Streamlit", description: "Turn course material into summaries, practice questions and focused study sessions.", detail: "Team project with Abdul Rehman and Adeel Mughal.", href: links.studyBuddyRepo, action: "View source" },
  { title: "MindfulMirror", type: "Computer vision", tools: "FastAPI / Keras / SQLite", description: "An educational experiment in facial-expression classification, local history and AI-assisted reflection.", detail: "Optional AI reflection uses external providers. Not a clinical tool.", href: links.emotionRepo, action: "View source" },
  { title: "Nutrition RAG", type: "Retrieval + language models", tools: "Python / RAG", description: "Explore nutrition questions using a controlled knowledge source and retrieval-augmented generation.", detail: "Educational prototype. Outputs are not dietary or medical advice.", href: links.nutritionDemo, action: "View demo" },
];

export function SelectedWork() {
  return <section id="work" className="selected-work shell" aria-labelledby="work-title">
    <div className="work-heading"><h2 id="work-title">Built to be<br />played and used</h2><p>A published game, a team project<br />and experiments in applied AI.</p></div>
    <article className="featured-game">
      <a className="game-image" href={links.robloxGame} target="_blank" rel="noopener noreferrer" aria-label="Play Escape Tsunami with Dragons on Roblox (opens in a new tab)"><img src="/media/roblox-game.webp" width="768" height="432" alt="Escape Tsunami with Dragons artwork: a blocky character rides a green dragon beside an approaching blue wave" loading="lazy" /><span>Play on Roblox <ArrowUpRight /></span></a>
      <div className="game-case"><h3>Escape Tsunami<br />with Dragons</h3><p>A survival game built around a simple loop: keep moving, collect rewards and escape the wave.</p><dl><div><dt>Platform</dt><dd>Roblox · Lua</dd></div><div><dt>My work</dt><dd>Game systems, progression,<br />performance & server validation</dd></div></dl><a className="text-link" href={links.robloxGame} target="_blank" rel="noopener noreferrer">Play on Roblox <ArrowUpRight /></a></div>
    </article>
    <div className="software-projects">{software.map(project=><article className="software-project" key={project.title}><div className="software-title"><h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.title} <ArrowUpRight /></a></h3><span>{project.type}</span></div><div><p>{project.description}</p><small>{project.detail}</small></div><div className="software-meta"><span>{project.tools}</span><a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">{project.action} <ArrowUpRight /></a></div></article>)}</div>
  </section>;
}
