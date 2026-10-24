// Render a still from the original local 3D character and scene, without a bitmap edit.
import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "node:fs/promises";
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => console.error(error));
  await page.goto("http://127.0.0.1:4173/?render-character=1", {
    waitUntil: "networkidle",
  });
  await page
    .getByRole("button", { name: "Explore character", exact: true })
    .click();
  await page
    .locator('.character-stage[data-ready="true"]')
    .waitFor({ timeout: 30000 });
  await page.locator(".character-canvas").evaluate((element) => {
    element.style.width = "600px";
    element.style.height = "680px";
  });
  await page.waitForTimeout(200);
  const canvas = page.locator(".character-canvas canvas");
  // Read the renderer's transparent framebuffer, excluding all surrounding page elements.
  const data = await canvas.evaluate((element) =>
    element.toDataURL("image/png"),
  );
  const png = Buffer.from(data.split(",")[1], "base64");
  await sharp(png)
    .webp({ quality: 85 })
    .toFile("public/media/character-stage.webp");
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: "audit/screenshots/game-desktop-preview.png",
    fullPage: true,
  });
  await page.screenshot({ path: "audit/screenshots/game-desktop-hero.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "audit/screenshots/game-mobile-hero.png" });
  await page.getByRole("button", { name: "Switch to day mode" }).click();
  await page.screenshot({
    path: "audit/screenshots/game-mobile-day.png",
    fullPage: true,
  });
  console.log("Character still and game-interface previews rendered");
} finally {
  await browser.close();
}
