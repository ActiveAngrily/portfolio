# Portfolio

A small, reference-inspired portfolio for Anant Jamuar, with a warm two-column layout, project pages, and a focus timer experiment. The left stage is intentionally empty so a future interactive element can have room to breathe.

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
