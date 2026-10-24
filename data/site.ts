export const site = {
  name: "Asad Mehmood",
  shortName: "Asad",
  domain: "asadlilla.me",
  location: "Sialkot, Pakistan",
  degree: "BS Artificial Intelligence",
  university: "University of Management and Technology",
  availability: "Open to internships",
  github: "https://github.com/AsadMehmoodLila",
  email: "asadmehmood4804@gmail.com",
  intro:
    "BS Artificial Intelligence student and Roblox developer building practical AI tools, interactive games, and software that ships.",
} as const;

export const links = {
  robloxGame:
    "https://www.roblox.com/games/79706056547341/Escape-Tsunami-with-Dragons",
  emotionRepo:
    "https://github.com/AsadMehmoodLila/EmotionDetUsFacialExp",
  studyBuddyRepo:
    "https://github.com/AsadMehmoodLila/study_buddy-team05-",
  nutritionDemo:
    "https://www.linkedin.com/posts/asadmehmoodlilla_what-if-i-told-you-that-chatgpt-had-never-ugcPost-7419450622812246016-1arQ/",
} as const;

export const robloxTimeline = [
  {
    label: "Prototype",
    body: "Built the core survival loop around a moving tsunami, map traversal, and repeatable rounds.",
  },
  {
    label: "Systems",
    body: "Added lucky-block rewards, collectible dragons, tools, music, and player-facing progression.",
  },
  {
    label: "Performance",
    body: "Reworked movement and update frequency so the large hazard could feel smooth without wasting server time.",
  },
  {
    label: "Protection",
    body: "Added server-side validation, anti-exploit checks, and controlled admin announcements.",
  },
  {
    label: "Publish & iterate",
    body: "Shipped the experience, watched player behaviour, and kept improving the loop after release.",
  },
] as const;

export const studyBuddySteps = [
  {
    index: "01",
    title: "Upload academic material",
    body: "Process PDF, Markdown, TXT, and PPTX files instead of forcing students to reorganize everything manually.",
    signal: "PDF · MD · TXT · PPTX",
  },
  {
    index: "02",
    title: "Extract grounded knowledge",
    body: "Build context from the uploaded material and answer questions against that source to reduce unsupported responses.",
    signal: "Contextual document chat",
  },
  {
    index: "03",
    title: "Turn content into study tools",
    body: "Generate structured notes, active-recall flashcards, and adaptive multiple-choice quizzes from the same material.",
    signal: "Notes · Cards · Quizzes",
  },
  {
    index: "04",
    title: "Sequence the learning path",
    body: "Rank documents into a logical roadmap so foundational topics come before advanced concepts.",
    signal: "AI-ranked roadmap",
  },
  {
    index: "05",
    title: "Track work, focus, and progress",
    body: "Combine a priority task manager, Pomodoro sessions, quiz analytics, and progress visualizations in one workflow.",
    signal: "Tasks · Focus · Analytics",
  },
] as const;

export const emotionSteps = [
  {
    index: "01",
    title: "Camera",
    body: "Capture webcam frames inside the browser while keeping the app local-first.",
  },
  {
    index: "02",
    title: "Emotion detection",
    body: "Send frames to a local FastAPI backend and classify expressions with a local Keras model.",
  },
  {
    index: "03",
    title: "History",
    body: "Save emotion entries and notes in a local SQLite database rather than a remote account.",
  },
  {
    index: "04",
    title: "Patterns",
    body: "Turn the saved history into charts, counts, and recent mood activity.",
  },
  {
    index: "05",
    title: "Reflection",
    body: "Offer optional Gemini-powered questions, advice, and insights with rule-based fallbacks.",
  },
  {
    index: "06",
    title: "Chatbot",
    body: "Connect an OpenRouter-powered wellness assistant while keeping secrets in a local environment file.",
  },
] as const;

export const certificates = [
  {
    title: "AI App Development · CreateX",
    issuer: "Computer Science Society, UMT Sialkot",
    type: "Certificate of Participation",
    image: "/images/certificates/createx-ai-app-development.webp",
    note: "Awarded for active participation in the CreateX AI App Development event.",
  },
  {
    title: "Soft Skills Training",
    issuer: "OEC & ICMPD",
    type: "14-hour Certificate of Completion",
    image: "/images/certificates/soft-skills-redacted.webp",
    note: "Completed November 15, 2025. The public preview redacts the personal identity number.",
  },
] as const;

export const skillGroups = [
  {
    title: "AI & machine learning",
    skills: ["Python", "TensorFlow", "Keras", "OpenCV", "RAG", "Gemini", "OpenRouter"],
  },
  {
    title: "Applications & backend",
    skills: ["FastAPI", "Streamlit", "SQLite", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Game development",
    skills: ["Lua", "Roblox Studio", "Game systems", "Performance", "Server validation"],
  },
  {
    title: "Workflow",
    skills: ["Git", "GitHub", "VS Code", "Rider", "Documentation", "Rapid prototyping"],
  },
] as const;
