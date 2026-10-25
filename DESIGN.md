# ScriptLilla visual direction

Updated 25 October 2026 after the whole-site critique. Mode: Experience for work, Persuade for commissions, Operate for enquiries.

## Purpose and hierarchy

Game owners need to identify the developer, inspect actual work and open a scoped enquiry. The opening names Roblox scripting directly. Selected work follows immediately, before services. On a 390px phone its image begins near 670px. The avatar provides personality without competing with the work.

Homepage order: introduction → published work → compact services → process → visible biography → FAQ → contact. No repeated service dock, artificial code/combat panels, roaming characters, chapter counters or hidden biography. Proof remains the owner's next addition; planned records are never advertised as completed work.

## One identity

The original green-cap anime portrait remains the header/footer/browser logo, restored at the owner's request. The hero now uses the owner-supplied anime video. Orange stays the action accent. The separate cap icon and generated 3D replacement are not used on active pages.

Chakra Petch 700 carries angular game lettering; Geist carries readable body copy. Both are self-hosted through next/font. Sentence-case headings and plain labels replace repeated uppercase/two-colour formulas. Icons are Phosphor, tool marks Simple Icons. See CREDITS.md.

| Token | Night | Warm day |
| --- | --- | --- |
| Background | #0c1018 | #eee2c9 |
| Surface | #141b27 | #e4d6bb |
| Text | #f3f5fa | #2d2923 |
| Secondary | #aeb9cb | #5b5144 |
| Action | #ffad62 | #91430b |

`app/site.css` owns shared tokens and responsive layout. `app/cinematics.css` owns the one brief Day cue. Retired layered sheets are archived as text. Services use rows and native scope disclosures, not repeated large boxes. Work imagery and contributions lead. Biography stays readable without clicks. Certificates stay available under a closed disclosure.

## Motion and performance

The character is a local10-second silent H.264 clip with no renderer or GLB request. Desktop uses397KB at480×854; mobile uses189KB at320×568. A16KB WebP poster fills the reserved area before playback. Video plays inline while visible, pauses offscreen/hidden, and manual pause survives scrolling. Reduced-motion/data-saving visitors see a poster until activation. The native button gives click/Enter/Space pause/play without a toolbar. Failed loading keeps a still. Soft edge masks blend the source background into either theme without altering the supplied composition.

Seven creator-sourced CC0 heroes appear beside hovered controls, playing one short existing attack animation. Controls and labels do not move. Sprites are pointer-inert and hidden from assistive technology. Keyboard focus/reduced motion use still frames. Touch activates one short drop or left-to-right running reaction after a genuine button tap. Alternating touch reactions finish across internal navigation, automatically clear within850ms, never intercept input and do not delay the action. Swipes/cancelled gestures do not trigger them. Reduced motion uses a still for550ms. Hover reactions clear on leaving controls; stale image decodes are discarded.

Night is the default on reload, with memory-only theme continuity during internal navigation. The optional Day cue starts when both local VFX assets decode. Beams begin at 450ms, impact at 700ms, warmth at 1300ms, absorption at 1650ms, cleanup at 2700ms. The small opening clears the avatar. Keyboard/reduced motion uses still cues. Failure falls through to warm day; Night interrupts everything. No recurring roaming sequence or saved motion settings.

## Interaction and content

Contact offers immediate email/Discord plus a short three-step form. Desktop can show a supporting profile; mobile prioritises the form. Formspree errors preserve inputs and explain recovery. Draft restoration survives policy navigation/back/refresh, with consent excluded. No JavaScript gives direct contact links and a static character rather than dead controls.

Future proof is data-driven: local video with captions or privacy-enhanced YouTube, actual contribution, screenshots, credits and live/source links. Empty optional sections are absent. The official game thumbnail is labelled as artwork and is not a performance or revenue claim. No fake reviews, delivery guarantees or fabricated results.

## Verification limits

Chromium/axe, native keyboard interaction, 320–1440px layouts, both themes and mocked delivery are tested. Automated accessibility tests are evidence, not WCAG/ADA certification. Future videos require captions, permission and signed-out playback checks. The research-pack screenshots informed hierarchy; competitor scenes, marks and claims were not copied.
