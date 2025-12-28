# Dispatch Page Specification

**Version:** 1.0.0  
**Date:** 2025-12-28  
**Status:** Ready for implementation  
**Reference Mockup:** `phronos-dispatch-v1.html`

---

## Overview

The dispatch detail page displays individual essays/findings from the observatory. It uses the **Cartographic Suite** (light mode) for all embedded data visualizations, maintaining a cohesive reading experience that feels like a scientific journal article.

**Key Principle:** Dispatches are narrative content. All tables, charts, and figures use light mode styling. Dark mode is reserved exclusively for instrument interfaces.

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Navigation (sticky)                                         │
├─────────────────────────────────────────────────────────────┤
│ Dispatch Header                                             │
│   Meta Bar (two rows)                                       │
│   Title                                                     │
│   Subtitle                                                  │
├─────────────────────────────────────────────────────────────┤
│ Author Block                                                │
├─────────────────────────────────────────────────────────────┤
│ Article Body                                                │
│   Lead paragraph                                            │
│   Prose sections with H2 headers                            │
│   Data tables (Cartographic)                                │
│   Charts/figures (Cartographic)                             │
│   Pull quotes                                               │
│   Callout boxes                                             │
│   Code/template blocks                                      │
├─────────────────────────────────────────────────────────────┤
│ Dispatch Footer                                             │
│   Data Source | References | Topics                         │
│   Subscribe CTA                                             │
├─────────────────────────────────────────────────────────────┤
│ Related Section                                             │
│   Card grid (DSP, MTH, LIB, INS)                           │
├─────────────────────────────────────────────────────────────┤
│ Site Footer                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Meta Bar Layout

Two-row layout with three-column alignment:

```
Row 1:  DSP-###          12 min read          Published [●]
Row 2:  v1.0                            December 15, 2025
```

**Row 1:**
- Left: Dispatch ID (gold, mono, 0.75rem)
- Center: Reading time (faded, mono, 0.7rem, uppercase)
- Right: Status group (text + dot)

**Row 2:**
- Left: Version (faded, mono, 0.7rem)
- Right: Date (faded, mono, 0.7rem, uppercase)

**Spacing:** 0.25rem between rows. Bottom border (faded-light) with 1.5rem padding below.

---

## Author Block

```
┌──────────────────────────────────────┐
│ [VP]  Vishal Patel                   │
│       MD · PhD (Genetics)            │
└──────────────────────────────────────┘
```

- Avatar: 48px circle, gold-dim background, gold border, initials in mono
- Name: serif, 1rem, medium weight
- Credentials: serif, 0.85rem, italic, faded

---

## Article Body

**Max width:** 800px, centered

### Typography

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Lead paragraph | Serif | 1.3rem | 400 | First paragraph, larger |
| Body text | Serif | 1.1rem | 400 | Line-height: 1.85 |
| H2 | Serif | 1.5rem | 500 | Top border, margin-top: 3rem |
| H3 | Serif | 1.25rem | 500 | Italic |
| Links | — | — | — | Gold, underline, turns ink on hover |

### Data Table (Cartographic Suite)

Light mode styling for embedded tables:

```css
.data-table-wrapper {
    background: var(--white);
    border: 1px solid var(--ink);
    box-shadow: 8px 8px 0px rgba(26, 26, 26, 0.05);
}

/* Millimeter paper grid overlay */
.data-table-wrapper::before {
    background-image:
        linear-gradient(rgba(26, 26, 26, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(26, 26, 26, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
}

.data-table th {
    color: var(--gold);  /* Gold headers */
}

.data-table td {
    color: var(--ink);
}

.data-table tr:hover td {
    background: var(--gold-dim);
}
```

### Chart Figure (Cartographic Suite)

Light mode styling for SVG charts:

```css
.chart-container {
    background: var(--white);
    border: 1px solid var(--ink);
    box-shadow: 10px 10px 0px rgba(26, 26, 26, 0.05);
}

.chart-header {
    background: rgba(26, 26, 26, 0.02);
    border-bottom: 1px solid var(--faded-light);
}

.chart-id { color: var(--gold); }
.chart-title { color: var(--ink); }
```

**SVG Elements:**
- Axes: `stroke: var(--ink)`
- Grid lines: `stroke: rgba(26, 26, 26, 0.08)`
- Labels: `fill: rgba(26, 26, 26, 0.5)` (mono, 10px)
- Primary data (signal): Gold (`#B08D55`)
- Secondary data (comparison): `rgba(26, 26, 26, 0.25)`
- Legend box: White with subtle border

### Pull Quote

```css
.pull-quote {
    background: var(--white);
    border-left: 3px solid var(--gold);
    padding: 2rem 2.5rem;
}

.pull-quote p {
    font-size: 1.35rem;
    font-style: italic;
}
```

### Callout Box

```css
.callout {
    background: var(--gold-dim);
    border: 1px solid var(--gold);
    padding: 1.5rem 2rem;
}

.callout-label {
    color: var(--gold);
    font-family: var(--font-mono);
    text-transform: uppercase;
}
```

### Template/Code Block

```css
.template-block {
    background: var(--ink);
    color: var(--paper);
    padding: 1.5rem;
    font-family: var(--font-mono);
}

.template-block-label {
    color: var(--gold);
}
```

---

## Dispatch Footer

Three-column grid layout:

```
DATA SOURCE              REFERENCES                        TOPICS
WildChat Dataset,    MTH-001 · Observational...    AI Safety · Cognitive
Allen AI Institute   LIB-001 · Cognitive...        Disorder · Psychosis ·
(August 2025)                                      Human-AI Interaction
```

| Column | Alignment | Content |
|--------|-----------|---------|
| Left | Left | Data source (paragraph) |
| Center | Center | References (linked IDs) |
| Right | Right | Topics (inline with · separators) |

**Consistent typography:**
- Headers: mono, 0.65rem, faded, uppercase
- Body content: mono, 0.75rem, ink
- Reference links: turn gold on hover

**Note:** Version is NOT in footer (it's already in header meta bar).

---

## Subscribe CTA

```
┌──────────────────────────────────────────────────────────────┐
│ Get dispatches delivered to your inbox          [Subscribe] │
│ Essays reporting what the observatory detects.              │
└──────────────────────────────────────────────────────────────┘
```

- White background, ink border
- Two-column: copy left, button right
- Button: mono, uppercase, ink background, turns gold on hover

---

## Related Section

Uses unified Card component from CARD-SYSTEM.md:

```
◈ Continue Reading

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ DSP-002     │  │ MTH-001     │  │ LIB-001     │
│ Researching │  │ Published   │  │ Researching │
├─────────────┤  ├─────────────┤  ├─────────────┤
│ Title       │  │ Title       │  │ Title       │
│ Desc...     │  │ Desc...     │  │ Desc...     │
├─────────────┤  ├─────────────┤  ├─────────────┤
│ —           │  │ v1.0        │  │ —           │
└─────────────┘  └─────────────┘  └─────────────┘
```

Grid: `repeat(auto-fill, minmax(280px, 1fr))`

---

## Frontmatter Schema

```yaml
---
id: DSP-001
title: "What 4.8 Million AI Conversations Reveal"
subtitle: "A disorder of cognition, not morality"
date: 2025-12-15
status: published  # published | researching | planned | archived
author: Vishal Patel
reading_time: 12
version: "1.0"
data_source: "WildChat Dataset, Allen AI Institute"
topics:
  - AI Safety
  - Cognitive Disorder
  - Psychosis
  - Human-AI Interaction
references:
  methods:
    - MTH-001
  library:
    - LIB-001
  instruments: []
---
```

---

## Responsive Behavior

**Breakpoint: 768px**

- Meta bar: maintains two-row structure
- Footer: collapses to single column, all left-aligned
- Related cards: single column
- Subscribe CTA: stacks vertically

---

## Cursor Agent Build Prompt

```markdown
# Build: Dispatch Detail Page

You are building the dispatch detail page for Phronos. Read these files first:

1. `/mnt/project/ARCHITECTURE.md` - Overall site architecture
2. `/mnt/project/BRAND.yaml` - Voice, tone, visual identity
3. `/mnt/skills/public/[relevant skills]` - Any applicable skills

## Reference Files

- `DISPATCH-PAGE.md` - This specification
- `CARD-SYSTEM.md` - Card component specification
- `phronos-dispatch-v1.html` - Reference mockup

## Tech Stack

- Astro 4.x
- CSS Custom Properties (no Tailwind)
- MDX for content
- TypeScript for type safety

## File Structure to Create

```
src/
├── layouts/
│   └── DispatchLayout.astro
├── components/
│   ├── dispatch/
│   │   ├── DispatchHeader.astro
│   │   ├── AuthorBlock.astro
│   │   ├── DispatchFooter.astro
│   │   └── SubscribeCTA.astro
│   ├── content/
│   │   ├── DataTable.astro
│   │   ├── ChartFigure.astro
│   │   ├── PullQuote.astro
│   │   ├── Callout.astro
│   │   └── TemplateBlock.astro
│   └── Card.astro (if not exists)
├── styles/
│   ├── components/
│   │   └── dispatch.css
│   └── cartographic.css
└── pages/
    └── dispatches/
        └── [slug].astro
```

## Implementation Steps

### 1. Create DispatchLayout.astro

The main layout wrapper. Must include:
- Canonical URL in `<head>`
- Navigation component
- Main content slot
- Site footer
- Grid background on body (60px, light mode)

### 2. Create DispatchHeader.astro

Props: `id`, `title`, `subtitle`, `date`, `readingTime`, `version`, `status`

Two-row meta bar:
- Row 1: ID (left), reading time (center), status+dot (right)
- Row 2: version (left), date (right)

### 3. Create AuthorBlock.astro

Props: `name`, `credentials`, `initials`

Avatar circle with initials, name, credentials.

### 4. Create Cartographic Components

`DataTable.astro`:
- White background, ink border, hard shadow
- Millimeter paper grid overlay
- Gold headers, ink body
- Hover state with gold-dim background

`ChartFigure.astro`:
- Container with header (ID + title)
- SVG slot for chart content
- Figcaption below (not embedded)

### 5. Create DispatchFooter.astro

Props: `dataSource`, `references`, `topics`

Three-column grid:
- Left: Data source
- Center: References (linked)
- Right: Topics (inline with separators)

All mono, 0.75rem, consistent styling.

### 6. Create [slug].astro

Dynamic route that:
- Fetches dispatch from content collection
- Renders MDX body
- Populates all components from frontmatter
- Queries related content for card grid

### 7. Create cartographic.css

All Cartographic Suite styles:
- Data table wrapper and elements
- Chart container, header, body
- SVG element classes
- Figure/figcaption styling

## Critical Requirements

1. **NO dark mode for tables/charts** - Everything uses Cartographic (light) styling
2. **Canonical URL** - Must be set in head for SEO
3. **Consistent footer typography** - All mono, 0.75rem, ink color
4. **References section** - Links to MTH/LIB/INS content
5. **Version in header only** - Not duplicated in footer

## Testing Checklist

- [ ] Meta bar displays correctly with all fields
- [ ] Tables render with Cartographic styling
- [ ] Charts render with light mode colors
- [ ] Footer three-column alignment works
- [ ] Topics right-justify correctly
- [ ] Reference links work and highlight on hover
- [ ] Related cards use unified Card component
- [ ] Responsive layout works at 768px breakpoint
- [ ] Canonical URL is correct
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-28 | Initial specification |
