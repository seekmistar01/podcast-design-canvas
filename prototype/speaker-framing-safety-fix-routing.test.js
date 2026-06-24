"use strict";

// Guards speaker framing safety hand-off links (#583): crop-driven framing
// problems open the screen that owns the destination crop.
// Run with: `node prototype/speaker-framing-safety-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "speaker-framing-safety.html"), "utf8");

assert.ok(html.includes('openLink = document.createElement("a")'), "framing issues render an open-fix-screen link");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "open link routes to the owning fix screen");

const fixScreens = [...html.matchAll(/fixScreen:\s*"([a-z0-9-]+\.html)"/g)].map((m) => m[1]);
assert.ok(fixScreens.length >= 1, "framing checks declare fix screens");
for (const file of fixScreens) {
  assert.ok(fs.existsSync(path.join(dir, file)), `fix screen exists: ${file}`);
}

assert.ok(
  fixScreens.includes("destination-crop-preview.html"),
  "crop-driven framing problems route to destination crop preview",
);

console.log(`speaker framing safety: ${fixScreens.length} issue paths open their owning fix screen`);
