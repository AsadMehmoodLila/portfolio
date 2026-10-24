# ScriptLilla Roblox scripting portfolio

An individual commission portfolio for Asad Mehmood. Next.js static export, self-hosted assets, day/night mode, a three-step enquiry delivered through Formspree and direct Discord/email contact. No checkout, visitor accounts or analytics.

## Run and verify

Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Production and validation:

```sh
npm run check
npm run build
npm run preview
```

The build runs a content check first and exports to `out/`. Preview serves that export at `http://127.0.0.1:4173/`. With the preview running:

```sh
npx playwright install chromium
npm run audit:browser
npm run test:media
npm run test:character
npm audit
```

Browser/axe results are saved under `audit/`. Media tests use private fixtures and intercepted provider responses, not invented public showcase content. They exercise the actual component; future real uploads need their own playback and permissions check.

## Add projects later

**Read [CONTENT-GUIDE.md](CONTENT-GUIDE.md).** All project content lives in `data/portfolio.ts`. Fill an existing planned case study or add an object; publish it with `status: "published"`. The homepage grid, case routes and sitemap update automatically. Missing required assets, duplicate slugs or malformed YouTube URLs stop the build.

Current published work uses the existing Roblox experience artwork and contribution records. Four system/flagship templates are excluded from listings and search indexing. The owner will supply systems and videos later. Known template URLs are not private.

The shared player supports local MP4/WebM with captions or a visitor-activated YouTube privacy-enhanced embed. There is no video-provider connection before Play. The contact flow sends a short brief and reply email through Formspree only after an explicit acknowledgement and Send enquiry. Success requires the provider's accepted response; inbox placement is not asserted. No private API key or Discord webhook is exposed.

## Implementation

- Pages: homepage, contact, about, static case studies and five existing policy routes
- Data: `data/portfolio.ts`, `data/policies.ts`, certificate records in `data/site.ts`
- UI: `components/portfolio/`, `app/portfolio.css`, `app/game.css`, theme provider and native certificate dialog
- Design decisions: `design/COMMISSION-IMPLEMENTATION.md`
- Current review: `audit/COMMISSION-AUDIT.md`; asset sources and licences: `CREDITS.md`
- Original brand assets: `node scripts/create-brand-assets.mjs` regenerates social PNG and install icons

The original character is now presented in a new game-style stage with automatic lighting and direct click/drag/keyboard interaction. Desktop loads its renderer/model separately; mobile, reduced-motion and data-saving visitors use a still until they tap the character. Rendering stops offscreen. The earlier avatar component is retained as history. The private research pack, experimental gameplay files and generated local tools remain ignored. No new Meshy credits are used.

## Deployment

`.github/workflows/deploy.yml` builds with `npm ci` and deploys to GitHub Pages on pushes to `main`. `public/CNAME` preserves `asadlilla.me`. Feature branches and local builds do not publish the site. Do not commit keys, private handoffs, client material or identity documents.

Policies describe the implemented configuration; they do not certify legal compliance. Separate paid commissions require agreed scope, payment, ownership, support and cancellation terms. The website takes no payment.

## Motion and sourced components

Current homepage: the green-cap portrait is the header, footer and tab mark. The commission invitation is an illustrated game-style ticket. The avatar has no toolbar or activation overlay: click/tap or Enter/Space starts/stops its dance; mouse dragging and arrow keys rotate it. Mobile stills do not load the GLB until interaction. Day starts cool white; the sun arrives four seconds later, a licensed icon supplies the spinning star, and the palette turns warm at 5.6 seconds. Switching back cancels every pending timer. Reduced-motion/keyboard activation uses still effects at the same milestones.

Enquiry drafts survive policy navigation, Back and refresh using a per-tab 24-hour restore window. Consent is never saved; confirmed sending or Clear draft removes the draft. `npm run test:draft` checks these flows on desktop/mobile, including blocked-storage navigation. Day mode shows a still sun/message for keyboard or reduced-motion users instead of hiding the cue.

`npm run test:theme` checks warm Day mode, the brief sourced sun strike, cleanup, cancellation, keyboard-accessible theme switching and reduced-motion fallback. Night remains the default on every new page load. There are no floating Effects or replay controls.

`npm run test:effects` verifies the actual sprite playback, alternating attacks, role/code rotation, motion preferences, reload persistence and offscreen pause. `npm run test:flybys` checks all seven appearances, spacing, no automatic replay, absence of replay controls, and automatic reduced-motion handling. Source and license records for LuizMelo sprites and React Bits components are in [design/COMBAT-ASSETS.md](design/COMBAT-ASSETS.md).

The Night entrance sequence starts after the sprite mounts and records progress in `scriptlilla-hero-session-v2`. Reduced motion/data saving show still characters rather than silently hiding the sequence. Avatar clicks control only the dance. The Day cinematic includes a small-to-large descending sun, beam, spinning quote from the top-right, portal impact, readable hold and spiral exit; it ends at 9.1 seconds. CSS choreography uses only transform and opacity for movement.
