# Retired fly-by assets

These Kenney stills were replaced on 24 October 2026 by the seven animated LuizMelo fighters. Current sources and behavior: [COMBAT-ASSETS.md](COMBAT-ASSETS.md). The following records the earlier version.

## Historical decorative hero fly-bys

Source: Kenney Blocky Characters 2.0, https://kenney.nl/assets/blocky-characters
Direct download: https://kenney.nl/media/pages/assets/blocky-characters/8369c0cf30-1749547469/kenney_blocky-characters_20.zip
Creator: Kenney, www.kenney.nl
Licence: CC0 1.0, archived verbatim in assets/licenses/kenney-blocky-CC0.txt
Source archive SHA-256: 5E123859AA0C1598342B600C6DB197024A1D63EB9EC531398B310725F589887E
Retrieved: 24 October 2026

Seven local web sprites are renders of character-a/j/n/o/p/q/r from this pack, with locally authored generic capes, a flying pose, local camera and lighting. They are caped game characters, not Batman or another licensed comic franchise, and do not imply endorsement. They are decorative visuals, not completed scripting-client projects. Models remain in ignored local tools; only small locally hosted WebP renders ship to the site. scripts/render-flyby.mjs records the original rendering process. No runtime 3D engine or remote asset request is added by these sprites.

Sequence: first available on entry, then approximately every 15 seconds while the homepage is visible. Each of seven sprites runs once per tab session; no endless loop, sound, flashing, click interception or replay on refresh. New browser sessions start again. An Effects control stops future passes. Reduced motion and data saving suppress them. Progress is one disclosed sessionStorage object, with memory fallback when storage is blocked.
