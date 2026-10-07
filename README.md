# Asad Mehmood portfolio

Next.js static portfolio for GitHub Pages. A rigged original Meshy avatar dances in a Three.js scene prepared in Blender. The homepage pairs it with actual Roblox game artwork, concise software projects and supplied certificate evidence. There are no accounts, sales, analytics, embeds, on-site forms or browser storage.

## Local development

Node.js 22 or newer: npm ci, then npm run dev.
Production: npm run check and npm run build. Export is out/.
For production audit, serve out/ at http://127.0.0.1:4173 and run node scripts/audit-site.mjs. Install the browser once with npx playwright install chromium. Browser/axe results and screenshot evidence are in audit/.

## Content and policies

Identity/project links: data/site.ts. Policy content: data/policies.ts. Routes: /privacy/, /terms/, /cookies/, /refunds/, /accessibility/. Contact email was supplied by the owner. Policies reflect an individual portfolio with no online sales. Read audit/AUDIT.md for owner checks and jurisdiction/verification limits before publication. No compliance certificate is claimed.

## Design sources

Editable avatar scene: design/portfolio-avatar.blend. Approved avatar requests: design/meshy/avatar/job.json (38 credits). Earlier sculpture request remains archived (20 credits), for a total of 58 of the 100-credit cap. No paid retries. The retired sculpture is not shipped on the website.

Editable desktop/mobile portfolio frames were updated through the existing Figma bridge; design/figma-revision-result.json records confirmed execution. They are design references, not an animation player. Typography, colors and layout are documented in DESIGN.md; asset provenance in CREDITS.md and audit/asset-inventory.json.

## Animation

components/avatar-stage.tsx loads Three.js and the self-hosted GLB dynamically. Visitors can use the icon controls for motion/reset, drag to rotate, or use Left/Right and Home keys. Reduced-motion visitors start with a still character and can explicitly play. Animation rendering stops while offscreen or in a hidden tab. A locally rendered poster remains available when JavaScript or WebGL is unavailable. This is an original game-style character, not an official Roblox avatar or endorsed asset.

The header switches between day and night. The avatar's Lights button separately changes actual key, rim and ambient illumination; the open stage uses a soft complementary glow. Theme and lighting choices remain in memory and add no cookies or browser storage. Internal Next links preserve the theme; reloading starts in day mode. Tool logos are locally served SVGs with upstream license archived. Production labels are intentionally absent from the hero; provenance stays in development records.

Blender exports embedded WebP textures, reducing the GLB from approximately 8.2 MB to 1.34 MB. This requires a browser supporting WebP textures/WebGL; the poster is the fallback. All runtime assets are served locally, including fonts. Policies describe hosting logs and email processing separately from browser tracking.

## Release

.github/workflows/deploy.yml builds a static export and publishes to GitHub Pages on pushes to main. npm ci uses the lockfile. public/CNAME preserves the existing domain. A local build does not publish the site. Never commit API keys, .env files, the private handoff ZIP or private identity documents.
