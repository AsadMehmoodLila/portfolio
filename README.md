# AsadLilla Portfolio — Professional Rebuild

A static portfolio built for GitHub Pages and `asadlilla.me`.

## What changed

- Rebuilt from scratch with a specific editorial design instead of a generic portfolio template.
- Real project case studies with concrete contributions and outcomes.
- Actual certificate images, including a privacy-safe redacted version of the soft-skills certificate.
- Smooth scrolling, restrained reveal motion, an accessible mobile menu, scroll progress, and certificate lightbox.
- Responsive layouts for desktop, tablet, and mobile.
- Print-ready résumé page that can be saved as PDF from the browser.
- No particles, fake 3D art, glowing blobs, typewriter effects, or AI-generated imagery.

## Before uploading

Open `js/site-data.js` and add your professional email. Optional LinkedIn and direct Roblox game links can also be added there.

```js
window.SITE_DATA = {
  email: "your@email.com",
  github: "https://github.com/AsadMehmoodLila",
  linkedin: "",
  robloxGame: "DIRECT_ROBLOX_GAME_LINK"
};
```

Leaving a value empty hides that link automatically.

## Replace the live GitHub Pages website

1. Extract this ZIP.
2. Open your GitHub `portfolio` repository.
3. Delete the old website files, but keep the repository itself.
4. Upload **everything inside this extracted folder** so `index.html` is at the repository root.
5. Commit the upload.
6. Keep GitHub Pages set to `main` and `/(root)`.
7. Keep the `CNAME` file. It already contains `asadlilla.me`.

GitHub Pages will deploy the update automatically. Your Namecheap DNS records do not need to change.

## Files

- `index.html` — main portfolio
- `projects.html` — detailed case studies
- `resume.html` — printable résumé
- `css/site.css` — full design system and responsive layout
- `js/site.js` — animations, navigation, modal, and progressive enhancement
- `js/site-data.js` — editable links/contact data
- `assets/images/certificates/` — public certificate images

## Privacy

The original soft-skills certificate contains a CNIC number. This ZIP includes only a redacted public image. Do not upload the original unredacted PDF to a public GitHub repository.

## Third-party design resources

See `CREDITS.md`. No third-party template was copied.
