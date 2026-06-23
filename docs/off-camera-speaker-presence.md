# Off-Camera Speaker Presence

Some participants join a podcast without usable video — a call-in guest, a producer, or a voiceover. The product should give them an intentional on-screen presence instead of leaving a blank frame.

## User Goal

A creator should be able to choose how an audio-only participant appears on screen, so the episode still feels designed when someone speaks without video.

## When This Applies

This is for participants who are intentionally off camera, not for tracks that lost video by mistake:

- a guest who joins by phone or audio only
- a producer or co-host who speaks but is not on camera
- a narrator or voiceover added in post
- a remote caller featured for a single segment

Accidental missing video stays a setup problem handled during import. This spec covers participants the creator means to keep audio-only.

## Presence Styles

Offer simple, preset-aware ways to represent an off-camera speaker:

- name card with role and handle
- photo pulled from social context
- branded avatar or show monogram
- animated audio waveform or audiogram
- a quiet placeholder frame that yields to the on-camera speakers

Each style should preview against a real moment where the off-camera participant is speaking.

## Behavior During Speaking Moments

An off-camera participant should still feel present when they talk:

- their presence style takes light focus while they speak, without forcing a full-screen takeover
- captions and lower-thirds keep attributing their words correctly
- on-camera speakers stay visible so the conversation still reads
- the layout returns to the on-camera speakers when the off-camera participant stops

The product should avoid leaving a large empty video frame or a frozen black box where the participant would be.

## Creator Controls

Keep the choice creator-facing and tied to the show's look:

- choose a presence style from the current preset
- swap the photo, name, or handle shown on the card
- set how much focus the participant takes while speaking
- pin a participant as fully hidden when they should not appear at all
- save the presence style to the show template for recurring off-camera roles

Avoid exposing compositing layers, avatar rigging, or audio-reactive animation curves in the default path.

## Connections

Off-camera presence should reuse decisions the workspace already owns rather than redefining them:

- speaker roles and the audio-only mark come from `docs/speaker-role-mapping.md` (Core Roles, Review And Confirm)
- names, handles, and photos come from `docs/social-context-intake.md` (Accepted Inputs) and `docs/guest-profile-reuse.md` (Reusable Details)
- placement and layering of the presence element happen in `docs/canvas-layer-controls.md` (Core Layers, Speaker And Moment Awareness)
- recurring off-camera treatments carry forward through `docs/show-template-adaptation.md` (Template Contents)

The creator should set a participant audio-only once and let these surfaces apply the choice, not re-enter it on every screen.

## Maintainer Acceptance Notes

Accept work that gives intentionally off-camera participants a tasteful, preset-aware presence in long-form episodes. Close work that treats audio-only speakers as broken video, forces a full-screen avatar takeover, or exposes raw compositing and animation tools to normal creators.
