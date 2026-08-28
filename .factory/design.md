# Deposit Deadline Bridge — visual thesis

## Direction: glacial minimal ceramics

This product protects two dates that are easily chipped away during quote-to-invoice conversion. The interface therefore feels like a ceramic ledger kept on a cold studio table: calm, tactile, precise, and made to last. Two porcelain markers recur as the visual shorthand for the deposit and final balance. A thin cobalt bridge joins them.

This is deliberately a light, single-mode product. The pale mineral field makes date errors and status marks immediately legible, while a dark treatment would weaken the glazed-ceramic material idea. The page always paints its background explicitly.

## Tokens

- `--ice-25: #f8faf7` — page background, like blue-white clay slip.
- `--ice-50: #eef3f1` — recessed areas and alternating rows.
- `--porcelain: #fffdfa` — raised working surfaces.
- `--ink: #172a30` — primary text; 13.7:1 on porcelain.
- `--slate: #53666a` — secondary text; 5.9:1 on porcelain.
- `--cobalt: #165b70` — primary action and bridge line; 7.2:1 on porcelain.
- `--cobalt-deep: #0d4658` — pressed action and link text.
- `--frost: #cfe1e1` — borders and quiet fills.
- `--moss: #2f6b55` — confirmed/saved state.
- `--ochre: #8a5916` — dates needing attention.
- `--clay-red: #a63f32` — destructive and invalid states.
- `--focus: #be6b23` — a warm kiln-orange focus ring, over 3:1 against pale surfaces.

## Typography

- Display: Georgia, `Times New Roman`, serif. Its sculpted serifs give headings the quiet character of engraved ceramic labels without adding a font payload.
- Body and controls: Inter-like system stack (`ui-sans-serif`, `-apple-system`, BlinkMacSystemFont, `Segoe UI`, sans-serif). It stays crisp for dates, amounts, and filenames.
- Dates, money, and compact labels use tabular numerals. Body text starts at 16px with 1.55 leading. The readable measure is capped at 66 characters.

## Spacing and shape

The base unit is 8px, with a 4px half-step for small optical adjustments. Section spacing is 72–112px on wide screens and 48–72px on phones. Working controls are rectilinear with softly pinched 10–18px corners. Primary surfaces have a subtle uneven-looking glaze made only from layered CSS shadows and fine inset borders. Cards are used only for the two genuinely independent payment milestones.

The desktop hero is asymmetrical: plain copy occupies the left, while the ceramic bridge illustration sits to the right and overlaps the working preview below. On phones, artwork becomes a compact topographic strip so the form begins within the first two swipes.

## Interaction grammar

- The deposit and final milestone panels are paired, never collapsed into one generic due date.
- Changes save locally and receive a short status message in the live region.
- The main action is a filled cobalt capsule; secondary actions are porcelain with a cobalt edge; text links remain underlined.
- Dates and amount summaries sit on small ceramic “chips.” The connecting bridge line fills once both dates are valid.
- Exports produce files directly from the current schedule. Reminder email actions always open a review dialog first; the app never sends mail.

## Motion policy

The signature motion is a single 240ms “settle”: after a valid second deadline is entered, the bridge line draws from the deposit marker to the balance marker while both markers move upward by 2px, like pieces settling on a shelf. Route content fades for 160ms. Nothing loops. Under `prefers-reduced-motion: reduce`, transitions and smooth scrolling are disabled and the complete bridge appears instantly.

## Original asset plan

The hero and social image use one generated still-life: two hand-built porcelain date tokens on a frost-blue ceramic plane, linked by a narrow cobalt glazed arch. It explains the two-stage commitment without putting required words inside an image. UI marks, favicon, and PWA icons are hand-authored geometric SVG/PNG assets based on the same two-token bridge.

### Generation prompt sheet

- Use case: `stylized-concept`
- Asset: wide landing hero and social crop
- Subject: two distinct round porcelain milestone tokens joined by one slim cobalt-glazed ceramic bridge
- World: a minimal icy ceramic studio tabletop with faint scoring lines that suggest a calendar grid
- Materials: matte white stoneware, translucent pale-blue glaze, one deep cobalt glaze line, tiny handmade edge variation
- Light: cool north-window light, long soft shadows, calm winter morning
- Lens/composition: editorial still life, slightly elevated three-quarter view, subjects on the right half with generous quiet negative space, no horizon
- Palette words: glacier white, mineral blue, deep cobalt, graphite shadow, a trace of warm kiln clay
- Negative list: text, letters, numerals, logos, people, hands, clocks, coins, credit cards, generic office equipment, glossy plastic, gradients, watermark, visual clutter
- Required phrase: “no text, no watermark, no logos”

## Provenance

The raster illustration is generated specifically for this product with the factory image deployment through `/opt/fleet/lib/gen-image.sh`. Generation date: 2026-08-28. The exact prompt and output metadata are stored beside the source asset in `assets/src/hero-ceramic.json`. Generated imagery is disclosed in the footer. All SVG marks are authored in this repository and released with the product under MIT.
