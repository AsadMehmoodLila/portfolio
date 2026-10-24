import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import ts from "typescript";
const source = fs.readFileSync("data/portfolio.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { work, publishedWork, featuredSlug, youtubeId } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const slugs = new Set();
function asset(url) {
  assert(
    url.startsWith("/") && !url.startsWith("//") && !url.includes(".."),
    `Use a local asset path: ${url}`,
  );
  assert(
    fs.existsSync(path.join("public", url)),
    `Missing public asset: ${url}`,
  );
}
function link(url) {
  const parsed = new URL(url);
  assert.equal(parsed.protocol, "https:", `Use HTTPS: ${url}`);
}
for (const project of work) {
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug),
    `Invalid slug: ${project.slug}`,
  );
  assert(!slugs.has(project.slug), `Duplicate slug: ${project.slug}`);
  slugs.add(project.slug);
  assert(["published", "planned"].includes(project.status));
  if (project.status !== "published") continue;
  assert(
    project.title &&
      project.summary &&
      project.description &&
      project.role.length,
    `Complete the case study: ${project.slug}`,
  );
  assert(
    project.media.poster && project.media.alt,
    `A published project needs a poster and alt text: ${project.slug}`,
  );
  asset(project.media.poster);
  assert(
    !(project.media.video && project.media.youtube),
    `Choose one video provider: ${project.slug}`,
  );
  if (project.media.youtube)
    assert(
      youtubeId(project.media.youtube),
      `Invalid YouTube ID or URL: ${project.slug}`,
    );
  if (project.media.video) {
    asset(project.media.video);
    assert(/\.(mp4|webm)$/i.test(project.media.video));
  }
  if (project.media.captions) {
    asset(project.media.captions);
    assert(
      project.media.video,
      `Captions require a local video: ${project.slug}`,
    );
  }
  if (project.media.video || project.media.youtube)
    assert(
      project.media.summary,
      `Include a text video summary: ${project.slug}`,
    );
  for (const image of project.screenshots) {
    asset(image.src);
    assert(image.alt, `Add screenshot alt text: ${project.slug}`);
  }
  for (const url of [project.live, project.source].filter(Boolean)) link(url);
}
assert(
  publishedWork.some((item) => item.slug === featuredSlug),
  "The featured project must be published",
);
assert.equal(youtubeId("https://youtu.be/abcdefghijk?t=12"), "abcdefghijk");
assert.equal(
  youtubeId("https://www.youtube.com/watch?v=abcdefghijk"),
  "abcdefghijk",
);
assert.equal(
  youtubeId("https://www.youtube-nocookie.com/embed/abcdefghijk"),
  "abcdefghijk",
);
for (const bad of [
  "https://youtube.com.evil.test/watch?v=abcdefghijk",
  "javascript:alert(1)",
  "http://youtube.com/watch?v=abcdefghijk",
  "invalid-id-length",
])
  assert.equal(youtubeId(bad), null);
console.log(
  `Content validated: ${publishedWork.length} published project(s), ${work.length - publishedWork.length} unpublished template(s)`,
);
