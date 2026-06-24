"use strict";

// Smoke test: speaker-framing-safety must route crop-driven framing problems to the
// screen that owns the destination crop (#828 / #583). A speaker "cropped too tight
// for the destination" or "cut off in the mobile crop" is fixed on the destination
// crop preview, so those checks must hand the reviewer off there instead of dead-ending.
// Coverage checks (captions, lower-third, b-roll) keep their existing owners.
// Run with: `node prototype/speaker-framing-safety-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "prototype", "speaker-framing-safety.html"), "utf8");

// Pull a single check definition block (`key: { ... }`) out of the checks map.
function checkBlock(key) {
  const start = source.indexOf(key + ": {");
  assert.ok(start >= 0, `checks map defines "${key}"`);
  const end = source.indexOf("\n        },", start);
  assert.ok(end > start, `"${key}" block is terminated`);
  return source.slice(start, end);
}

// Crop-driven checks route to the destination crop preview, which owns the fix.
const CROP_OWNER = "destination-crop-preview.html";
for (const key of ["tight", "mobile"]) {
  const block = checkBlock(key);
  assert.ok(
    block.includes(`fixScreen: "${CROP_OWNER}"`),
    `crop-driven check "${key}" routes to ${CROP_OWNER}`,
  );
}
assert.ok(
  fs.existsSync(path.join(root, "prototype", CROP_OWNER)),
  `owning fix screen ${CROP_OWNER} exists as a real prototype`,
);

// Coverage checks keep their existing owners — this PR must not move them.
const coverageOwners = {
  captions: "layout-safe-areas.html",
  lower: "layout-safe-areas.html",
  broll: "contextual-broll-moments.html",
};
for (const [key, file] of Object.entries(coverageOwners)) {
  assert.ok(
    checkBlock(key).includes(`fixScreen: "${file}"`),
    `coverage check "${key}" still routes to ${file}`,
  );
  assert.ok(
    fs.existsSync(path.join(root, "prototype", file)),
    `owning fix screen ${file} exists as a real prototype`,
  );
}

// "panel" (too small in the panel layout) is not crop-driven, so it stays un-routed.
assert.ok(!checkBlock("panel").includes("fixScreen"), "non-crop 'panel' check stays un-routed");

// The hand-off is a navigable link built from the issue's fix screen.
assert.ok(
  source.includes("openLink.href = issue.fixScreen"),
  "review issue renders a navigable hand-off link to the owning fix screen",
);

console.log("speaker-framing-safety: crop-driven checks route to the destination crop preview");
