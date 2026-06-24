"use strict";

// Smoke test: episode-watch-through-preview must route each watch-through issue to the screen that owns the fix (#583).
// Each flagged condition routes to a real prototype that owns the fix, so a
// connected hand-off never becomes a dead end. Run with:
//   node prototype/episode-watch-through-preview-fix-routing.test.js

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "prototype", "episode-watch-through-preview.html"), "utf8");

// Each flagged condition declares the owning fix screen it routes to.
const routes = [
  { key: "captions", file: "audio-caption-quality-review.html" },
  { key: "visuals", file: "contextual-broll-moments.html" },
  { key: "audio", file: "audio-cleanup-controls.html" },
  { key: "framing", file: "speaker-framing-safety.html" },
];

for (const { key, file } of routes) {
  assert.ok(source.includes(`${key}: "${file}"`), `episode-watch-through-preview routes ${key} to ${file}`);
  assert.ok(fs.existsSync(path.join(root, "prototype", file)), `fix screen ${file} exists as a real prototype`);
}

const targets = [...new Set(routes.map((r) => r.file))];
assert.strictEqual(targets.length, 4, "each fix screen is listed once");

// The hand-off is a navigable link, not just a status note.
assert.ok(source.includes("createElement(\"a\")"), "hand-off renders a navigable link");

console.log("episode-watch-through-preview: " + routes.length + " flagged conditions route to " + targets.length + " owning fix screens");
