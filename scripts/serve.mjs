import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".vtt": "text/vtt",
  ".webmanifest": "application/manifest+json",
};
const port = Number(process.env.PORT || 4173);
http
  .createServer((req, res) => {
    let file;
    try {
      file = path.resolve(
        root,
        "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    let status = 200;
    if (!fs.existsSync(file)) {
      file = path.join(root, "404.html");
      status = 404;
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404).end("Build the site with npm run build first");
      return;
    }
    const size = fs.statSync(file).size;
    const headers = {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "Accept-Ranges": "bytes",
    };
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && status === 200) {
      const start = Number(range[1]),
        end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      if (start > end || start >= size) {
        res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
        return;
      }
      res.writeHead(206, {
        ...headers,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${size}`,
      });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(status, { ...headers, "Content-Length": size });
    if (req.method === "HEAD") res.end();
    else fs.createReadStream(file).pipe(res);
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Portfolio preview: http://127.0.0.1:${port}`),
  );
