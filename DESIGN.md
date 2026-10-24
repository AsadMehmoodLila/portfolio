# Current portfolio design

Updated 24 October 2026. The owner explicitly rejected the restrained editorial draft and approved the stronger game-interface direction during the visual iteration.

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

The character appears immediately as an approximately 18 KB still rendered from the real local model. Desktop loads Three.js and the existing 1.34 MB GLB separately after the initial content. Mobile, reduced-motion and data-saving visitors receive the still until explicit Explore character. Real animation is capped at 30fps, pixel ratio capped at 1.5 (1.25 on narrow screens), shadow maps at 512px, and rendering stops outside the viewport or in a hidden tab. Paused/reduced motion renders only when input, lighting, theme or size changes. No runtime shader bloom or network font/CDN is used. Unused Tailwind-generated utilities are no longer emitted for the native-CSS pages.

## Accessibility and future content

Headings, copy and contact links render on the server. No scroll hijacking, forced intro or load gate hides them. All controls have accessible labels and focus indication. The character itself starts/stops its dance on click or Enter/Space. Rotation has drag/arrow alternatives and Home resets it; the separate toolbar has been removed. Reduced motion is observed live. Without JavaScript, the still, content and contact routes remain.

Published work uses real existing game artwork. Four planned records are absent from public listings/sitemap and have noindex previews. Case pages support real video, screenshots, contribution, evidence, credits and source links when the owner supplies them. No new game systems or videos were produced for this final scope.

Historical Figma exports describe earlier work, not this iteration. Existing character provenance remains in CREDITS.md; no new Meshy credits were consumed.

## Interaction and delivery update

The current contact route uses a short choice-based quest with Formspree delivery, not the former copy-only brief builder. The endpoint is public configuration in data/contact.ts. Submission requires a reply email, a short description and an explicit privacy acknowledgement. The homepage uses a four-card profile reader and a measured reversible FAQ accordion. Both preserve keyboard and reduced-motion paths.

Seven sourced pixel-art fighters use LuizMelo's original run/attack/idle frames (CC0), replacing the earlier Kenney stills. Seven entrances run automatically once per tab about fifteen seconds apart, with no floating Effects or replay controls. A repeating sword-combat vignette, rotating roles and illustrative Luau snippets run while their stage is visible. Reduced motion/data saving suppress automatic playback. Clicking the character to stop its dance also pauses decorative motion. Profile cards use React Bits SpotlightCard, chapter art and compact tags while preserving keyboard controls. React Bits RotatingText powers roles; both upstream licenses are retained. Source/rights: design/COMBAT-ASSETS.md. No new paid generation was used.

Current owner revision: Day starts with the former cool-white palette, the sourced sun drops in at four seconds, throws the Phosphor star and quote, and the page turns warm at five seconds. Pending effects cancel on a switch back to Night. Keyboard/reduced-motion users see still effects on the same schedule. The header/footer/tab mark now uses the owner's green-cap portrait, and the commission invitation is a small game-style ticket. First entry has a short spawn/fade; the first of seven once-per-tab character entrances lasts longer. No new model generation or paid credits were used.
