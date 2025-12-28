# Phronos Site Architecture

**Version:** 1.2.1  
**Date:** 2025-12-28  
**Status:** Ready for implementation  
**Alignment:** BRAND.yaml v1.1.1, CARD-SYSTEM.md v1.1.0, DISPATCH-PAGE.md v1.0.0  
**Changes:** Added DISPATCH-PAGE.md reference; updated dispatch page section

---

## Overview

Phronos.org is a static-first website designed as a digital observatory. It prioritizes:
- **"Field Journal" Aesthetic:** Light mode narrative content anchored by static data artifacts.
- **The Library:** A dedicated evidence layer (syntheses of peer-reviewed lit) underpinning all findings.
- **Cartographic Data:** Static, CSS-only visualizations (sparklines, distribution bars) that look like technical ink illustrations.
- **Dark Mode "Labs":** Dark interfaces are reserved strictly for active instruments (tools). Narrative content is always light mode.
- **Minimal JavaScript:** Interactions are handled via CSS where possible (hover states, sticky rails).
- **Unified Card System:** All content types use a single card component (see CARD-SYSTEM.md).

---

## Tech Stack (Recommended)

### Astro
```text
Framework:     Astro 4.x
Styling:       CSS Custom Properties (no Tailwind, per Brutalist specs)
Content:       Markdown/MDX (for Dispatches, Methods, Library)
Interactivity: React (for Instrument tools only)
Deployment:    Vercel or Cloudflare Pages
```

### Fonts
```
Primary (Serif):  Cormorant Garamond — headers, body, narrative
Secondary (Mono): Fira Code — labels, data, navigation, buttons
Fallback (Sans):  Inter, system-ui — only if serif unavailable
```

Load via Google Fonts or self-host for performance:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Design Tokens

All design tokens should be defined in a central CSS file (`/styles/tokens.css`):

```css
:root {
  /* === COLORS: LIGHT MODE === */
  --paper: #F2F0E9;
  --ink: #1A1A1A;
  --gold: #B08D55;
  --gold-dim: rgba(176, 141, 85, 0.12);
  --faded: rgba(26, 26, 26, 0.5);
  --faded-light: rgba(26, 26, 26, 0.08);
  --white: #FFFFFF;
  --alert: #CC5544;
  --success: #44AA77;
  --warning: #DDAA33;

  /* === COLORS: DARK MODE === */
  --bg-deep: #1A1A1A;
  --text-light: #F2F0E9;
  --faded-dark: rgba(242, 240, 233, 0.5);
  --faded-light-dark: rgba(242, 240, 233, 0.15);
  --card-bg: #252525;

  /* === CHART TOKENS (Cartographic Suite) === */
  --chart-ink: #1A1A1A;
  --chart-gold: #B08D55;
  --grid-line: rgba(26, 26, 26, 0.05);
  --grid-major: rgba(26, 26, 26, 0.1);

  /* === TYPOGRAPHY === */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-mono: 'Fira Code', Consolas, Monaco, monospace;

  /* === SCALE === */
  --text-xs: 0.65rem;    /* 10.4px - micro labels */
  --text-sm: 0.7rem;     /* 11.2px - nav, status */
  --text-base: 0.95rem;  /* 15.2px - card descriptions */
  --text-md: 1rem;       /* 16px - body text */
  --text-lg: 1.3rem;     /* 20.8px - card titles */
  --text-xl: 2rem;       /* 32px - section titles */
  --text-2xl: 2.75rem;   /* 44px - page titles */
  --text-hero: clamp(2.5rem, 5.5vw, 3.75rem);

  /* === SPACING === */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;

  /* === MOTION === */
  --transition-fast: 0.1s ease;
  --transition-default: 0.2s ease;
  --transition-slow: 0.3s ease;

  /* === BORDERS === */
  --border-primary: 1px solid var(--ink);
  --border-divider: 1px solid var(--faded-light);
}
```

---

## Grid Background

The entire site has a subtle grid background applied to the body element:

```css
/* Light mode grid (applied to body) */
body {
  background-color: var(--paper);
  background-image:
    linear-gradient(rgba(26, 26, 26, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 26, 26, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  background-attachment: fixed;
}

/* Dark mode grid (instruments section) */
.instruments-section {
  background: var(--bg-deep);
  position: relative;
}

.instruments-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(242, 240, 233, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242, 240, 233, 0.015) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

---

## Site Map

```
phronos.org/
├── /                       # Homepage (Field Journal style)
├── /dispatches/            # Dispatch listing (card grid)
│   └── /dispatches/[slug]  # Individual dispatch (DSP-###)
├── /library/               # The Evidence Base (card grid)
│   └── /library/[slug]     # Individual synthesis (LIB-###)
├── /methods/               # Protocols listing (card grid)
│   └── /methods/[slug]     # Individual method (MTH-###)
├── /instruments/           # Active Research Tools (Dark Mode)
│   └── /instruments/[slug] # Individual instrument (INS-###)
├── /about                  # Founder bio, observatory philosophy
├── /constitution           # The seven axioms
└── /soul                   # Founder's statement
```

**Navigation Order:** Dispatches · Library · Methods · Instruments · About · [Subscribe]

---

## Page Templates

### 1. Homepage (`/`)
**Mode:** Light (with dark instruments section embedded)

**Sections:**
1. **Navigation** — Sticky, white background on scroll
2. **Hero** — Two-column grid (content + observatory telemetry panel), vertically centered
3. **Dispatches (01)** — Card grid
4. **Library (02)** — Card grid
5. **Methods (03)** — Card grid
6. **Instruments (04)** — Card grid (dark mode section)
7. **About (05)** — Two-column: founder info + observatory description
8. **Subscribe (06)** — Two-column: copy + Substack embed
9. **Footer** — Centered, transparent background

**Hero Section Details:**
- Left column:
  - Label: Horizontal line (40px) + "Cognitive Infrastructure" (grey, mono, uppercase)
  - H1: "Know thyself." / "Empirically." (second line in gold italic)
  - Intro paragraph (serif)
  - No CTA buttons
- Right column:
  - Observatory telemetry panel (white background, ink border, hard shadow)
  - "LIVE TELEMETRY" header
  - Sample metrics with sparkline chart

**About Section Details:**
- Left column: Founder name, credentials (MD · PhD), blockquote from SOUL.md
- Right column: Observatory tagline, description paragraphs, "Read the Constitution" button

**Footer Details:**
- Tagline: "Phenotyping for Human Resilience, Ontological Navigation, & Open Science"
- Links: GitHub · Contact
- Copyright: © 2025 Phronos
- Background: transparent (grid shows through)

### 2. Dispatch Listing (`/dispatches/`)
**Mode:** Light

**Layout:**
- Page header with section title
- Card grid of all dispatches (sorted by date, newest first)
- Cards use unified Card component

### 3. Dispatch Page (`/dispatches/[slug]`)
**Mode:** Light (narrative)
**Specification:** See **DISPATCH-PAGE.md** for complete implementation details.

**Layout:**
- Header: Two-row meta bar (ID, reading time, status / version, date)
- Author block
- Body: Single column prose (max-width 800px)
- Figures: Embedded charts and tables using **Cartographic Suite** (light mode)
- Callouts, pull quotes, template blocks
- Dispatch footer: Data source, references, topics (three-column grid)
- Subscribe CTA block (Substack)
- Related section: Card grid linking to other dispatches, methods, library entries

**Key Principle:** All embedded data visualizations use light mode (Cartographic Suite). Dark mode is reserved for instrument interfaces only.

**Frontmatter:**
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
  - Human-AI Interaction
references:
  methods:
    - MTH-001
  library:
    - LIB-001
  instruments: []
---
```

### 4. Library Listing (`/library/`)
**Mode:** Light

**Layout:**
- Page header with section title
- Card grid of all library entries
- Cards use unified Card component

### 5. Library Entry (`/library/[slug]`)
**Mode:** Light (Academic Register)
**Purpose:** Deep syntheses of peer-reviewed literature

**Layout:**
- Left Rail (Sticky): Dynamic Table of Contents (TOC)
- Main Column: Dense typographic layout (serif)
- Right Rail (Desktop): Sidenotes/Citations (Tufte-style) to avoid footer jumping
- Footer: "Connected Nodes" — Graph view showing which Methods or Dispatches cite this entry

**Frontmatter:**
```yaml
---
id: LIB-001
title: "Cognitive Effects of LLM Interaction"
date: 2025-12-20
status: researching  # published | researching | planned | archived
abstract: "A synthesis of peer-reviewed literature..."
version: "0.1"
---
```

### 6. Method Listing (`/methods/`)
**Mode:** Light

**Layout:**
- Page header with section title
- Card grid of all methods
- Cards use unified Card component

### 7. Method Page (`/methods/[slug]`)
**Mode:** Light

**Layout:**
- Meta bar (ID, version, status)
- Title
- Abstract
- Assumptions section
- Methodology (detailed, academic-precise)
- Limitations
- Related instruments
- Changelog

**Frontmatter:**
```yaml
---
id: MTH-001
title: "Observational Chat Analysis"
version: "1.0"
date: 2025-12-10
status: published  # published | researching | planned | archived
abstract: "A methodology for analyzing real-world human-AI conversations..."
related_instruments:
  - INS-001
---
```

### 8. Instrument Listing (`/instruments/`)
**Mode:** Dark

**Layout:**
- Page header with section title
- Card grid of all instruments
- Cards use unified Card component (dark variant)

### 9. Instrument Page (`/instruments/[slug]`)
**Mode:** Dark

**Layout:**
- Status indicator: Pulsing dot (Calibrating vs Live)
- Title + description
- Interface: Interactive React component
- Time estimate
- Requirements (Guild membership, etc.)
- CTA (Begin assessment / Join Guild)
- Related method

**Frontmatter:**
```yaml
---
id: INS-001
title: "Semantic Associations"
description: "Maps how your mind connects ideas through word association chains."
status: calibrating  # live | calibrating | planned | archived
order: 1
related_method: MTH-001
version: "0.1"
---
```

### 10. Constitution (`/constitution`)
**Mode:** Light

**Layout:**
- Title
- Vision block
- Mission block
- Prior section
- Seven Axioms (I-VII)
- Footer note about living document
- Backronym

### 11. Soul (`/soul`)
**Mode:** Light

**Layout:**
- Personal essay format
- Founder byline
- Backronym

### 12. About (`/about`)
**Mode:** Light

**Layout:**
- Founder section (photo placeholder, bio)
- Observatory philosophy
- Contact information
- Link to Constitution and Soul

---

## Substack Integration

Dispatches are distributed via Substack for email delivery. The site and Substack work in a clear hierarchy:

### Domain Strategy

| Purpose | URL | Platform |
|---------|-----|----------|
| **Archive (Canonical)** | `https://phronos.org/dispatches` | Astro (Vercel) |
| **Newsletter Delivery** | `https://dispatches.phronos.org` | Substack |

The site is the "observatory"—the authoritative, high-fidelity version with full Field Journal aesthetic, data artifacts, and typography. Substack is the "courier"—a simplified text version delivered to inboxes.

### SEO Protection

To prevent search engines from treating the Substack version as duplicate content, two canonical signals are required:

**1. Astro Layout (automatic):**

In `src/layouts/DispatchLayout.astro`:
```html
<head>
  <link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />
</head>
```

**2. Substack Post Settings (manual, per-post):**

When creating each Substack post, open Settings → SEO & Social → Canonical URL and enter:
```
https://phronos.org/dispatches/[slug]
```

This tells Google: "The site version is the original; the email copy is syndicated."

### DNS Configuration

Add a CNAME record in your DNS provider:

| Type | Name | Target |
|------|------|--------|
| CNAME | `dispatches` | `target.substack-custom-domains.com` |

Then in Substack (Settings → Publication details → Custom domain), enter `dispatches.phronos.org` and wait for SSL provisioning (10-30 minutes).

### Implementation

**Homepage Subscribe Section:**
```html
<iframe 
  src="https://dispatches.phronos.org/embed" 
  width="100%" 
  height="150" 
  style="border:none; background:transparent;" 
  frameborder="0" 
  scrolling="no">
</iframe>
```

**Dispatch Footer CTA:**
```html
<div class="subscribe-cta-block">
  <p>Get dispatches delivered to your inbox.</p>
  <a href="https://dispatches.phronos.org/subscribe" class="subscribe-button">
    Subscribe
  </a>
</div>
```

### Substack Setup Checklist

1. Create publication at phronos.substack.com
2. Configure custom domain: `dispatches.phronos.org`
3. Match branding (use gold accent, serif fonts where possible)
4. Configure: no paywall, free tier only (for now)
5. Add phronos.org link in Substack bio/about
6. Set publication description to reference the observatory

### Publishing Workflow

1. Write dispatch in MDX for phronos.org
2. **Publish on site first** — this establishes the canonical version
3. Copy content to Substack (reformatted for email—simpler formatting, no data artifacts)
4. **Set canonical URL in Substack post settings** — point to the site version
5. Send to subscribers

**Note:** Substack's embed form styling is limited. The container wrapper on phronos.org should use `background: var(--paper)` and a subtle border to integrate it visually.

---

## Component Library

### Global Components
| Component | Description | Mode |
|-----------|-------------|------|
| `Nav` | Sticky navigation with animated ouroboros logo | Light |
| `Footer` | Centered layout with tagline, links, copyright | Both |
| `SectionHeader` | Section number + title | Both |
| `DataArtifact` | Renders CSS Sparklines/Bars (Cartographic Style) | Light |
| `Citation` | Hoverable tooltip for references | Light |
| `ConnectedNodes` | Footer block showing links between content types | Light |
| `ObservatoryPanel` | Hero telemetry panel with sample metrics | Light |

### Card Component

All content types use a **unified Card component**. See **CARD-SYSTEM.md** for complete specification.

| Component | Description | Mode |
|-----------|-------------|------|
| `Card` | Unified card for all content types (DSP, LIB, MTH, INS) | Both |
| `SubscribeCTA` | Substack subscribe block | Light |

**Card Structure:**
```
┌─────────────────────────────────────────┐
│ TYPE-###                   Status   [●] │  ← Header
├─────────────────────────────────────────┤
│ Title                                   │
│ Description...                          │
├─────────────────────────────────────────┤
│ v1.0                                    │  ← Footer (version only)
└─────────────────────────────────────────┘
```

### Content Components
| Component | Description | Mode |
|-----------|-------------|------|
| `Callout` | Methodology note, warning | Light |
| `PullQuote` | Large inline quote | Light |
| `Figure` | Data visualization container | Light |
| `TemplateBlock` | Code/template display | Light |
| `SectionDivider` | Diamond separator | Light |

### Interactive Components
| Component | Description |
|-----------|-------------|
| `StatusDot` | Pulsing status indicator |
| `Button` | Primary/secondary CTA button |
| `NavLink` | Navigation link with hover |

---

## CSS Architecture

### File Structure
```
/styles/
├── tokens.css          # Design tokens (colors, typography, spacing)
├── reset.css           # CSS reset
├── base.css            # Base element styles
├── layout.css          # Grid backgrounds, section layouts
├── components/
│   ├── nav.css
│   ├── footer.css
│   ├── cards.css       # Unified card styles (light + dark)
│   ├── buttons.css
│   └── callouts.css
├── pages/
│   ├── home.css
│   ├── dispatch.css
│   ├── method.css
│   ├── library.css
│   └── instrument.css
└── utilities.css       # Helper classes
```

### Dark Mode Implementation

Dark mode is **not** user-toggled. It's applied to specific sections via class:

```css
/* Dark mode applied via class, not media query */
.instruments-section {
  background: var(--bg-deep);
  color: var(--text-light);
  position: relative;
}

.instruments-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(242, 240, 233, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242, 240, 233, 0.015) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

---

## Content Management

### No CMS Needed (Yet)

At this stage, a CMS adds complexity without benefit. Astro's content collections provide:
- Type-safe frontmatter schemas
- Single source of truth for status
- Homepage queries content collections directly
- No sync issues—everything reads from the same files

**When you might need a CMS:**
- Multiple non-technical contributors
- High-frequency content updates (daily+)
- Complex editorial workflows

**Until then:** MDX files in `/content/` are your CMS.

### Status Taxonomy

Use consistent status values across all content types:

| Status | Used For | Meaning | Display |
|--------|----------|---------|---------|
| `published` | Dispatches, Methods, Library | Live and complete | Green dot, clickable |
| `live` | Instruments | Active and accessible | Green dot, clickable |
| `researching` | Dispatches, Methods, Library | In progress, visible | Gold dot, not clickable |
| `calibrating` | Instruments | In development, visible | Gold dot, not clickable |
| `planned` | All | Future work, visible | Grey dot, not clickable |
| `archived` | All | Deprecated | Hidden from listings |

### Making the Homepage Dynamic

The homepage should query content collections, not hardcode content. This ensures status stays in sync automatically.

**Example: Dispatches section in Astro**
```astro
---
import { getCollection } from 'astro:content';
import Card from '../components/Card.astro';

const dispatches = await getCollection('dispatches', ({ data }) => {
  return data.status !== 'archived';
});

const sortedDispatches = dispatches.sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---

<section class="section" id="dispatches">
  <div class="section-header">
    <span class="section-id">01</span>
    <span class="section-title">Dispatches from the Observatory</span>
  </div>
  
  <div class="card-grid">
    {sortedDispatches.map(dispatch => (
      <Card 
        id={dispatch.data.id}
        title={dispatch.data.title}
        description={dispatch.body.slice(0, 150)}
        status={dispatch.data.status}
        version={dispatch.data.version}
        href={`/dispatches/${dispatch.slug}`}
      />
    ))}
  </div>
</section>
```

**Example: Instruments section**
```astro
---
import { getCollection } from 'astro:content';
import Card from '../components/Card.astro';

const instruments = await getCollection('instruments', ({ data }) => {
  return data.status !== 'archived';
});
const sorted = instruments.sort((a, b) => a.data.order - b.data.order);
---

<section class="section instruments-section" id="instruments">
  <div class="section-header">
    <span class="section-id">04</span>
    <span class="section-title">Instruments</span>
  </div>
  
  <div class="card-grid">
    {sorted.map(instrument => (
      <Card
        id={instrument.data.id}
        title={instrument.data.title}
        description={instrument.data.description}
        status={instrument.data.status}
        version={instrument.data.version}
        mode="dark"
      />
    ))}
  </div>
</section>
```

### Content Collection Schemas

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const dispatches = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    author: z.string().default('Vishal Patel'),
    reading_time: z.number().optional(),
    version: z.string().optional(),
    data_source: z.string().optional(),
    topics: z.array(z.string()).optional(),
    references: z.object({
      methods: z.array(z.string()).optional(),
      library: z.array(z.string()).optional(),
      instruments: z.array(z.string()).optional(),
    }).optional(),
  }),
});

const library = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    abstract: z.string().optional(),
    version: z.string().optional(),
  }),
});

const methods = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    abstract: z.string().optional(),
    version: z.string().optional(),
    related_instruments: z.array(z.string()).optional(),
  }),
});

const instruments = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(['live', 'calibrating', 'planned', 'archived']),
    order: z.number(),
    related_method: z.string().optional(),
    version: z.string().optional(),
  }),
});

export const collections = { dispatches, library, methods, instruments };
```

### Workflow

1. **Create/update content** → Edit MDX file, change `status` in frontmatter
2. **Build site** → Astro queries collections, renders with current status
3. **Deploy** → Vercel/Cloudflare rebuilds on git push

Status changes propagate automatically. No manual syncing.

### Content Files Structure

```
/src/content/
├── config.ts              # Schema definitions
├── dispatches/
│   ├── dsp-001.mdx        # status: published
│   └── dsp-002.mdx        # status: researching
├── library/
│   └── lib-001.mdx        # status: planned
├── methods/
│   ├── mth-001.mdx        # status: published
│   └── mth-002.mdx        # status: researching
└── instruments/
    ├── ins-001.mdx        # status: calibrating
    └── ins-002.mdx        # status: calibrating
```

---

## Build & Deploy

### Development
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
```

### Environment Variables
```
PUBLIC_SITE_URL=https://phronos.org
```

### Deployment
- **Primary:** Vercel (automatic from GitHub)
- **Fallback:** Cloudflare Pages

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total Bundle | < 100KB |

### Optimization Strategies
1. Self-host fonts (subset to used characters)
2. Preload critical fonts
3. Inline critical CSS
4. Lazy load below-fold images
5. Use native `loading="lazy"` for images
6. Avoid JavaScript where CSS suffices

---

## Accessibility

- Semantic HTML throughout
- Skip link to main content
- Focus states on all interactive elements
- Color contrast meets WCAG AA
- Alt text for all images
- Reduced motion support: `@media (prefers-reduced-motion: reduce)`

---

## Reference Documents

These documents provide additional specification detail:

| Document | Purpose |
|----------|---------|
| **CARD-SYSTEM.md** | Complete card component specification |
| **DISPATCH-PAGE.md** | Dispatch detail page specification |
| **BRAND.yaml** | Voice, tone, visual identity |
| **CONSTITUTION.md** | The seven axioms |
| **SOUL.md** | Founder's statement |

All are living documents maintained alongside this architecture.

---

## Future Considerations

1. **Membership/Guild** — Paid tier with instrument access (Stripe + Supabase/Clerk)
2. **Instrument Interfaces** — React/Svelte apps for assessments
3. **Data Visualization** — D3.js or Observable Plot for charts
4. **Data Commons** — API for anonymized dataset access
5. **RSS Feed** — Auto-generate from dispatch content collection

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.2.1 | 2025-12-28 | Added DISPATCH-PAGE.md reference; updated dispatch page section with Cartographic Suite requirement and references schema |
| 1.2.0 | 2025-12-28 | Aligned homepage with mockup v2; unified card system; updated grid values (60px light, 40px dark); expanded status taxonomy (6 statuses); added navigation order; detailed hero/about/footer specs |
| 1.1.2 | 2025-12-27 | Formalized Substack custom domain with canonical URL strategy |
| 1.1.1 | 2025-12-26 | Added Library section; restored Instruments to dark mode |
| 1.0.0 | 2025-12-25 | Initial architecture |
