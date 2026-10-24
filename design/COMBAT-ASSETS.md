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

Sources retrieved 24 October 2026 and vendored in `components/vendor/react-bits/` with the full MIT + Commons Clause license. This portfolio uses the components as part of its website, not as a component product. Adaptations: existing framer-motion import; shared Effects opt-in for role rotation; no automatic rotation while Effects is off or stage is offscreen; pointer capability gating and cleanup for card lighting; existing site palette and card layout. New integration wrappers connect the sourced components/assets to the portfolio.

`Effects off` defaults for reduced-motion and data-saving preferences. The control remains available for explicit opt-in. It immediately controls the decorative role/code/combat motion and remaining fly-bys. The seven automatic appearances do not loop or replay on refresh. Once finished, a separate labelled replay control allows intentional replay. Manual on/off choice lives in the tab’s sessionStorage and contains no personal information.
