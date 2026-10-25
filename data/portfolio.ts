/** Edit this file to add finished work. See CONTENT-GUIDE.md for the short publishing checklist. */
export const identity = {
  name: "Asad Mehmood",
  brand: "ScriptLilla",
  handle: "scriptlilla",
  email: "asadmehmood4804@gmail.com",
  discord: "https://discord.gg/sKfzTnPVn2",
  github: "https://github.com/AsadMehmoodLila",
  domain: "https://asadlilla.me",
  location: "Sialkot, Pakistan",
  availability: "Available for commissions",
  updated: "2026-10-24",
};

export const services = [
  {
    id: "combat",
    title: "Combat & abilities",
    icon: "sword",
    description:
      "Combos, skills and cooldowns, connected to your inputs, animations and UI.",
    scope: [
      "Combos, skills and cooldowns",
      "Hit validation and action states",
      "Input and animation integration",
      "Configuration for tuning",
    ],
    deliverable:
      "A scoped gameplay module, configuration and integration notes",
  },
  {
    id: "data",
    title: "Player data & inventory",
    icon: "stack",
    description:
      "Inventory, equipment and progress, with player-data integration and checks on item actions.",
    scope: [
      "Inventory and equipment logic",
      "Player-data integration",
      "Validation of item transactions",
      "Schema and migration planning",
    ],
    deliverable:
      "A documented data model and the agreed inventory or progression features",
  },
  {
    id: "rounds",
    title: "Rounds & NPC systems",
    icon: "flow",
    description:
      "Lobbies, encounters, rewards and resets, connected into a playable round.",
    scope: [
      "Lobbies, rounds and results",
      "NPC behaviours and encounters",
      "Spawning and reward integration",
      "Reset and cleanup logic",
    ],
    deliverable:
      "A configurable loop or encounter with an integration walkthrough",
  },
] as const;

export type Media = {
  /** Put local images in public/media/work/. Keep this null until you have a real image. */
  poster: string | null;
  alt: string;
  /** Optional factual caption for a still-only cover, separate from a video synopsis. */
  posterCaption?: string;
  /** Paste an unlisted YouTube URL or its 11-character ID. Only loaded after the visitor chooses Play. */
  youtube?: string | null;
  /** Optional self-hosted MP4 or WebM, relative to public/. Use either youtube or video, not both. */
  video?: string | null;
  /** Optional WebVTT captions for a self-hosted video. */
  captions?: string | null;
  summary?: string;
};
export type Work = {
  slug: string;
  title: string;
  category: string;
  status: "published" | "planned";
  type: string;
  summary: string;
  media: Media;
  role: string[];
  tools: string[];
  live?: string;
  source?: string;
  description: string;
  approach: { title: string; body: string }[];
  evidence: string[];
  credits: string[];
  notes: string;
  screenshots: { src: string; alt: string; caption?: string }[];
};

export const work: Work[] = [
  {
    slug: "escape-tsunami",
    title: "Escape Tsunami with Dragons",
    category: "Gameplay",
    status: "published",
    type: "Published Roblox experience",
    summary:
      "A survival loop built around movement, collectible dragons and an approaching wave.",
    media: {
      poster: "/media/roblox-game.webp",
      alt: "Escape Tsunami with Dragons game artwork, with a dragon, a blocky character and a blue wave",
      posterCaption: "Official game artwork",
      summary:
        "Players move through a survival course, collect rewards and use dragons while escaping the wave. Open the Roblox experience to explore the published game.",
    },
    role: [
      "Gameplay systems and progression",
      "Reward and collectible integration",
      "Performance and server-validation work",
    ],
    tools: ["Roblox Studio", "Luau", "Gameplay systems"],
    live: "https://www.roblox.com/games/79706056547341/Escape-Tsunami-with-Dragons",
    description:
      "Keep moving, collect rewards and escape the wave. This project brings a repeatable survival loop, player progression and collectible dragons together in a published Roblox experience.",
    approach: [
      {
        title: "A repeatable loop",
        body: "Movement and a travelling hazard give each run a clear objective, while rewards and collectibles give players a reason to return.",
      },
      {
        title: "Connected systems",
        body: "Player-facing progression connects the experience's rewards, dragons and tools rather than leaving each feature isolated.",
      },
      {
        title: "Work beyond the first playable",
        body: "The scripting work also covered movement updates, server validation and the practical iteration involved in publishing a game.",
      },
    ],
    evidence: [
      "Published experience available through the linked Roblox game page",
    ],
    credits: [
      "Game artwork is the published experience's official thumbnail",
      "Roblox and third-party assets retain their respective owners' rights",
    ],
    notes:
      "The cover is the published game's artwork. Any currency pictured belongs to that artwork.",
    screenshots: [],
  },
  {
    slug: "combat-system",
    title: "Combat & abilities",
    category: "Gameplay",
    status: "planned",
    type: "System showcase",
    summary: "Combos, skills, timing and the server decisions behind them.",
    media: { poster: null, alt: "", youtube: null, summary: "" },
    role: [],
    tools: ["Roblox Studio", "Luau"],
    description:
      "A dedicated combat showcase will be added here when its demonstration and contribution breakdown are ready.",
    approach: [],
    evidence: [],
    credits: [],
    notes: "This is a reserved showcase page, not a completed commission.",
    screenshots: [],
  },
  {
    slug: "inventory-data",
    title: "Inventory & player data",
    category: "Backend",
    status: "planned",
    type: "System showcase",
    summary: "Item actions, equipment and the data behind player progress.",
    media: { poster: null, alt: "", youtube: null, summary: "" },
    role: [],
    tools: ["Roblox Studio", "Luau"],
    description:
      "A dedicated inventory showcase will be added here when its demonstration and contribution breakdown are ready.",
    approach: [],
    evidence: [],
    credits: [],
    notes: "This is a reserved showcase page, not a completed commission.",
    screenshots: [],
  },
  {
    slug: "rounds-bosses",
    title: "Rounds & boss encounters",
    category: "Gameplay",
    status: "planned",
    type: "System showcase",
    summary: "Round flow, encounter phases and clean resets.",
    media: { poster: null, alt: "", youtube: null, summary: "" },
    role: [],
    tools: ["Roblox Studio", "Luau"],
    description:
      "A dedicated encounter showcase will be added here when its demonstration and contribution breakdown are ready.",
    approach: [],
    evidence: [],
    credits: [],
    notes: "This is a reserved showcase page, not a completed commission.",
    screenshots: [],
  },
  {
    slug: "flagship",
    title: "Integrated gameplay project",
    category: "Full project",
    status: "planned",
    type: "Flagship case study",
    summary:
      "A larger project connecting gameplay, progression and the player experience.",
    media: { poster: null, alt: "", youtube: null, summary: "" },
    role: [],
    tools: ["Roblox Studio", "Luau"],
    description:
      "The larger project breakdown will be published here when its gameplay demonstration and evidence are ready.",
    approach: [],
    evidence: [],
    credits: [],
    notes:
      "This reserved page is excluded from the public work list and search index until published.",
    screenshots: [],
  },
];

/** Change to a published work slug when a stronger demonstration is ready. */
export const featuredSlug = "escape-tsunami";
export const publishedWork = work.filter(
  (project) => project.status === "published",
);

export const process = [
  {
    title: "Share the brief",
    body: "Tell me the mechanic, your existing game and any budget or timing constraints.",
  },
  {
    title: "Agree the scope",
    body: "Confirm deliverables, acceptance criteria, milestones, payment and supplied assets before work starts.",
  },
  {
    title: "Review the build",
    body: "Check playable updates against the scope. Agree any added features separately.",
  },
  {
    title: "Test and hand over",
    body: "Receive the agreed source, configuration and setup notes, with revisions and support defined in the quote.",
  },
];

export const questions = [
  {
    question: "Can you work with an existing game?",
    answer:
      "Yes. Send a short explanation of the mechanic, the relevant scripts and how the current systems connect. I can assess integration and focused fixes as well as a new module.",
  },
  {
    question: "How much does a commission cost?",
    answer:
      "Each project is quoted after its scope is clear. Include your budget and currency with the brief so we can discuss a useful, realistic deliverable. No payment is taken on this website.",
  },
  {
    question: "Do you provide animations, models and UI art?",
    answer:
      "The main service is scripting. Tell me which visual assets are already available and whether UI implementation is needed. Any additional art, animation or audio work is agreed separately.",
  },
  {
    question: "How are deadlines and revisions handled?",
    answer:
      "Timing, milestones, revision limits and the bug-fix support period are written into the project agreement. A change outside the agreed scope needs a separate estimate.",
  },
  {
    question: "What do I receive at handover?",
    answer:
      "The deliverables agreed in the quote, normally source code, configuration and integration notes. Ownership, pre-existing modules and any third-party licences are clarified before work begins.",
  },
  {
    question: "What is the best way to contact you?",
    answer:
      "Join the linked Discord server and ask for ScriptLilla about a commission, or use email for a longer brief. The short contact flow can send an enquiry to my inbox through Formspree. You can also join the Discord server or email me directly.",
  },
];

export function youtubeId(value?: string | null): string | null {
  if (!value) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const id =
      host === "youtu.be"
        ? url.pathname.slice(1).split("/")[0]
        : [
              "youtube.com",
              "www.youtube.com",
              "m.youtube.com",
              "www.youtube-nocookie.com",
            ].includes(host)
          ? url.searchParams.get("v") ||
            url.pathname.split("/").filter(Boolean).at(-1)
          : null;
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
