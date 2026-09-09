# Typing sprite generation

Mode: built-in ChatGPT imagegen. No API/CLI fallback.

Final project asset: `dist/assets/typing-sprite.png` (1774×887; 4 columns × 2 rows).

Photo reference: user-supplied portrait. Used solely for character likeness.

## Initial prompt

Use case: illustration-story.
Asset type: animated portfolio mascot sprite sheet.
Input image: the supplied photograph is a subject reference only. Capture this person's fluffy curly dark hair, large rectangular glasses, rounded friendly face and dark hoodie; no hoodie text.
Primary request: create an adorable hand-drawn black ink cartoon of this person seated typing at a small laptop. Sparse charming black ink doodle suitable for a minimal near-white website.
Layout: EXACTLY eight equal square cells in FOUR COLUMNS and TWO ROWS, read left to right then top to bottom. Canvas 2048 pixels wide by 1024 pixels high so every cell is 512 square. Invisible cell borders, no grid lines. Each cell contains one complete bust, both arms and entire small laptop, with ample padding. All eight have identical character scale and registration; laptop and torso anchored to the EXACT same relative position in each cell. Laptop front faces viewer in a slight three-quarter view.
Animation: top row frames 1-4 show subtle alternating typing hands and very slight head movement, looking down at laptop. Bottom row frames 5-8 show looking up to viewer, raising one hand, small friendly wave left, small friendly wave right. Maintain same face, hair, clothing and laptop between frames. Small motions only.
Style: endearing editorial ink sketch, slightly wobbly confident outlines, fluffy black curl shapes, simple expressive eyes behind glasses, rounded proportions, sparse hatching on hoodie. Black ink and opaque white character interiors only. Laptop simple and unbranded.
Background: genuinely transparent alpha outside each character and laptop, not a checkerboard drawing. No scenery, no shadows, no extra objects, no lettering, no frame numbers, no borders, no watermark.

## Targeted correction prompt (final selected asset)

Edit the supplied sprite sheet. Preserve the entire 4-column by 2-row grid, eight equal square cells, image aspect ratio, black ink art style, recognizable face, fluffy curly hair, glasses, hoodie, character scale, and laptop position. Make only these targeted corrections: replace all gray checkerboard background everywhere outside the character and laptop silhouettes with a completely uniform flat solid background color exactly #f8f8f8. No transparency and no checkerboard; actual solid near-white pixels. Preserve white face and laptop interiors, black linework and hatching. Correct bottom-row animation so every waving pose uses the same hand: the character's right hand, appearing on the viewer's LEFT of each character. Bottom frame 1 looks up with hands lowered; frame 2 raises right hand on viewer-left; frame 3 makes small wave with that same raised right hand; frame 4 lowers that same right hand slightly while smiling toward viewer. Never raise the hand on viewer-right. Top row retains four subtle typing poses. Keep laptop in the same relative position and size in all eight cells. No text, numbers, grid lines, borders or added objects.

The generated result was visually inspected. The first result had a baked checkerboard; the selected correction removes it and consistently waves with the same hand. Exact flat-background pixel uniformity was not confirmed.
