---
name: "Asad Mehmood Portfolio"
description: "A day/night avatar-led portfolio for Roblox development, AI studies, and practical software."
colors:
  burnt-orange: "#b83e1d"
  offwhite: "#f5f5f2"
  stage: "#ebebe5"
  ink: "#20201e"
  muted: "#595953"
  border: "#a6a69c"
  divider: "#c9c9bf"
  white: "#fff"
  control-hover: "#e4e4dc"
  night-bg: "#111414"
  night-soft: "#1a2020"
  night-text: "#f0eee7"
  night-muted: "#c0bcb3"
  night-border: "#626b66"
  night-divider: "#36423d"
  night-accent: "#ff966b"
  night-control-hover: "#29312e"
  avatar-warm: "#ecb58a48"
  avatar-cool: "#bdc6d030"
  night-avatar-warm: "#d4673538"
  night-avatar-cool: "#4a78a541"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(4.1rem, 6.65vw, 6rem)"
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.5rem, 4vw, 3.6rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  project-title:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 600
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  reading-body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.85
  action:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 600
  link:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 550
  navigation:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
  toggle:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.78rem"
rounded:
  control: "4px"
  media: "6px"
  dialog: "8px"
  stage: "18px"
  capsule: "999px"
spacing:
  tight: "8px"
  compact: "12px"
  control-gap: "14px"
  inset: "18px"
  row: "20px"
  action-gap: "22px"
  panel: "24px"
  grid: "28px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.offwhite}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.burnt-orange}"
    textColor: "{colors.offwhite}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.link}"
    padding: "8px 0"
  navigation-link:
    textColor: "{colors.muted}"
    typography: "{typography.navigation}"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.toggle}"
    rounded: "{rounded.capsule}"
    padding: "8px 12px"
  icon-control:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.capsule}"
    padding: "10px"
  lights-control:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.toggle}"
    rounded: "{rounded.capsule}"
    padding: "10px 14px"
  lights-control-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.offwhite}"
  button-primary-night:
    backgroundColor: "{colors.night-text}"
    textColor: "{colors.night-bg}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-primary-night-hover:
    backgroundColor: "{colors.night-accent}"
    textColor: "{colors.night-bg}"
  tool-mark:
    textColor: "{colors.ink}"
    size: "38px"
  certificate-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "20px 0 0"
  certificate-dialog:
    backgroundColor: "{colors.offwhite}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    padding: "{spacing.panel}"
  dialog-close:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.offwhite}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
---

# Design System: Asad Mehmood Portfolio

## Overview

This records the implemented replacement world: an editorial portfolio with visitor-controlled day and night modes for a Roblox developer and AI student, with a real original dancing 3D avatar and authentic game artwork. The user rejected the prior dark, static sculpture-led direction and generic-looking design. This record refreshes that superseded system from the current code; it asserts no approved metaphor, concept roll, FORM seed, quality-bar board, or reference composition.

The avatar carries the dimensional, playful identity while the surrounding interface stays readable and concise. Projects, certificates, skills, and contact use ordinary document structure and working links. PRODUCT.md and user-supplied content remain the factual authority; this document establishes visual and interaction rules, not new biographical claims.

**Key Characteristics:**

- Shared semantic colors: offwhite, ink, and burnt orange by day; deep neutral surfaces, warm pale text, and peach-orange by night.
- Geist owner-name display with compact, readable supporting copy.
- Original rigged avatar on an open illuminated stage with independent Lights, pause/play, and reset controls.
- Authentic game artwork, certificate assets, and twelve self-hosted tool marks.
- Flat divided project rows, native links, disclosure navigation, and a native certificate dialog.

Evidence: `app/globals.css`, `app/page.tsx`, `app/layout.tsx`, the current avatar, navigation, legal-footer and section components, and `audit/screenshots/{desktop,mobile}-{hero,tools,home,privacy}.png\` and \`audit/screenshots/{desktop,mobile}-night-{hero,tools,home,privacy}.png`. Scope and provenance are recorded in `audit/avatar-review-scope.md`.

## Colors

The palette is warm and restrained; the authentic artwork supplies its own richer colors.

### Primary

- **Burnt orange** supplies the surname display, primary-button hover, text-link hover, selection, and keyboard focus. It connects the interface to the orange avatar clothing without recoloring project artwork.

### Neutral

- **Offwhite** is the document, fixed navigation, policy, and dialog background.
- **Stage** is the day soft-surface token used by the theme hover and avatar control tray; the avatar canvas itself is transparent.
- **Ink** provides headings, primary actions, and strongly emphasized copy.
- **Muted** provides descriptions and supporting metadata.
- **Border** outlines controls and the dialog; **divider** separates navigation, project rows, and sections.
- **White** remains a fixed certificate-image surface and certificate-image overlay text. **Control hover** is the day hover fill for inactive avatar controls.

### Night mode

The night tokens replace the page background, soft surface, text, muted text, borders, dividers, accent, and control-hover fill together. The same layout and typography stay in place. Primary actions invert to warm pale text-token backgrounds with deep neutral text; hover uses the night accent against the night background. Keep each mode's paired foreground and surface roles intact.

Avatar warm/cool tokens are translucent light pools behind the model, changing with the page theme. They belong to the real avatar stage rather than arbitrary document backgrounds.

**The Single Accent Rule.** Treat the legacy blue, cyan, purple, and green variables as aliases of the active accent. They do not establish additional interface accents.

## Typography

**Display Font:** Geist, with sans-serif fallback.
**Body Font:** Geist, with sans-serif fallback.

The owner name carries the largest weight and tightest leading. Supporting headings remain substantial, while prose, project details, and controls stay compact. Geist Mono is loaded by the app but does not define a visible role on the current homepage or policy pages.

### Hierarchy

- **Display:** the frontmatter display role is the desktop owner name. At 1000px it changes to `clamp(3.5rem, 7.1vw, 5.5rem)`; at 820px to `clamp(3.5rem, 8.5vw, 5rem)`; at 640px to `clamp(3.7rem, 13.4vw, 5.5rem)`, retaining the tight leading.
- **Headline:** the frontmatter headline role serves certificates, skills, and about. Selected work uses `clamp(2.5rem, 4.2vw, 4rem)` and 1.06 leading. These become 2.5rem and 2.6rem respectively on mobile.
- **Project title:** compact software headings use the recorded role; the featured game uses `clamp(2.1rem, 3vw, 3rem)`, weight 650, and 1.09 leading.
- **Body:** common section descriptions use the recorded body role. The hero introduction uses 1.55 leading; about copy uses 1.75. Text measures vary with function: featured-game prose 39ch, project prose 44ch, about prose 55ch, and section introductions 58ch.
- **Reading body:** policies use the frontmatter reading role, a maximum 70ch paragraph measure, and overflow wrapping. At 640px, paragraphs become 1rem.
- **Action and navigation:** use the recorded roles. Supporting avatar help and captions are smaller than controls and do not carry essential project copy.

**The Visible Copy Rule.** Headings and descriptions remain visible without entrance animation. The current reveal wrapper is a plain document wrapper.

**The Heading Punctuation Rule.** Do not append full stops to headings or the owner name. Preserve meaningful punctuation such as the contact question mark.

## Layout

The shared centered shell is `min(1280px, calc(100% - 80px))`. At 1000px it becomes `calc(100% - 56px)`; at 640px it becomes `calc(100% - 40px)`. Policy reading content has an additional 850px maximum width.

The desktop hero pairs copy and avatar in a 1.12:1 grid with a 40px gap. At 640px it becomes a single column with a 28px gap. The desktop introduction has two columns; it becomes one column at 1000px, then returns to two compact columns at 640px. The avatar viewport is 520px high by default, 460px at 1000px, 420px at 820px, and 440px at 640px.

The featured-game grid uses a 1.45:1 ratio and 54px gap, then stacks at 640px. Software entries use three divided columns with a 50px gap; mobile entries stack with a 16px gap. Certificates use two columns with a 36px gap and become a single list at 640px. Each certificate's image and metadata remain side by side on mobile. The twelve tool marks use six columns, four at 1000px, and three at 640px. The detailed skills below retain four groups, becoming two at 820px. About and contact collapse to single-column layouts at 640px.

Spacing follows the component's reading needs rather than one invented universal section interval. Desktop section top padding spans 45–85px; compact sections generally use 40–52px. Dividers and whitespace separate related material. The fixed header is 90px high by default and 80px at 820px; native anchor scrolling reserves 110px.

## Elevation & Depth

Interface surfaces use no CSS box shadows. Tone, thin rules, and whitespace separate content. Dimensional depth belongs to the actual avatar: hemisphere, key, and rim lighting, mesh shadows, soft warm/cool background light pools, and a ground shadow material at opacity 0.14 by day and 0.32 by night. The native certificate dialog uses an ink backdrop with alpha `#20201ee6`, without a fabricated elevated-card shadow.

**The Real Depth Rule.** Preserve depth in the rendered 3D artifact and readable flat interface surfaces. Do not replace the requested dancing avatar with a static sculpture.

## Shapes

Primary actions use the small control radius, artwork uses the media radius, and the dialog uses the dialog radius from the frontmatter. The theme button, avatar control tray, and its individual buttons use capsule rounding. Project rows and certificate metadata are open, divided document structures rather than rounded panel stacks. The brand initials sit in a square outlined mark rotated −8 degrees.

The avatar viewport uses a transparent, open stage with modest stage rounding. It has no enclosing arch or decorative frame. Warm/cool light pools soften the space around the actual model; the active Lights control governs this effect. Keyboard focus still supplies the shared visible outline.

## Components

### Buttons and links

The primary action uses ink against offwhite, a thin ink border, and the recorded control shape and padding. Its minimum height is 52px, with a 22px icon gap. Hover changes background and border to the active accent and text to the active page-background token over 180ms with `cubic-bezier(.23,1,.32,1)`. Active state translates downward 1px.

Supporting text links remain underlined with an 18px icon gap and minimum height 44px. Hover changes to the accent. Use inline SVG icons for arrows and controls.

**The Focus Rule.** Anchors, buttons, and the ready avatar viewport use an active-accent outline (3px, offset 5px) on keyboard focus. The skip link becomes visible on focus.

### Navigation

The desktop header is an opaque active-background fixed shell, divided below, with owner identity, the link row, and theme/GitHub actions. At 820px the link row and GitHub action yield to a 44px menu button while the theme button stays available. The disclosure announces expanded state; its links close the menu, and Escape closes it and restores the button's focus. Mobile links have a 48px minimum height. The legal footer uses smaller underlined policy links in normal document flow.

### Theme control

The capsule theme button uses an 18px sun/moon SVG, a concise Day/Night destination label, and 44px minimum dimensions. Hover fills the button with the active soft surface. Its accessible name states the destination and its pressed state reflects night mode. At 360px the visible word is hidden, while the accessible name remains.

Day is the initial state. The shared React provider keeps the visitor's selection through internal Next.js navigation; no cookie or browser-storage preference is written. Reload starts in day mode. The toggle updates the root theme, native color scheme, and browser theme color. Policy headers expose the same control. Without JavaScript, theme and avatar controls are hidden rather than presented as inactive controls.

### Avatar stage

Render the original `/media/avatar-dance.glb`; `/media/avatar-poster.webp` supplies loading and failure fallback. The stage becomes keyboard-focusable after loading and exposes rotation instructions through its screen-reader description. Production provenance stays in CREDITS.md; do not show Meshy/Blender credit, loading, rotation, or reduced-motion captions below the avatar.

Drag rotates horizontally; Left/Right change yaw by 0.2 radians. Home and the reset button restore −0.2 radians. The control tray contains a visible icon-and-text Lights button and icon-only pause/play and reset buttons. All have accessible names; toggles announce their pressed states. Controls stay disabled until loading completes.

Lights is independent of dance and page theme. It starts on, uses a filled active capsule, and toggles the real key/rim/ambient intensities and the stage light pools. Night mode warms the key light, cools the rim and ambient light, and strengthens the ground shadow. Lighting settles smoothly unless reduced motion requests an immediate change. Preserve the centered full-body camera and real dimensional artifact.

The dance defaults to playing unless reduced motion is requested. Reduced motion starts paused; explicit play remains available. Hidden or offscreen rendering skips work. Keep the static fallback and screen-reader failure description when WebGL or loading is unavailable.

**The Motion Preference Rule.** Preserve visible content, native scrolling, and actual avatar controls. Reduced motion disables smooth scrolling, shortens CSS transitions, removes artwork hover scaling, defaults the dance to stillness, and makes renderer lighting changes immediate.

### Work and certificates

The featured-game image links to the real Roblox game and uses authentic artwork, with a visible action on an offwhite inset. Fine-pointer hover scales it to 1.035 over 500ms; the mobile image aspect ratio changes from 16:10 to 16:11. Software projects remain concise divided rows with real source/demo destinations.

Certificate triggers are border-top, transparent buttons with authentic image and metadata. Fine-pointer hover scales thumbnails to 1.025 over 250ms. Opening uses native `showModal()`; Escape, close action, or a click outside its bounds dismisses it. Closing restores the trigger's focus. The dialog contains the full image with contain fitting, a maximum image height of 60dvh, a maximum dialog height of 90dvh, and a maximum width of `min(1000px, calc(100vw - 32px))`. Padding reduces from 24px to 18px at 640px.

### Skills and policy reading

The tool wall shows twelve actual tool identities using self-hosted Simple Icons SVG masks and visible names. Marks are 38px on desktop and 33px on mobile; two starting marks use the active accent, and fine-pointer hover accents and lifts a mark 3px over 180ms. These are static tool identities, not fake controls or proficiency scores. The detailed skill groups below retain slash-separated text. Policies use a narrower reading column, underlined contents links, shared palette, and ordinary headings. There are no live input fields in the current portfolio.

## Do's and Don'ts

### Do:

- Do use the frontmatter tokens and current component rules for new surfaces.
- Do preserve the original animated avatar, authentic game artwork, and certificate assets.
- Do keep copy visible, actions functional, focus visible, and motion controls accessible.
- Do preserve native disclosure and dialog behavior, including focus restoration.
- Do keep concise project descriptions and the narrower policy reading layout.
- Do preserve day/night color pairings, the independent Lights control, and accessible icon-button names.
- Do use authentic tool marks with readable names and keep headings free of trailing full stops.

### Don't:

- Don't treat legacy accent aliases or unused old sections as additional design-system roles.
- Don't replace the requested dancing avatar with a static sculpture.
- Don't invent project outcomes, metrics, testimonials, or factual portfolio claims.
- Don't add fake interface panels or controls for flows this portfolio does not provide.
- Don't require animation to reveal copy or ignore reduced-motion preferences.
- Don't restore visible production credits, motion-preference captions, or the superseded avatar arch.
- Don't persist theme choices to cookies or browser storage without updating the product behavior and privacy documentation.
