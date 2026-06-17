# BYDT Visual Operating System

**Core truth (from founder direction):**  
A competitive website is not made of pages. It is made of recognizable visual decisions.  
BYDT needs to become recognizable at a glance.

> Cream paper. Aerospace navy. Gold signal lines. WonderCards. Badges. Blueprint traces.  
> Child imagination, adult-grade structure.

The website is the **stage**.  
The assets are the **actors**.

This document + the linked Canva designs = Phase 1 foundation.

## The correct order (asset-system-first)

```
BYDT Core Meaning
        ↓
Visual Language  (this file + Brand Board)
        ↓
Asset Library    (Canva production templates below)
        ↓
Templates        (WonderCards, badges, flyers, social — reusable)
        ↓
Website          (the Next.js /journeys immersive experience + homepage as the stage)
        ↓
Events / Parents / Partners / Kids
```

Most people do Website → Hope it looks good.  
That is backwards. Website-first gets a shell. Asset-system-first gets a **world**.

## Figma + Canva split (as specified)

- **Figma** (future master design brain): Brand system, full component library, website mockups, spacing/hierarchy rules, export specs for Codex/v0/Webflow/Framer. One master file named **BYDT Visual Operating System**.
- **Canva** (current production engine): Everyday deployable assets — event handouts, social, parent PDFs, print badges/stickers/posters, fast remixing per event. What you see below.

## What was built first (Phase 1 + Phase 2 starter)

All generated via Canva `generate-design` + the existing **BYDT brand kit** (id: kAHMC3ddkxc), using the exact provided hand-drawn book cover image (child on red rocket, warm cream/navy/gold, joyful serious child's deep space perspective) as the style anchor in every prompt.

**Persisted editable designs (open in Canva → refine → Download PNG/PDF → drop into /public/images):**

1. **WonderCard** (the gold proof object)  
   Design ID: DAHMzSdlvM0  
   Edit: https://www.canva.com/d/8rtJiPrXyNwSZIc  
   View: https://www.canva.com/d/2m9TS2xKF4T3UTH  
   (Poster format, cream paper, navy/gold, sections for Spark / Built / Evidence, hand-drawn stars/planes/rockets, "Proof of Capability")

2. **Cape-Able Hero Badge**  
   Design ID: DAHMzfYGEJ0  
   Edit: https://www.canva.com/d/j6GTeqFisMuE0Vj  
   Collectible badge format — child declares capability, gold border, blueprint + cape elements.

3. **Aviation Wonderlab Card / Boarding Pass**  
   Design ID: DAHMzTz5n4U  
   Edit: https://www.canva.com/d/3_lq5ghi-2m2Pf-  
   Mission / Team Airline / Test Results / Evidence. Paper plane + runway blueprint.

4. **Parent Explainer Flyer — "What Your Child Will Bring Home"**  
   Design ID: DAHMzYFKCeA  
   Edit: https://www.canva.com/d/ePRDAfARzn3_PmY  
   Clear, friendly, adult-grade. The Spark → The Build → The Evidence.

5. **BYDT Brand Board / Visual Foundation Poster** (Phase 1 master reference)  
   Design ID: DAHMzf5SUAI  
   Edit: https://www.canva.com/d/-c79Hait7iuXg0g  
   Logo lockups, exact color palette (Cream #F8F4ED, Navy #0A162F, Gold #BFA16B, Sky #7BA3C9), typography, borders/frames, card styles, icon language, illustration rules.  
   **This is the single source that Figma and all future work should derive from.**

6. **Instagram / Social Post Template**  
   Design ID: DAHMzRIgQcY  
   Edit: https://www.canva.com/d/jOovKaYX2wISjni  
   Instant recognition asset for campaigns.

**Original generation jobs** (if you want other candidates from the 4 options per prompt):  
- WonderCard job: b9ec676e-bbbb-46f5-8025-a6f40c65de2f  
- Cape-Able job: f5a99f71-05f3-4fdc-bb08-569043fa5538  
- Aviation job: 97bb09f9-ffbd-4239-b7a4-9fefdf062c32  
- Parent flyer job: b9d59357-ae04-4dbf-905c-0260e8ae0f96  
- IG job: 68409da6-8ad3-4f89-8878-daf8db0d79b2  
- Brand Board job: fde0e049-29de-4c3b-b89b-7f4e46c1f098

## Brand primitives (already live in code + board)

See the Brand Board poster above + the implementation in the Next.js app:

- **Colors** (globals.css): `--color-cream`, `--color-navy`, `--color-gold`, `--color-sky`
- **Typography**: Playfair (display), Geist (sans/mono)
- **Surfaces & treatment**: .steel-beam, .card, .btn, .hand-drawn sketch textures, gold signal lines
- **Tone**: "This is for children, but it was built by someone serious." No rounded gradient blobs, no stock smiling children, no "unlock your potential" wallpaper.

## Signature artifacts (the proof objects)

These make BYDT feel real *before* anyone reads a paragraph:
- WonderCards
- Boarding passes / Aviation Wonderlab cards
- Cape-Able badges
- Kid mission cards (next)
- Parent explainer cards
- Partner invitation cards
- "Build Sheet" templates
- Event handouts, stickers, posters

## Website as stage (current state)

The Next.js site (app router, Tailwind 4, Framer Motion, custom 2D StarfieldCanvas with journey-specific currents/floaties, reactive HUD SVG, custom loader, BreathingStar, rich JourneyModal with "FROM MY HANDS" + Key Evidence ✗, WebAudio space hum) is deliberately built as the **immersive stage** once the visual world exists.

- Homepage hero now points at matching hand-drawn asset (update with your exact cover when placed).
- /journeys is the deep "The Dreams We Breathe" experience (no generic nav, custom header, selectable currents, modals as proof-object spotlights).
- Components live in /components (StarfieldCanvas, Hud, JourneyModal, Navbar, etc.).
- All styling governed by the tokens above — no generic soup.

## Immediate next moves (your order)

1. Open the 6 designs above in Canva. Refine, duplicate for variants (different child names, different sparks), lock the brand elements.
2. **Export** high-res PNG (web) + PDF print versions. Name clearly:
   - wondercard-main.png
   - capea-ble-badge.png
   - aviation-wonderlab-card.png
   - parent-explainer-flyer.png
   - bydt-brand-board.png
   - instagram-evidence-post.png
3. Place exports in `public/images/`.
4. We integrate:
   - Hero uses the real cover.
   - What We Create grid uses exported cards/badges as visuals or backgrounds.
   - Journeys modals pull real WonderCard / badge imagery.
   - New /resources or downloadable section with the PDFs.
   - Social proof blocks.
5. Create the master Figma file (BYDT Visual Operating System) by tracing the Brand Board + these Canva pieces into components, auto-layout, variants, and full homepage + section mocks.
6. Then the website gets built from **actual BYDT assets**, not generic AI confetti.

## Character / mascot language (to evolve in Figma + Canva)

Wonderlings • Dream Engineers • Cape-Able Heroes • Syntax Goblin • Field Guide animals • Aviation helpers • Blueprint creatures.

The visual language says: “This is for children, but it was built by someone serious.”

## The sauce

The site should feel like someone opened a field guide from the future and found their child’s dream already waiting there.

Cream paper. Aerospace navy. Gold signal lines.  
WonderCards. Badges. Blueprint traces.

This is the bottleneck. This is the move.

---

**Status (2026-06-17):** Phase 1 foundation + starter Canva Deployment Kit live in your account via the BYDT brand kit.  
Site stage code is already non-generic and immersive.  
Next: export → integrate → Figma master.

Open the Brand Board first. That governs everything else.
