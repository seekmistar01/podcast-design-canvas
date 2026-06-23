# Audio Cleanup Controls

Audio cleanup should let creators improve episode sound with simple quality choices instead of technical mixing tools.

## User Goal

A creator should be able to reduce noise, balance levels, and improve speech clarity across a full episode without learning an audio workstation.

## Relationship To Audio And Caption Review

Audio cleanup is the creator-facing quality layer that feeds `docs/audio-caption-quality-review.md`. Cleanup sets how the episode sounds; caption confidence, caption styling, and transcript accuracy stay in that review. Music cues stay in `docs/music-cue-setup.md`, speech ducking in `docs/music-ducking-under-speech.md`, and pause or cross-talk edits in `docs/pause-crosstalk-cleanup.md`.

## Cleanup Controls

Use plain-language quality choices, not decibel or filter settings:

- reduce background noise
- balance loudness between speakers
- enhance a quiet speaker
- reduce echo or room sound
- smooth harsh or sudden peaks
- improve overall speech clarity

## Per-Speaker Balance

Cleanup should respect separate speaker tracks:

- level each speaker bucket against the others
- keep a consistent voice for a returning host across episodes
- avoid raising background noise when boosting a quiet guest
- preview balance on a real multi-speaker moment, not a test tone

## Review States

Use simple, creator-facing states:

- suggested — the product recommends a cleanup choice for the episode
- applied — the cleanup is active for this episode
- per speaker — the cleanup is scoped to one speaker bucket
- accepted original — the creator kept the raw audio on purpose
- not needed — the track is already clean enough for the final episode

## Creator Controls

The creator should be able to:

- preview a cleanup choice on a real episode moment before applying it
- apply cleanup across the whole episode or to a single speaker bucket
- save cleanup preferences to the show template for future episodes
- revert any track to its original audio
- continue when a track is good enough, without forcing every control on

## Quality Rules

Cleanup should protect the conversation:

- never distort voices or introduce artifacts to chase loudness
- keep natural pauses and tone rather than over-processing
- do not change what was said or its meaning
- flag when a track is too damaged to clean and should be replaced in `docs/source-media-health.md`

## Maintainer Acceptance Notes

Accept work that makes audio cleanup feel like creator-facing quality choices for long-form episodes. Close work that exposes raw mixing or DSP controls as the default, duplicates caption review, or over-processes the conversation.
