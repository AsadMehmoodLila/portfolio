// Exercise the actual reusable player with private fixtures, never a published portfolio item.
import { build } from "esbuild";
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import assert from "node:assert/strict";
const result = await build({
  stdin: {
    contents: `import {createRoot} from 'react-dom/client'; import {VideoPlayer} from './components/portfolio/video-player'; createRoot(document.getElementById('app')).render(<><VideoPlayer title="YouTube fixture" media={{poster:'/poster.webp',alt:'Private test poster',youtube:'abcdefghijk',summary:'A private player test, not portfolio work'}}/><VideoPlayer title="Local fixture" media={{poster:'/poster.webp',alt:'Private test poster',video:'/broken.mp4',captions:'/captions.vtt',summary:'A local player test'}}/></>);`,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  write: false,
  format: "iife",
  platform: "browser",
  jsx: "automatic",
  banner: { js: 'var process={env:{NODE_ENV:"production"},browser:true};' },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "silent",
});
const bundle = result.outputFiles[0].contents;
const css = (await fs.readFile("app/portfolio.css", "utf8")).replace(
  '@import "tailwindcss";',
  "",
);
const poster = await fs.readFile("public/media/roblox-game.webp");
const server = http.createServer((req, res) => {
  if (req.url === "/fixture.js") {
    res.setHeader("Content-Type", "text/javascript");
    res.end(bundle);
  } else if (req.url === "/poster.webp") {
    res.setHeader("Content-Type", "image/webp");
    res.end(poster);
  } else if (req.url === "/captions.vtt") {
    res.setHeader("Content-Type", "text/vtt");
    res.end("WEBVTT\n\n00:00:00.000 --> 00:00:01.000\nPrivate test caption\n");
  } else if (req.url === "/broken.mp4") {
    res.setHeader("Content-Type", "video/mp4");
    res.end("Deliberately invalid private fixture");
  } else if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Private media test</title><style>${css}body{padding:30px}#app{max-width:900px;margin:auto;display:grid;gap:40px}</style><main id="app"></main><script src="/fixture.js"></script></html>`,
    );
  } else {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const report = { checks: [], errors: [] };
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  page.on("pageerror", (error) => report.errors.push(String(error)));
  const external = [];
  page.on("request", (request) => {
    if (!request.url().startsWith(origin)) external.push(request.url());
  });
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><title>Intercepted test embed</title><p>Playback provider fixture</p>",
    }),
  );
  await page.goto(origin, { waitUntil: "networkidle" });
  const play = page.getByRole("button", {
    name: "Play YouTube fixture showcase on YouTube",
  });
  await play.waitFor();
  assert.equal(await page.locator("iframe").count(), 0);
  assert.equal(external.length, 0);
  report.checks.push("No iframe or third-party request before activation");
  await play.focus();
  await page.keyboard.press("Space");
  const frame = page.locator("iframe");
  await frame.waitFor();
  assert.equal(
    await frame.getAttribute("src"),
    "https://www.youtube-nocookie.com/embed/abcdefghijk?autoplay=1&playsinline=1&rel=0",
  );
  assert.equal(
    await frame.getAttribute("referrerpolicy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(
    await frame.getAttribute("title"),
    "YouTube fixture showcase on YouTube",
  );
  assert((await frame.getAttribute("allowfullscreen")) !== null);
  assert.equal(external.length, 1);
  report.checks.push(
    "Keyboard Play loads the privacy-enhanced URL, title and referrer policy",
  );
  await page.getByRole("button", { name: "Close video" }).click();
  await frame.waitFor({ state: "detached" });
  assert(await play.evaluate((el) => el === document.activeElement));
  report.checks.push("Close unloads the player and restores keyboard focus");
  const native = page.locator("video");
  assert((await native.getAttribute("controls")) !== null);
  assert.equal(await native.getAttribute("preload"), "none");
  assert.equal(await native.locator("track").getAttribute("kind"), "captions");
  await native.evaluate((video) => {
    void video.play().catch(() => {});
  });
  await page.getByRole("link", { name: "Open the video directly" }).waitFor();
  report.checks.push(
    "Local video controls, caption track and actual failed-video fallback",
  );
  report.passed = !report.errors.length;
} catch (error) {
  report.errors.push(String(error));
  report.passed = false;
} finally {
  await browser.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  await fs.mkdir("audit", { recursive: true });
  await fs.writeFile(
    "audit/media-player-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
