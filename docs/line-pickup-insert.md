# Line Pickup Insert

Hosts and guests sometimes flub a line, misstate a number, or trip over a name, then want to fix it cleanly rather than leave it in a finished episode. A line pickup lets a creator drop a short re-recorded take over the original moment without rebuilding the edit or scrubbing a raw timeline.

## User Goal

A creator should be able to mark a spoken moment they want to redo, record or upload a short replacement take for the same speaker, and have the product fit it into the episode so the conversation still feels continuous — captions, framing, and look included — without manual timeline surgery.

## When A Pickup Fits

A pickup is for a small, self-contained spoken patch, not a re-edit:

- a misspoken name, date, figure, or title the speaker wants to correct
- a stumble or false start the creator would rather replace than trim
- a short line re-read for clarity after review
- a quick re-record from the same speaker in the same setup

If the issue is timing drift across a whole track, that stays with sync repair; if the moment should simply be shortened or softened rather than replaced, that stays with pause cleanup. A pickup adds new spoken material; it is not a cut.

## Fitting The Take In

A pickup should land as a continuous-feeling patch, previewed on the real moment before it is kept:

- align the replacement to the same speaker bucket and moment, not a raw timecode
- match the pickup's look and audio to the surrounding episode the same way the rest of that speaker's footage was treated
- keep the speaker's framing and the active layout across the seam
- refresh captions only for the replaced span so the text follows the new words
- preview the moment just before, during, and after the seam so the creator hears and sees the handoff

The product should show the before-and-after at the seam and never silently swap material the creator has not confirmed.

## Creator Controls

Keep a pickup a single mark-record-confirm step:

- mark a moment as needing a pickup
- record or upload a short replacement take for that speaker
- preview the patched moment against the surrounding conversation
- accept the pickup, or revert to the original take
- nudge where the replacement starts and ends without opening a full editor

Avoid exposing waveform splicing, per-frame trim handles, or multi-take timeline tracks as the default path.

## Review States

Pickup status should describe where a replaced moment stands, surfaced as a quiet per-moment signal rather than a gate that blocks export:

- **marked** — the creator flagged the moment for a pickup but has not provided a take yet
- **take ready** — a replacement take is attached and previewing against the original moment
- **inserted** — the pickup is kept; captions, look, and framing for that span follow the new take
- **reverted** — the original take is restored and the moment is treated as untouched
- **needs caption review** — when the new words leave low-confidence or missing captions, open caption review for that span before treating the pickup as done

Each state should describe what happens to playback, captions, and the seam — not just the label. A still-marked pickup with no take should stay a quiet reminder, not a blocked export.

## Connections

A pickup reuses surfaces the workspace already owns rather than rebuilding them: the replacement take confirms against the same speaker bucket and role from `docs/episode-ingest-readiness.md` and `docs/speaker-role-mapping.md`; look matching for the new footage follows `docs/speaker-video-match.md` (Match Targets) and `docs/speaker-visual-match.md`; framing across the seam stays governed by `docs/speaker-framing-safety.md`; refreshed words route to `docs/audio-caption-quality-review.md` for the replaced span; and the pickup appears as a creator-meaningful checkpoint in `docs/episode-version-history.md` so a creator can compare or undo it. Whole-track timing problems stay with `docs/speaker-sync-repair.md`, and shortening or softening a moment without new material stays with `docs/pause-crosstalk-cleanup.md`.

## Maintainer Acceptance Notes

Accept work that lets creators replace a short flubbed line with a clean re-recorded take while keeping the conversation continuous in a long-form episode. Close work that turns pickups into a multi-take timeline editor, exposes waveform splicing as the default, silently swaps takes without preview, duplicates sync repair's track-timing controls, or blocks export on an unfinished pickup.
