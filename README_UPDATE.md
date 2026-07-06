# UX update summary

This version focuses on a faster first-use experience for younger mobile users.

Modified files:

- src/components/AppShell.tsx
- package.json
- RELEASE_NOTES_v1.1.3.md

Main changes:

- Rebuilt the home screen around one-minute use.
- Added clear first actions:
  - I want to say something
  - Help me understand staff
  - Make my own card
- Renamed home card actions to “I want to say” and “Staff may say.”
- Kept conversation mode, staff mode, favorites, custom cards, blanks, and speech behavior unchanged.

Checks run:

- npm run typecheck: passed

Production build note:

- I could not complete `npm run build` inside this Linux sandbox because the uploaded node_modules only included the macOS Next.js SWC package and the sandbox has no internet access to download the Linux SWC package.
