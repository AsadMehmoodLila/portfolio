# Commission portfolio review, 24–25 October 2026

## Homepage choreography and owner branding

Latest owner revision: the seven sourced characters now start in Night only after React attaches each sprite. Progress is written when the real animation starts, using scriptlilla-hero-session-v2. The earlier progress entry is discarded because it could count unseen characters. Day/hidden tabs pause the sequence. Reduced motion/data saving display still portrait appearances with opacity-only fades. Avatar clicks affect the dance only, leaving the independent code, combat and character sequence running.

The revised Day cinematic starts with four seconds of the cool-white palette. A generated solar orb descends and grows, fires a directed narrow beam, and the unboxed quote spins in from the top-right. At 5.4 seconds the quote impacts a torn screen opening in the lower-left hero gap, clear of the avatar column and service dock, and the palette warms. The quote holds above the opening, then drops and shrinks into its dark centre while the sun withdraws; everything clears at 9.2 seconds. Keyboard/reduced-motion use follows the same story with still cues. Switching back to Night cancels all timers. Asset prompts, paths and provenance are recorded in design/cinematic/README.md. The previous gradient ring, quote card and Twemoji cue were rejected and removed. No Meshy credits were used.

Validation: production build/type checks; 56 page/theme/viewport/dialog checks, 57 internal links and 12 interaction groups, with no reported axe violations, script errors or unexpected external requests. Dedicated browser tests verify all seven entrances, fifteen-second spacing, no refresh replay, new-tab start, Night/Day scheduling, reduced-motion/data-saving variants, avatar independence, quote fit, portal visibility and shrinking consumption, cleanup and cancellation. Real WebGL click/keyboard dance tests and enquiry-draft restoration also pass. Delivery is mocked in contact tests; no additional live enquiry was sent. Earlier revision notes below are historical and may describe superseded controls. The updated local mobile simulation (390px, 4x CPU, 1.5 Mbps/40ms, no compression) measured about 3.04–3.08 seconds FCP/LCP, zero observed layout shift and no automatic GLB transfer. This is a controlled local result, not field performance.

## Draft restoration and visible sun cue

The contact draft now survives Privacy Policy navigation, browser Back and refresh. A functional per-tab entry stores the current step, choices, brief and reply email with a 24-hour restore window; consent and delivery state are excluded. Confirmed Formspree acceptance and Clear draft remove it. Invalid or expired entries are removed on form access. A memory fallback supports internal navigation when browser storage is blocked. The privacy/cookie notices and form explain the storage. No enquiry is transmitted before explicit submission.

The earlier Day-mode cue was completely suppressed when reduced motion was requested. Day switches now show a still sun/message for reduced-motion and keyboard use, and the existing animation for ordinary pointer activation. The cue lasts 2.4 seconds, never intercepts clicks and is cancelled on switching back. Desktop/mobile regression tests cover both paths. Draft regression tests cover both privacy links, Back, choices, step, refresh, consent, mocked sending, manual clear, expiry and blocked storage. No live Formspree enquiry was sent during these tests.

Scope: the existing local repository, owner-provided research pack, redesigned Next.js pages, static export, content workflow and local Chromium browser. The owner's latest instruction excludes gameplay systems and video production; the website provides the sections and templates for those additions.

## Implemented

- ScriptLilla identity and Roblox scripting offers, with the supplied Discord handle, verified server invite and existing public email
- Homepage with services, genuine published-work artwork, contribution summary, process, about, tool logos, FAQ and contact
- Contact page with direct Discord/email routes and an optional brief builder. Required project/service/description, optional context, explicit unchecked acknowledgement, validation focus, selectable fallback, clipboard action and email draft. No automatic sending or form backend
- Existing Roblox case study plus four planned system/flagship records. Drafts do not appear in the homepage or sitemap; preview pages have noindex/nofollow. Static URLs are not confidential
- Shared media player for local MP4/WebM with captions, or an individually activated YouTube privacy-enhanced embed. No remote player/thumbnail request before activation. Close unloads the embed and restores focus. Real local-source errors produce a direct-file fallback
- Day/night throughout, keyboard navigation, skip link, native FAQs/certificate dialog, reduced motion, responsive layouts, descriptive alternatives and meaningful labels
- Current privacy, terms, cookie, cancellation/refund and accessibility pages, retaining the five existing URLs
- Original typographic brand/social assets and locally served tool icons. No fabricated client logos, reviews, video footage or quantified results
- Next.js patched from 16.4.0 to 16.4.3 after an advisory scan; lockfile updated. Point-in-time npm audit: zero known vulnerabilities

## Verification

`npm run build` succeeds, including the content gate. TypeScript succeeds. `audit/commission-browser-results.json` records 52 route/device/theme combinations plus four native-dialog checks: **56 checks, zero automated WCAG A/AA violations, no horizontal overflow, no broken images, no runtime errors and no unexpected external requests**. It also records 56 internal route/anchor URLs and 12 interaction groups.

The tested routes include the homepage, about, contact, all five case pages and all five policy pages. Additional reflow checks cover 320, 768 and 1024px. Interaction checks cover service preselection, required fields, consent, actual clipboard readback, email contents, unsafe reference rejection, clipboard denial, clearing on reload, menu Escape/focus return, FAQs, theme retention through navigation and certificate focus return. Direct contact and certificate source links remain available without JavaScript.

`audit/media-player-results.json` records tests of the actual shared component using private fixtures: no pre-activation external request, keyboard activation, exact provider/referrer configuration, unload/focus restoration, local controls/caption track and an actual invalid-media fallback. Provider responses are intercepted: this does **not** verify a future real video's visibility, embedding permission, captions or remote playback.

Screenshots in ignored `audit/screenshots/` provide local visual checks of desktop/mobile, day/night, contact, about and the published case. Text/control contrast and mobile form sizing received a separate final check. Automated results are engineering evidence, not a complete assistive-technology or legal certification.

## Content and operational limits

The existing game's artwork and scripting-role descriptions come from the owner's previous portfolio and provenance records. No new multiplayer, persistence, exploit-resistance, performance or revenue result is claimed. The research pack and competitor images remain local research and are not copied into the website. Existing certificate scans retain their previous redaction; issuer authenticity/reproduction permission has not been independently established.

Systems, recordings, screenshots and unlisted uploads will be supplied later by the owner. `CONTENT-GUIDE.md` explains how to fill one data record and publish it without editing the page layout. The build rejects malformed video URLs, duplicate/invalid slugs, missing required poster/alternative text, missing local assets and conflicting video providers. A syntactically valid YouTube ID cannot prove an actual video exists; check the real upload while signed out.

The final owner-approved game direction reuses the original local model in a new deferred character stage. The older avatar component is not used. The scene has independent lights, motion and keyboard/drag rotation, with an 18 KB still. Actual draw-call instrumentation confirms that offscreen rendering stops; reduced motion stops animation and data saving blocks automatic model loading. Results: audit/character-results.json. No additional paid generation is used. No new Figma revision is claimed; historical Figma exports describe the previous version.

## Privacy and legal boundaries

No optional analytics or application cookies/storage are enabled on ordinary visits. Therefore no site-wide cookie banner is displayed. A future YouTube video uses a separate disclosed activation choice and an external-watch alternative. Hosting, email, Discord and activated video still involve provider processing. Reassess provider behaviour and applicable consent requirements when adding actual videos or any new tracking. [ICO cookie guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/) distinguishes necessary storage from optional storage and requires a clear active choice where consent applies.

The owner confirmed an individual portfolio and no website sales; current commissions are enquiries with separate written agreements. No registered company, street address, fixed deposit, turnaround or blanket non-refundable policy is invented. Enquiry retention needs an actual operating schedule. Any paid agreement must establish scope, acceptance, payment, IP/asset licensing, support, cancellation and applicable mandatory rights before payment. Consumer and cross-border obligations depend on the actual parties and transaction. The prior `audit/AUDIT.md` contains dated jurisdiction research; it must not be mistaken for a fresh gazette/legal-opinion check or a guarantee of compliance.

This is a technical implementation and policy update. It cannot eliminate legal liability or certify compliance in every jurisdiction. A local preview/build does not publish to the live domain; deployment follows the repository's existing main-branch GitHub Pages workflow.

## Final game-interface performance pass

Unused Tailwind utility output and an extra downloaded monospace/display weight were removed. The static export's initial CSS fell from roughly 61 KB to 51 KB. Current mobile simulations at 390px with 4x CPU throttling, 1.5 Mbps download and 40ms latency recorded FCP/LCP around 2.16-2.20 seconds and CLS 0. The local server does not compress responses; these are controlled local measurements, not field Core Web Vitals, a global speed ranking or a live-domain guarantee. Details and resource timing: audit/performance-results.json. Mobile uses the lightweight preview until explicit activation, avoiding an automatic 1.34 MB model transfer. Desktop defers 3D beyond the initial content. All 56 browser checks passed again after the final CSS/font changes.

## Live enquiry and interaction update, 24 October 2026

The owner supplied https://discord.gg/sKfzTnPVn2 and a Formspree endpoint from their logged-in integration screen. The three-step contact flow collects a service, optional rough budget/timing, a short description and reply email, with an unchecked privacy acknowledgement. It POSTs to the public form ID in data/contact.ts using no browser credentials; no secret/API key is shipped. Success is shown only after Formspree returns ok:true. One clearly labelled owner-authorised test returned HTTP 200 with ok:true. This proves provider acceptance, not independently confirmed inbox placement. No Discord webhook is exposed; the Discord alternative opens the supplied server.

The contact UI has labelled choices, field validation/focus, sending/accepted/error/timeout/rate-limit states, duplicate-send prevention and direct alternatives. Twelve stage/device/theme accessibility scans and payload/error tests are recorded in audit/interaction-upgrade-results.json, along with profile navigation, FAQ open/close/rapid reversal, default night and no-JavaScript alternatives. All 56 route/dialog checks also pass in audit/commission-browser-results.json. Browser delivery tests intercept Formspree rather than sending repeated test emails.

Homepage paragraphs are condensed into four short profile cards with previous/next, topic buttons and keyboard support. FAQ openings/closings use 220ms measured height animation and subtle answer movement, cancelling on reversal. Keyboard and reduced-motion activation is instant.

Seven decorative caped characters come from Kenney's CC0 Blocky Characters pack, with local capes, poses and renders. Provenance: design/FLYBY-ASSETS.md and assets/licenses/kenney-blocky-CC0.txt. Total sprite weight is about 73 KB; only the next sprite is requested as needed, with no added runtime 3D scene. They are pack characters, not branded Batman/Marvel/DC assets. The overlay cannot intercept clicks. audit/flyby-results.json verifies seven once-per-tab passes, fifteen-second spacing, completion, refresh suppression, new-tab restart, off control, reduced motion and data saving. One disclosed sessionStorage object holds counts, due time and the off choice; no personal data or tracking ID. Policies reflect the processor and per-tab state.


## 24 October 2026 — Effects repair and sourced combat

Final owner revision: the floating Effects/replay controls described in the initial repair below have been removed. Seven entrances now run automatically once per tab with no replay UI. The existing avatar motion control pauses/resumes decorative animations, including on the static mobile preview without loading the model. Only sequence progress is stored. Day mode uses warm cream/amber, a warmer 3D platform, and a brief sourced Twemoji sun/beam with an existing licensed ninja attack and “Destroyed that flashbang” caption. Switching back cancels the effect; reduced-motion mode skips it. The revised warm palette passed 56 page/theme/viewport checks and 57 link checks with no reported accessibility violations. Desktop/mobile sun-strike tests confirm cleanup, cancellation, default night and the reduced-motion fallback. Public asset credits and full third-party UI/graphics terms are linked from the footer.

Fixed the disabled Effects control: reduced-motion/data-saving visitors now get a quiet default with a working explicit opt-in. The shared control stops the remaining fly-bys, role rotation, decorative code updates, combat sprites and card spotlight. Seven sourced run cycles appear once per tab, with a separate explicit replay button after completion. Refresh does not automatically replay them. Live system reduced-motion changes stop effects.

Reused LuizMelo’s original CC0 sprite animations for seven distinct fighters and a repeating decorative sword-fight vignette. No franchise assets, external embeds or additional paid generation were used. React Bits RotatingText/SpotlightCard sources and their full MIT + Commons Clause license are retained locally; card chapter art/tags/progress and mobile layout are updated. Rotating text is loaded on demand, not when effects are off. Provenance: design/COMBAT-ASSETS.md.

Validation: production build/type checks; 56 page/theme/viewport/accessibility checks, 56 link checks and 12 interaction groups with no reported violations; four contact/profile/FAQ interaction configurations; seven-fly-by/replay/reduced-motion tests; actual advancing sprite/role/code playback and stop/persistence/offscreen tests; WebGL dance, pause, rotation, lights, theme, offscreen and data-saving tests. WebGL pixel hashes now use the canvas’s existing capture mode so independent DOM effects are not mistaken for a moving model. Browser contact tests mock Formspree delivery; no additional live enquiry was sent.

Local uncompressed 390-pixel tests under 4× CPU throttling and 1.5 Mbps/40 ms reported approximately 2.7 s FCP/LCP, zero observed layout shift, and no automatic mobile GLB request. These are local lab observations, not a guarantee of live network performance or a fastest-site claim.


25 October revision: the owner rejected the previous ring/card composition. The hero intro, P1/spawn labels, speech bubble, instruction bar and framed sprite cameo are removed. Generated RGBA sun and screen-tear artwork replace the flat ring and emoji. The desktop impact is anchored in the lower-left hero gap and kept clear of the avatar; mobile places it over the copy, above the character. A narrow directed beam and unboxed spinning quote lead into the torn opening. Day impact is now at 5.4 seconds and cleanup at 9.2 seconds. Prompts, asset paths and provenance: design/cinematic/README.md. This supersedes earlier choreography notes.
