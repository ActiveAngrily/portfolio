# Portfolio

A small, reference-inspired portfolio for Anant Jamuar, with a warm two-column layout, project pages, and a focus timer experiment. The left stage pairs GitHub activity with reserved space for a future interactive element.

## Future plan: interactive square

The next playful feature will be a tiny animated square that visitors can move, pet, and talk to. It is deliberately only a plan for now.

### Product shape

- Keep the square small, friendly, and easy to understand at a glance.
- Let pointer and touch input move it within the reserved stage; keep it keyboard reachable too.
- Treat hover, tap, drag, and “petting” as simple interaction states with small visual responses.
- Add an optional conversation panel later, backed by a server-side AI endpoint so no API key ships in the browser.
- Give the square a few idle, curious, happy, and resting states with reduced-motion alternatives.

### Build sequence

1. Define the square’s color, name, voice, boundaries, and personality.
2. Add one DOM element and pointer events for bounded movement.
3. Add pet and drag feedback with CSS transitions or a small animation loop only where needed.
4. Add an accessible conversation UI, loading/error states, rate limits, and moderation at the server boundary.
5. Test keyboard, touch, screen-reader labels, reduced motion, small screens, and slow connections.
6. Decide whether any visitor state should persist; keep it off by default until there is a clear reason.

### Acceptance criteria

- A first-time visitor can discover what the square does without instructions.
- Movement stays inside the stage and remains usable with keyboard and touch.
- Every interaction has a visible and accessible response.
- AI failures are safe and graceful, with a non-AI fallback message.
- The feature is lazy-loaded so the portfolio remains fast when the square is ignored.

No interactive square is implemented yet; this document is the handoff plan for that future pass.

## Project pages and GitHub activity

The shared left stage now holds a quiet GitHub activity card above the reserved
square playground, with the date and clock below. The desktop split stays 55/45;
intermediate screens use 46/54, and mobile stacks the stage above the story.
DM Sans, italic Instrument Serif, pale surfaces, and charcoal text carry through
all pages. The card uses five stone-to-olive contribution levels, month markers,
and annual contributions, public and private repository count, and stars received.
Mobile and narrow desktop columns show the latest 26 weeks while retaining the annual total. The snapshot end date stays visible when refreshes fail.

The three published case studies use the same editorial structure: back link, category,
title, introduction, role/dates and focus, project link or status, a specific
visual, evidence, problem, engineering decisions, reflection, and next project.

- `/work/red-letter/`: the original newspaper masthead and a written case study; 22 publishers and 46 feeds.
- `/work/crucible/`: the original December 2025 cover and a written case study; 11 signals and under-15ms inference.
- Curieon stays visible as an unlinked “in the works” card until it is ready.
- `/work/latent-diffusion/`: a short research abstract and the tools used to build
  the latent diffusion pipeline.

### Build and data

Run `python3 build_pages.py` to refresh activity and regenerate detail pages.
Use `python3 build_pages.py --offline` to reproduce pages from the saved snapshot without network access.
`dist/index.html` is the authored homepage and shared shell; `dist/style.css` and `dist/app.js` are authored assets. Detail content comes from `build_pages.py`, `red_letter.html`, and `crucible.html`; regenerate the six detail pages after editing these sources.
Supply `GH_TOKEN` or `GITHUB_TOKEN` through your build environment's secret store;
do not put credentials in source files. For local builds, you can instead put only the token in `.github-token` at the repository root. This file is Git-ignored; environment variables take precedence. The build queries GitHub GraphQL for the
account's contribution calendar and paginates all owned REST repositories.
Repository count includes public and private forks; stars received excludes forks.
Use a token for `ActiveAngrily` with private-repository read access so private
activity is included.

`dist/github-activity.json` stores only aggregate counts, the contribution calendar, and the original
fetch timestamp. The site makes no client-side GitHub requests. Failed refreshes
preserve a valid snapshot; without one, the card says “Activity unavailable” and
links to the profile. Refresh occurs on builds, not on a daily schedule.

Run `python3 test_github_activity.py` and `node check.mjs` for data and generated
page checks. Browser acceptance covers 375px, 768px, 1440px, short desktop heights,
keyboard focus, reduced motion, both activity states, and diagram overflow.

The interactive square and conversation remain future work under the plan above.
