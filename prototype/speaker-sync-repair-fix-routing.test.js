"use strict";
// Smoke test: speaker-sync-repair must hand a "captions show wrong speaker"
// (attribution) problem off to the screen that owns the fix (#583). Unlike the
// timing/drift/duplicate problems — which are repaired in place on this screen —
// an attribution mismatch is resolved on the speaker attribution review surface,
// so the screen routes there via `attributionReviewSurface` and renders it as a
// navigable `${attributionReviewSurface}.html` link. This guards that hand-off so
// a future edit can't silently rename the surface, point it at a screen that no
// longer exists, or drop the rendered link.
// Run with: `node prototype/speaker-sync-repair-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "prototype", "speaker-sync-repair.html"), "utf8");

// The attribution hand-off surface is declared as a single source of truth.
const m = source.match(/const attributionReviewSurface = "([a-z0-9-]+)";/);
assert.ok(m, "attributionReviewSurface is declared as a named constant");
const surface = m[1];

// It must resolve to a real prototype file.
assert.ok(
  fs.existsSync(path.join(root, "prototype", surface + ".html")),
  `attribution review surface ${surface}.html exists as a real prototype`,
);

// The attribution check routes to that surface via fixSurface.
assert.ok(
  source.includes("fixSurface: attributionReviewSurface"),
  "the attribution problem routes to the attribution review surface",
);

// The hand-off is rendered as a navigable link, not just a status note.
assert.ok(
  source.includes("`${attributionReviewSurface}.html`"),
  "the attribution hand-off renders a navigable ${attributionReviewSurface}.html link",
);

// In-place repairs (drift/duplicate/timing) stay on this screen — they must NOT
// be re-pointed at the attribution surface.
assert.ok(
  !/drift:[\s\S]{0,200}fixSurface: attributionReviewSurface/.test(source),
  "drift is repaired in place and is not routed to the attribution surface",
);

console.log("speaker-sync-repair: attribution problems route to " + surface + " (in-place repairs stay put)");
