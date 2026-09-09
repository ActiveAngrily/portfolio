# Portfolio reference analysis and implementation plan

Reference inspected in Chrome on September 9, 2026: [Wall of Portfolios profile](https://www.wallofportfolios.in/portfolios/sakshi-meena/) and its embedded [Sakshi Meena portfolio](https://sakshimeena.tech/).

## What the reference actually contains

There are two separate websites. Wall of Portfolios supplies a directory header, search, designer sidebar, employer link, profile panel, messaging, account access, and submission entry point. The main portfolio is embedded from sakshimeena.tech. The personal portfolio is the replication target; the surrounding directory would add an unrelated account and discovery product.

The original home page is a split composition. At the observed 1470×710 viewport, a pale rounded stage runs from approximately x24 to x814 and almost the entire viewport height. The content column begins around x858. The left stage stays in place while the right column scrolls. The stage is mostly empty space, with a small animated black-ink coffee-making character in its lower half. Date and live clock occupy the lower corners. A hover invitation sits beneath the character.

The right column begins with a small bold monogram and the navigation labels work, me, contact. Beneath it sit an 80px circular photograph, a modest sans-serif name, a short/long introduction switch, introductory paragraphs, and location. Project links use italic editorial serif typography, restrained gray summaries, and generous vertical separation. There are three navigable client studies, one coming-soon entry, and three experimental previews. The footer contains a recency note, external social links separated by centered dots, and a personal credit.

The crucial interaction is the relationship between project text and the left stage. Selecting an experiment replaces the character with its media preview, highlights the selected row, and deemphasizes surrounding text. Selection is represented by an `active-project` query parameter. The introduction switch sets `intro-mode=long`; the long state contains several paragraphs with emphasized phrases. The main character invitation disappears while a project preview is active.

## Navigation and interaction audit

Repeated header/footer destinations are grouped below rather than treating repeated copies as distinct pages. Destinations beyond the directly linked external page are not recursively crawled.

| Entry | Destination / behavior | Inspection |
|---|---|---|
| SM. / work | `/` | Followed back to home from detail routes |
| me | `/me` | Clicked; read full page and inspected first viewport |
| contact / Send an email | `mailto:meenasakshi25@gmail.com` | Destination inspected; no email composed or sent |
| First project | `/gls-ai` | Clicked; read full case-study structure |
| First solution jump | `/gls-ai#gls-oslution` | Clicked; original misspelling retained by source |
| Second project | `/volkswagen-console` | Clicked; read full case-study structure |
| Third project | `/volkswagen-measures` | Clicked; read full case-study structure |
| Third solution jump | `/volkswagen-measures#solution` | Clicked |
| Eventx | Coming-soon text | No anchor exposed |
| Photo dump experiment | `active-project=p6` | Clicked; in-page selection |
| Boarding experiment | `active-project=p5` | Clicked; in-page selection |
| Pomodoro experiment | `active-project=p8` | Clicked; screenshot confirmed stage preview and highlighted row |
| LinkedIn | `linkedin.com/in/sakshi214/` | Clicked and destination inspected |
| Substack | `moodsofshi.substack.com` | Clicked; subscription entry shown, no subscription submitted |
| YouTube | `youtube.com/@moodsofshi` | Clicked and channel inspected |
| Directory employer | `/companies/hexad-gmbh/` | Clicked; separate team directory with People / Case studies tabs |
| Directory Profile | Local profile panel | Clicked; biography panel revealed |
| Directory Submit Portfolio | `/submit-your-portfolio/` | Clicked; redirected to sign-in with next parameter |
| Directory login | `/accounts/login/` | Destination identified; sign-in structure inspected via submission redirect |
| Directory home | `wallofportfolios.in/` | Destination identified, not separately traversed |
| Directory message/bookmark | Inbox / saved-profile actions | Identified; not executed because these are account actions, not portfolio structure |

This is not a claim that every repeated anchor, account action, or downstream social-site link was clicked. All three project routes, both solution anchors, about, introduction state, three experiments, and three unique external social destinations were inspected.

## Detail page composition

**About:** The split stage is removed. A centered, restrained content column holds a larger circular portrait, an identity heading, prose, and outlined contact pills. Subsequent sections cover side quests, chronological experience, education, interests, and a final contact invitation. Navigation stays consistent.

**GLS:** Large title and summary, explanatory context and confidentiality note, a Year/Client/Role/Work/Team metadata group, solution preview and anchor, research figures, current-state diagnosis, prioritization matrix, job statement, hypotheses, goals, iteration, solution highlights, impact, reflection, and contact/footer.

**Developer portal:** Shipped status, project heading, organization/team/responsibility metadata, overview, challenge, product context, metrics, research and interview evidence, progressive solution explanations, outcomes, reflection, and shared contact/footer.

**Measures:** Title and subheading, context, metadata, preview/anchor, problem and quotations, goals, architecture, iteration and constraints, solution highlights, launch signals, reflection, and shared contact/footer.

Some media regions appeared blank at inspection time. Their exact videos, loading behavior, original font files, underlying animation technology, and mobile breakpoint values were not verified. Visual measurements above are observed approximations, not extracted source values.

## Design plan

1. Preserve the desktop silhouette: approximately 55% pale fixed stage, 45% scrolling content; 24px outer inset, 28px stage rounding, quiet navigation, and ample whitespace.
2. Use DM Sans for interface/body text and Instrument Serif italic for project links. These are close visual substitutes; exact original typefaces were not confirmed. Black and gray remain dominant; the personal photograph contributes color.
3. Replace the original character with an original black-ink cartoon based on the supplied photo. Preserve curly dark hair, rectangular glasses, a rounded friendly face, and dark hoodie. Use one 4×2 sheet: typing in row one, looking up/waving in row two.
4. Keep the character intentionally small within its stage. Run the typing cycle at about one second and the wave cycle at 1.2 seconds. Hover, focus, and tap initiate a wave; expose a pause control and respect reduced-motion preferences.
5. Recreate the introduction switch and support the source's long-introduction URL state. Make all controls keyboard operable and all primary navigation real links.
6. Project hover/focus replaces the character with a local interface preview. Clicking leads to a dedicated case-study route. Use a shared detail-page shell with title, metadata, preview, problem, solution anchor, and reflection.
7. Build the about and contact destinations. Use sample prose and concept projects as requested; never attribute Sakshi's employment, education, metrics, or clients to the user. Real contact destinations can replace the explicit pending-details state later.
8. Add a character-viewer experiment and a functional 25-minute focus timer. These adapt the reference's playful experimental area rather than copying its videos. Native dialogs provide close controls, Escape behavior, and focus containment.
9. At narrow widths, move the stage into normal flow beneath navigation and above the introduction. Preserve readable text, touch targets, and full-width content without horizontal scrolling. This is an intentional responsive adaptation; the original mobile behavior was not measured.
10. Use plain static HTML/CSS/JavaScript, generated detail pages, and one local sprite asset. No framework or animation dependency is necessary. Keep the image files inside the project.

## Implemented deliverables and deviations

- Six static pages: home, about, contact, and three concept case studies.
- One generated 8-frame character sheet, integrated through CSS background positions; portrait uses the supplied image.
- Intro toggle, linked project previews, hover/tap wave, motion pause, date/time, two experiment dialogs, and a timer based on elapsed time.
- Sample copy is intentionally shorter than the original case studies, and is marked as concept content. Exact client screenshots and original media are not reused.
- The generated sheet uses a near-white RGB background, not true transparency; multiply blending integrates it into the pale canvas. Its native dimensions are 1774×887, so cells are sampled proportionally rather than sliced to integer pixels.
- No messaging, subscriptions, account creation, or original-author contact actions were performed.

## Validation

`node check.mjs` checks introduction transitions, wave state, motion pause, dialog opening, project preview content, timer behavior under background-time jumps, pause/completion/reset, and local page/asset links. `node --check dist/app.js` checks JavaScript syntax. The loopback preview returns HTTP 200. Browser research was performed on the reference; a separate visual QA pass of the implementation was not performed.

For later personalization: replace name/intro, add real case-study content and assets, replace the contact pending state with the user's actual email/social links, then regenerate the detail pages with `python3 build_pages.py`.
