"use strict";

// Smoke test: source-media-health must route each detected media problem to the surface that owns the fix (#583).
// Each flagged condition declares a `fixSurface` that resolves to a real prototype,
// rendered as a navigable `${fixSurface}.html` hand-off so the connected flow never
// dead-ends. Run with:
//   node prototype/source-media-health-fix-routing.test.js

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "prototype", "source-media-health.html"), "utf8");

// Every fix surface this screen routes to must resolve to a real prototype file.
const surfaces = [
  "speaker-visual-match",
  "audio-cleanup-controls",
  "speaker-framing-safety",
];

for (const surface of surfaces) {
  assert.ok(source.includes(`fixSurface: "${surface}"`), `source-media-health routes to ${surface}`);
  assert.ok(fs.existsSync(path.join(root, "prototype", surface + ".html")), `fix surface ${surface}.html exists as a real prototype`);
}

// The hand-off is rendered as a navigable link, not just a status note.
assert.ok(/fixSurface\}\.html/.test(source) || /\.href\s*=/.test(source), "hand-off renders a navigable ${fixSurface}.html link");

console.log("source-media-health: " + surfaces.length + " fix surfaces resolve to real prototypes");
