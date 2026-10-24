// Render a social card from the actual static page and original typographic install icons.
import fs from "node:fs/promises";
import { chromium } from "@playwright/test";
const browser = await chromium.launch();
try {
  await fs.mkdir("public/images", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      ".site-header,.system-dock,.services-section,.work-section,.process-section,.about-section,.faq-section,.discord-section,.site-footer,.character-toolbar,.character-activate,.hero-actions,.hero-availability{display:none!important}.hero{width:calc(100% - 100px);height:630px;min-height:630px;padding:0;gap:30px}.hero h1{font-size:64px}.hero-status{font-size:14px}.hero-copy>p{font-size:18px;max-width:36ch}.character-world{height:450px}.stage-header{font-size:11px}.world-word{font-size:145px}",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".character-canvas img").evaluate((img) => img.decode());
  await page.screenshot({ path: "public/images/portfolio-social.png" });
  const mark = await fs.readFile("public/favicon.svg", "utf8");
  for (const [size, name] of [
    [180, "apple-touch-icon.png"],
    [192, "icon-192.png"],
    [512, "icon-512.png"],
  ]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<style>body{margin:0}svg{width:100vw;height:100vh;display:block}</style>${mark}`,
    );
    await page.screenshot({ path: `public/${name}` });
  }
} finally {
  await browser.close();
}
console.log("Game-style social card and install icons rendered");
