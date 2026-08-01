# AsadLilla Portfolio V3

A full rebuild of `asadlilla.me` using Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lenis.

## What this version changes

- Near-black product-site visual system instead of a generic light portfolio template
- Project stories instead of small project cards
- Scroll-driven Study Buddy workflow
- MindfulMirror product-flow visualization
- Roblox showcase with the live game link and 30K+ visit metric
- Real, clickable certificate previews
- Skills grouped by actual project use — no progress bars
- AM monogram favicon, Open Graph image, responsive navigation, reduced-motion support, and mobile layouts
- Static export and GitHub Pages deployment workflow included

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production check:

```bash
npm run check
npm run build
```

The static export is generated in `out/`.

## Deploy to your existing GitHub Pages repository

This version is a Next.js project. Do not keep GitHub Pages on **Deploy from a branch**.

1. Keep the repository named `portfolio` and keep your Namecheap DNS records unchanged.
2. Upload the contents of this extracted folder to the repository root.
3. Commit to `main`.
4. Open **Repository → Settings → Pages**.
5. Under **Build and deployment**, change **Source** to **GitHub Actions**.
6. Open the **Actions** tab and wait for `Deploy portfolio to GitHub Pages` to finish.
7. Visit `https://asadlilla.me` and hard-refresh once.

The workflow in `.github/workflows/deploy.yml` installs dependencies, builds the static export, and deploys `out/`. `public/CNAME` preserves the custom domain.

## Important content edits

Most links and copy are centralized in:

```text
data/site.ts
```

The professional email is intentionally blank because it was not supplied. Add it to `site.email` when ready, then add a mail link in the footer if desired.

## Real assets still needed

The site works without them and uses designed product-flow visualizations, but these files would make it stronger:

- Roblox gameplay image: `public/media/roblox-gameplay.webp` — 1920×1080, WebP, under 1.5 MB
- Roblox gameplay clip: `public/media/roblox-gameplay.mp4` — 1920×1080, H.264, muted, 8–15 seconds, under 12 MB
- Study Buddy screenshots: 1600×1000 WebP, 3–5 images
- MindfulMirror screenshots: 1600×1000 WebP, 3–6 images
- Nutrition RAG screenshot: 1600×1000 WebP
- Latest CV: `public/Asad-Mehmood-CV.pdf`

Exact suggestions are in `public/media/README.md`.

## Privacy

The public Soft Skills certificate image has the CNIC number visibly redacted. Do not upload the original unredacted PDF to a public repository.

## Project links included

- Escape Tsunami with Dragons: live Roblox experience
- Study Buddy: GitHub repository
- MindfulMirror / emotion detection: GitHub repository
- Nutrition RAG: LinkedIn demo post

## Libraries

- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lenis

No stock photography, random illustration packs, particle effects, custom cursor, or downloaded font files are included.
