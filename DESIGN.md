# Current portfolio design

Updated 25 October 2026. The owner explicitly rejected the restrained editorial draft and approved the stronger game-interface direction during the visual iteration.

## Direction

A Roblox scripter's game menu: large angular headlines, a player-profile stage, real character controls, a service loadout dock and framed system panels. The audience remains game owners assessing a scoped commission. The published game and contribution details remain evidence; the character is the portfolio's visual identity, not a fabricated gameplay demonstration.

Variance 8/10, motion 4/10, density 5/10. Native CSS handles chrome and short interaction feedback. One original local Three.js scene handles the actual rigged character, camera rotation, platform, lights and dance. No imported full-world framework, particles, physics library or postprocessing chain. No client metrics or reviews are invented.

## Reference review

The owner's ZIP screenshots were inspected directly: Vuuk's first viewport/portfolio, Daxny, RoForge and Mopy. Their clear hierarchy, identity and commission navigation informed the review; their assets and claims are not copied. Some fullpage captures in the pack repeat a sticky first viewport, so the first-viewport captures are more useful than those stitched images.

Public GitHub references: https://github.com/brunosimon/folio-2025 and https://github.com/brunosimon/folio-2019 for character/world interaction and scene organisation. The former's rendering implementation exposes quality settings and a separate renderer. We use the existing Three.js dependency and original local code, not their scenes or branding. https://github.com/mrdoob/three.js is the upstream library source. No claim of an objective 'top-rated' ranking is made.

## Type, colour and shape

Chakra Petch 700 supplies the game-interface display face; Geist supplies readable body text. Monospace uses the system font stack to avoid another font download. Fonts used by the page are self-hosted by next/font. The original sl/ typographic mark is carried into a tilted, compact orange tile.

| Token | Night | Day |
| --- | --- | --- |
| Background | #0c1018 | #eef2f8 |
| Surface | #141b27 | #e3eaf4 |
| Text | #f3f5fa | #152139 |
| Secondary text | #aeb9cb | #465977 |
| Accent | #ffad62 | #a84809 |
| Accent text | #251609 | #fff9f3 |

Controls use 5px radii, framed surfaces 8px, with restrained inset button depth. Orange is the action accent; the blue rim is scene lighting. Phosphor icons provide consistent controls. Existing locally served tool SVGs identify the actual tools.

## Structure and performance

`app/portfolio.css` supplies shared layout, forms, semantics and breakpoints. `app/game.css` supplies this visual direction. The full page stays in one selected day/night mode. The layout has explicit 820px and 600px collapse rules and 320px reflow checks.

The character appears immediately as an approximately 18 KB still rendered from the real local model. Desktop loads Three.js and the existing 1.34 MB GLB separately after the initial content. Mobile, reduced-motion and data-saving visitors receive the still until an explicit tap on the character. Real animation is capped at 30fps, pixel ratio capped at 1.5 (1.25 on narrow screens), shadow maps at 512px, and rendering stops outside the viewport or in a hidden tab. Paused/reduced motion renders only when input, lighting, theme or size changes. No runtime shader bloom or network font/CDN is used. Unused Tailwind-generated utilities are no longer emitted for the native-CSS pages.

## Accessibility and future content

Headings, copy and contact links render on the server. No scroll hijacking, forced intro or load gate hides them. All controls have accessible labels and focus indication. The character itself starts/stops its dance on click or Enter/Space. Rotation has drag/arrow alternatives and Home resets it; the separate toolbar has been removed. Reduced motion is observed live. Without JavaScript, the still, content and contact routes remain.

Published work uses real existing game artwork. Four planned records are absent from public listings/sitemap and have noindex previews. Case pages support real video, screenshots, contribution, evidence, credits and source links when the owner supplies them. No new game systems or videos were produced for this final scope.

Historical Figma exports describe earlier work, not this iteration. Existing character provenance remains in CREDITS.md; no new Meshy credits were consumed.

## Interaction and delivery update

The current contact route uses a short choice-based quest with Formspree delivery, not the former copy-only brief builder. The endpoint is public configuration in data/contact.ts. Submission requires a reply email, a short description and an explicit privacy acknowledgement. The homepage uses a four-card profile reader and a measured reversible FAQ accordion. Both preserve keyboard and reduced-motion paths.

Seven sourced pixel-art fighters use LuizMelo's original run/attack/idle frames (CC0), replacing the earlier Kenney stills. Seven entrances run automatically once per tab about fifteen seconds apart, with no floating Effects or replay controls. A repeating sword-combat vignette, rotating roles and illustrative Luau snippets run while their stage is visible. Reduced motion/data saving replace moving entrances with still portraits and stop the looping stage motion. Clicking the character controls only its dance. Profile cards use React Bits SpotlightCard, chapter art and compact tags while preserving keyboard controls. React Bits RotatingText powers roles; both upstream licenses are retained. Source/rights: design/COMBAT-ASSETS.md. No new paid generation was used.

Current owner revision: the brief, stage header, P1/spawn labels, speech bubble and visible instruction bar are removed. The character is the keyboard-accessible dance target. Seven sourced characters remain unboxed; reduced motion uses a gentle still appearance rather than a framed card. Day uses a compact generated solar orb, directed beam and unboxed quote. The torn screen-opening VFX is anchored below the copy and left of the avatar; it must also clear the service dock. Mobile places the cue over the copy above the avatar. The visible beams precede the warm palette at 6.6 seconds and cleanup finishes at 9.2 seconds. Asset prompts and production notes: design/cinematic/README.md.

The current sun cinematic has its own leaf component and `app/cinematics.css`. Its 5.1-second animation begins after the four-second white interval: distant sun, beam, quote flight, impact/hold, portal consumption and sun departure. Quiet variants preserve the milestones without large movement. The Night sequence now starts after the real sprite mounts, and its new per-tab counter is saved only after animation starts.


25 October revision: the owner rejected the previous ring/card composition. The hero intro, P1/spawn labels, speech bubble, instruction bar and framed sprite cameo are removed. Generated RGBA sun and screen-tear artwork replace the flat ring and emoji. The desktop impact is anchored in the lower-left hero gap and kept clear of the avatar; mobile places it over the copy, above the character. A narrow directed beam and unboxed spinning quote lead into the torn opening. Day impact is now at 5.4 seconds and cleanup at 9.2 seconds. Prompts, asset paths and provenance: design/cinematic/README.md. This supersedes earlier choreography notes.


25 October beam-and-story update: seven rays fan from the sun across the viewport while the page remains cool. The cinematic itself warms the page 2.6 seconds after mounting (6.6 seconds from Day activation), after the rays have extended. Full motion includes an expanding amber wash; reduced motion retains visible static beams instead of hiding the effect. Card titles and copy lead the layout, with a smaller animated source sprite and question-based next actions. A card selection or sprite click plays one bounded attack, including in quiet mode; normal visible cards play the source portrait/idle frames. Hidden/offscreen cards stop playback. The last card links directly to the enquiry. Fly-bys pause when the main hero leaves the viewport, keeping profile reading clear, and resume when the hero returns. No new assets or paid requests were needed.
