# Current use —25 October2026

Only the creator-sourced hero sheets below are active, as small lazy-loaded button-hover reactions in button-heroes.tsx. One attack plays per hover; mobile taps alternate a bounded drop or left-to-right run using the original source frames. Reactions finish across internal navigation without delaying actions; keyboard/reduced motion uses a still. They never intercept input, drift across the page or store session progress. React Bits, old fly-bys and combat/code panels remain retired. The source/download records below are preserved as history.

# Combat and character asset provenance

Retrieved 24 October 2026 directly from LuizMelo, using each pack’s public free download. All seven creator pages explicitly permit commercial use under CC0. No franchise artwork or ripped anime footage is included.

- [martial-hero](https://luizmelo.itch.io/martial-hero) — CC0-1.0; original ZIP SHA-256 `65df84320dafb557fcc12aa9809177d86af78a46c37b25f8b44891d178802ee3`
- [martial-hero-2](https://luizmelo.itch.io/martial-hero-2) — CC0-1.0; original ZIP SHA-256 `0d12088a43072bf84fd07a43407dc114a747f661050dec80bbc134d54b2dfe39`
- [martial-hero-3](https://luizmelo.itch.io/martial-hero-3) — CC0-1.0; original ZIP SHA-256 `45ca3c5f89e7fdbdff1e1fd0b5c67db2ecaa8ad6ca061fd7f5ac740db18a8696`
- [hero-knight](https://luizmelo.itch.io/hero-knight) — CC0-1.0; original ZIP SHA-256 `bd4d86d880bd090f0c0c55eef64f6edb38f4ac34d2867d2c7ab853a816f99f74`
- [huntress](https://luizmelo.itch.io/huntress) — CC0-1.0; original ZIP SHA-256 `eecd8d0f471e4c9f6024325f337a3636c5446ebe0cf94bd4bceef7ccf41368b1`
- [wizard-pack](https://luizmelo.itch.io/wizard-pack) — CC0-1.0; original ZIP SHA-256 `41167557a3401e7156b6557cfec932457d333059c6f6393bf958b6b4fe3a2291`
- [medieval-warrior-pack](https://luizmelo.itch.io/medieval-warrior-pack) — CC0-1.0; original ZIP SHA-256 `1c1c6a5552792dc5fd85623ed98bb15a7347d57ad17345b048391eeac849ebc9`

`public/media/fighters/` contains local lossless WebP sprite sheets derived from the supplied PNG frames. Transparent cell margins were cropped, frames normalized to 128-pixel cells with nearest-neighbour sampling, and run/idle/attack sequences retained. `data/fighters.ts` records frame counts. Run cycles power seven once-per-tab fly-bys; original sword-attack and idle frames supply the decorative combat vignette. Idle portraits illustrate the introduction cards. These are sourced decorative assets, not evidence of a game system built by the portfolio owner. All 35 sheets total about 64 KB. No account, paid request, remote embed or tracking script was added.

The previous Kenney stills are retired from the public UI; their historical preparation notes remain in FLYBY-ASSETS.md.

# Reused UI code

React Bits by David Haz: https://github.com/DavidHDev/react-bits

- `src/ts-default/TextAnimations/RotatingText/RotatingText.tsx` and CSS
- `src/ts-default/Components/SpotlightCard/SpotlightCard.tsx` and CSS

Sources retrieved 24 October 2026 and vendored in `components/vendor/react-bits/` with the full MIT + Commons Clause license. This portfolio uses the components as part of its website, not as a component product. Adaptations: existing framer-motion import; automatic preference-aware role rotation; no automatic rotation while motion is suppressed or the stage is offscreen; pointer capability gating and cleanup for card lighting; existing site palette and card layout. New integration wrappers connect the sourced components/assets to the portfolio.

The seven entrances start automatically, run once in order about fifteen seconds apart, and never replay during that tab session. No floating Effects or replay controls are rendered. Reduced motion/data saving stop automatic sprite playback and use still portrait appearances with gentle fades. The avatar click controls only its dance. Only sequence progress is stored in the tab; no on/off preference is persisted.

Latest choreography: Night mode starts the first sourced character only after React has attached its visible sprite; per-tab progress is recorded after its animation starts. Seven characters appear fifteen seconds apart, once each. Day mode and hidden tabs pause the sequence. System reduced motion/data saving use still character portraits with opacity-only fades, rather than hiding all characters. The old v1 progress entry is removed because it could count unmounted sprites. The v2 entry contains only a count and next appearance time. Avatar dance clicks do not stop the independent ambient sequence.

Day first uses the former cool-white palette. Four seconds after activation, the licensed Twemoji sun descends from above at a small scale, grows and projects a beam. The quote spins in from the top-right and impacts a decorative portal at 5.6 seconds, warming the palette. It holds for reading, spirals into the portal while the sun retreats, and clears at 9.1 seconds. Phosphor StarFour supplies the shuriken silhouette. Keyboard/reduced-motion visitors receive still cues at the same milestones, without the flight, beam, zoom or rotating portal. Switching back to Night cancels every pending timer. No new downloads, paid requests or model generation were needed.


25 October revision: the owner rejected the previous ring/card composition. The hero intro, P1/spawn labels, speech bubble, instruction bar and framed sprite cameo are removed. Generated RGBA sun and screen-tear artwork replace the flat ring and emoji. The desktop impact is anchored in the lower-left hero gap and kept clear of the avatar; mobile places it over the copy, above the character. A narrow directed beam and unboxed spinning quote lead into the torn opening. Day impact is now at 5.4 seconds and cleanup at 9.2 seconds. Prompts, asset paths and provenance: design/cinematic/README.md. This supersedes earlier choreography notes.


25 October beam-and-story update: seven rays fan from the sun across the viewport while the page remains cool. The cinematic itself warms the page 2.6 seconds after mounting (6.6 seconds from Day activation), after the rays have extended. Full motion includes an expanding amber wash; reduced motion retains visible static beams instead of hiding the effect. Card titles and copy lead the layout, with a smaller animated source sprite and question-based next actions. A card selection or sprite click plays one bounded attack, including in quiet mode; normal visible cards play the source portrait/idle frames. Hidden/offscreen cards stop playback. The last card links directly to the enquiry. Fly-bys pause when the main hero leaves the viewport, keeping profile reading clear, and resume when the hero returns. No new assets or paid requests were needed.
