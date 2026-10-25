# ScriptLilla Roblox scripting portfolio

Individual commission portfolio for Asad Mehmood. Next.js static export on GitHub Pages, self-hosted assets, night/day mode, Formspree enquiries and direct Discord/email contact. No checkout, visitor accounts or analytics.

## Run and verify

Node.js 22 or newer:

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Build validates project content and exports `out/`. Preview serves it at `http://127.0.0.1:4173/`. With preview running:

```sh
npx playwright install chromium
npm run audit:browser
npm run test:portfolio
npm run test:interactions
npm run test:character
npm run test:theme
npm run test:draft
npm run test:media
```

Results are saved under `audit/`. Contact tests mock delivery; do not consume the live form quota. Media fixtures test the reusable player without publishing fictitious work.

## Add your proof later

Read [CONTENT-GUIDE.md](CONTENT-GUIDE.md). Project records live in `data/portfolio.ts`. Add real recordings, posters, contribution details and credits, then set `status: "published"`. Homepage, case pages and sitemap update together. Four planned templates remain excluded from listings and indexing. Their known URLs are public, not confidential storage.

The current published game uses real game artwork and contribution records. It is not presented as a filmed demonstration. Future YouTube/local-video records automatically use the shared player on the homepage and case page. No provider connects until Play.

## Current implementation

- Homepage: short intro, selected work, service rows, commission process, concise biography, FAQ and direct contact
- Source: `components/portfolio/`, `app/site.css`, `app/cinematics.css`; project/policy data under `data/`
- Green-cap mark, owner portrait and adapted charcoal-outfit avatar form the identity
- Native character button loads 3D only on explicit interaction on every device; click/Enter/Space starts or stops dance, drag/arrows turn, Home resets
- Offscreen and hidden-tab rendering stops; idle frames render on demand
- Night is the default on reload; theme persists in memory across internal navigation
- Day has one short asset-ready sun cue, with beams before warmth; reduced motion gets a still cue and Night cancels immediately
- No roaming fighters, artificial code panels, multi-click biography or effects/replay toolbar
- Contact sends a short brief and reply email only after validation, privacy acknowledgement and Send enquiry; success requires Formspree acceptance
- Unsent drafts restore per tab for 24 hours; consent is never restored; accepted sending and Clear draft delete the draft
- Native certificate previews are under a closed disclosure on About

Original unused UI source is preserved as text under `design/retired-ui/2026-10-25/`; it is not bundled. Framer Motion and Lenis were removed. Avatar preparation is reproducible with `design/prepare-brand-avatar.py` in Blender using the retained original model. Asset provenance: [CREDITS.md](CREDITS.md).

## Deployment

`.github/workflows/deploy.yml` builds and deploys pushes to `main`. `public/CNAME` preserves `asadlilla.me`. Local builds and feature branches do not publish. Never commit credentials, private handoffs or confidential client material.

Policies describe implemented data flows; they do not certify legal compliance. Separate commissions need agreed scope, payment, ownership, revisions, support and cancellation terms. The website takes no payment.
