# Adding your systems and videos

All portfolio work is defined in **`data/portfolio.ts`**. You do not need to edit page layouts to add a project. The website remains a Next.js static export for your existing GitHub Pages domain.

## Ready-made sections

Homepage: introduction, published work, service rows, delivery process, concise biography, tool logos, animated FAQ, direct contact and footer. `/contact/` has a three-step enquiry connected to Formspree, with direct Discord/email alternatives. `/about/` contains your background and certificate previews. Existing policy URLs remain available.

The four reserved case studies are:

| Entry in `work` | Preview URL | Intended content |
| --- | --- | --- |
| `combat-system` | `/work/combat-system/` | Combat and abilities |
| `inventory-data` | `/work/inventory-data/` | Inventory and player data |
| `rounds-bosses` | `/work/rounds-bosses/` | Rounds and encounters |
| `flagship` | `/work/flagship/` | A larger integrated project |

They have `status: "planned"`. They are excluded from the homepage and sitemap and have `noindex, nofollow`. The static preview URLs are public if someone knows them, **not private storage**. Do not put confidential client material in them. A planned entry shows an honest upcoming page, not invented completed work.

## Publish a finished system

1. Put your own poster and screenshots in `public/media/work/your-project/`. Prefer 16:9 WebP/JPEG images with sensible compression. File names and paths are case-sensitive on GitHub Pages.
2. Edit the matching entry in `data/portfolio.ts`. Fill in its title, summary, role, description, approach, evidence, tools, credits and notes. Leave optional source/live links absent when you cannot share them. Do not label third-party systems as entirely your own work.
3. Add either an unlisted YouTube link **or** a local MP4/WebM. Example media configuration:

   ```ts
   media: {
     poster: "/media/work/combat/poster.webp",
     alt: "Two characters demonstrating a guarded attack in the combat test arena",
     youtube: "PASTE_YOUR_REAL_UNLISTED_YOUTUBE_URL_HERE",
     summary: "Explain the actions demonstrated, the server decisions and the limits of this test",
     posterCaption: "Combat demonstration recorded in the test arena",
   },
   ```

   Replace the example string with a real HTTPS YouTube URL or 11-character video ID. The build deliberately rejects an invalid value. Supported URL formats: `youtube.com/watch?v=…`, `youtu.be/…`, `/shorts/…`, and `/embed/…` on recognised YouTube hosts. The parser strips unrelated URL parameters. Make the video unlisted or public and allow embedding; **private videos cannot be embedded for visitors**.

   For local video, omit `youtube` and set `video: "/media/work/combat/demo.mp4"`. Add `captions: "/media/work/combat/captions.vtt"` for an English WebVTT track. Keep files within your hosting/repository limits; longer video is better hosted on YouTube. Local players request no video until playback. Use broadly supported H.264/AAC MP4 or WebM and include captions for meaningful speech/sounds. YouTube captions are managed on YouTube.
4. Add screenshots with descriptive alternatives:

   ```ts
   screenshots: [
     { src: "/media/work/combat/arena.webp", alt: "A guarded character facing an attacker", caption: "Guard and attack states during the demonstration" },
   ],
   ```

5. Change `status` to **`"published"`** only when the real material is ready. It then appears automatically in the work grid and sitemap, and its complete case study replaces the upcoming view. Empty optional sections are omitted. Reorder the `work` array to change display order. Set `featuredSlug` to a published entry to place it first in the work grid. The character remains the hero identity.
6. Run `npm run check:content`, `npm run check`, `npm run build`, then `npm run preview`. Open `http://127.0.0.1:4173/` and the case study on mobile and desktop. Run `npm run audit:browser` against that preview and `npm run test:media` for the reusable player.
7. Commit the content, media and lockfile if changed. The existing deployment workflow publishes only pushes to `main`. A local build or feature branch does not deploy the website.

## Checks before publication

- Use real recordings and state what you personally built or changed, especially when starting from a template or Toolbox asset
- Record credits, licences and redistribution restrictions; confirm permission to show client work or source
- Describe the test conditions honestly: local or live, player count and supported devices; do not claim untested exploit protection or persistence
- Provide a useful text summary and captions/transcript where needed
- Check your video is viewable while signed out, unlisted/public, embeddable and free of private information
- Check poster paths, alt text and optional source/play links; the content validator stops builds for missing required assets or malformed video URLs

## Other content and behaviour

- Identity, Discord invite, email, offers, process and FAQs: `data/portfolio.ts`
- Certificates/background legacy records: `data/site.ts`; previews: `components/sections/certificates.tsx`
- Policies: `data/policies.ts`; keep them aligned with the actual services and data flows
- Tokens, layout, responsive rules and reduced motion: `app/site.css` and `app/cinematics.css`
- The enquiry is sent to Formspree only after the visitor validates the brief, checks the privacy acknowledgement and chooses Send enquiry. Direct email opens their own app. There is no checkout or automatic marketing
- Day/night is held in memory during internal navigation. Reloading starts in night mode; no preference cookie or local storage is used
- YouTube is blocked until the visitor chooses Play, using `youtube-nocookie.com`. Close unloads it. This is a deliberate per-player choice, not a claim that YouTube collects no information
- Current browser checks cover templates with no video and the shared player with private test fixtures. Your future YouTube video's visibility, captions, licensing and actual remote playback need checking when you add it

## Adding another project

Duplicate a complete `Work` object with a unique lowercase hyphenated slug. Keep it planned while preparing its content. The existing route generator, listing, sitemap, player and responsive case layout handle additional entries without new page files.

The hero is implemented in `components/portfolio/character-stage.tsx`. It uses the owner-supplied local video, not a generated 3D model. Current assets: `scriptlilla-character.mp4`, `scriptlilla-character-mobile.mp4` and `scriptlilla-character-poster.webp` under `public/media/`. Preserve audio-free inline playback, poster dimensions, reduced-motion/data-saving behaviour and native keyboard pause/play when replacing it. Source record: `design/branding/character-video.json`. This is decorative identity art, not work evidence. Button-hover sprite metadata/behaviour is in `components/portfolio/button-heroes.tsx`; provenance is in `design/COMBAT-ASSETS.md`.

## Contact and proof integration

The endpoint is public configuration in `data/contact.ts`. Never add mailbox passwords or private Discord webhooks to client code. Form acceptance controls success; failures preserve fields. Drafts last up to 24 hours in the current tab, excluding consent; Clear draft and accepted sending delete them. Discord opens the supplied server, where clients can ask for @scriptlilla. Use private email/form messages for sensitive enquiries.

When you add a real `youtube` or `video` field, the homepage and case page automatically render the shared player. Poster-only entries show an honest artwork link. `posterCaption` is optional text identifying the still; keep meaningful actions/test limits in `summary`. Future YouTube visibility, captions, rights and remote playback need checking when supplied.

Run `npm run test:portfolio`, `npm run test:interactions`, `npm run test:draft` and `npm run test:media`. Delivery is mocked in routine tests; do not send repeated real enquiries against the monthly quota.
