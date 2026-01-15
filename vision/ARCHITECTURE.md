# Phronos Site Architecture

**Version:** 1.4.0  
**Date:** 2026-01-05  
**Status:** Ready for implementation  
**Alignment:** BRAND.yaml v1.3.0, CARD-SYSTEM.md v1.2.0, DISPATCH-PAGE.md v1.1.0, METHODS-SCHEMA.md v2.0.0  
**Changes:** Hierarchical methods architecture (families + studies), semantic URLs, updated content schemas

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
Body (Serif):     Lora — dispatch body text (more readable for long prose)
Secondary (Mono): Fira Code — labels, data, navigation, buttons
Fallback (Sans):  Inter, system-ui — only if serif unavailable
```

---

## Font Loading (V1)

Use Google Fonts CDN for initial release. Self-hosting is a future optimization.

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Fira+Code:wght@400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet">
```

---

## MDX Component Registration

Astro requires explicit component passing in layouts:

```astro
---
import Table from '../components/content/Table.astro';
import Figure from '../components/content/Figure.astro';
import Callout from '../components/content/Callout.astro';
import PullQuote from '../components/content/PullQuote.astro';

const components = { Table, Figure, Callout, PullQuote };
---

<Content components={components} />
```

---

## CSS Import Order

In BaseLayout.astro, import stylesheets in this order:

1. `tokens.css` — Design tokens (colors, typography, spacing)
2. `reset.css` — Browser reset
3. `base.css` — Element styles
4. `layout.css` — Grid backgrounds, section layouts

---

## Image Path Convention

Dispatch images are stored in the public folder:

```
/public/images/dispatches/[slug]/
├── figure-1.png
├── figure-2.png
└── figure-3.png
```

Referenced in MDX as `/images/dispatches/[slug]/figure-1.png`.

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
  --font-body: 'Lora', Georgia, serif;  /* For dispatch body text */
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
├── /                                    # Homepage (Field Journal style)
├── /dispatches/                         # Dispatch listing (card grid)
│   └── /dispatches/[slug]               # Individual dispatch (DSP-###)
├── /library/                            # The Evidence Base (card grid)
│   └── /library/[slug]                  # Individual synthesis (LIB-###)
├── /methods/                            # Methods listing (grouped by family)
│   ├── /methods/[family-slug]/          # Method family overview (MTH-###)
│   └── /methods/[family-slug]/[study-slug]/  # Individual study (MTH-###.N)
├── /instruments/                        # Active Research Tools (Dark Mode)
│   └── /instruments/[slug]              # Individual instrument (INS-###)
├── /about                               # Founder bio, observatory philosophy
├── /constitution                        # The seven axioms
└── /soul                                # Founder's statement
```

**Example Methods URLs:**
```
/methods/                                              # All families
/methods/observational-chat-analysis/                  # MTH-001 overview
/methods/observational-chat-analysis/engagement-prediction/   # MTH-001.1
/methods/observational-chat-analysis/semantic-exploration/    # MTH-001.2
/methods/observational-chat-analysis/model-upgrade-impact/    # MTH-001.3
/methods/observational-chat-analysis/concerning-sessions/     # MTH-001.4
/methods/conversational-assessment/                    # MTH-002 overview
/methods/conversational-assessment/verbal-fluency/     # MTH-002.1
```

**Navigation Order:** Dispatches · Library · Methods · Instruments · About · [Subscribe]

---

## Methods ID System

Methods use a hierarchical ID system for stable citation and cross-referencing:

| Level | Format | Example | Description |
|-------|--------|---------|-------------|
| Family | MTH-NNN | MTH-001 | Methodology framework |
| Study | MTH-NNN.N | MTH-001.3 | Individual analysis |
| Version | vX.Y | v1.2 | Revision tracking |
| Section | #anchor | #toxicity-analysis | Deep link target |

**Citation Examples:**
```
MTH-001                          → Observational Chat Analysis (family)
MTH-001.3                        → Model Upgrade Impact (study)
MTH-001.3 v1.0                   → Specific version
MTH-001.3#toxicity-analysis      → Section within study
```

**Stability Guarantees:**
- IDs are permanent—`MTH-001.3` always refers to "Model Upgrade Impact"
- Slugs may evolve (with redirects)—URL could change from `/model-upgrade-impact/` to `/capability-progression/`
- Dispatches cite IDs, not URLs—robust to restructuring

**Cross-Reference in Dispatch Frontmatter:**
```yaml
references:
  methods:
    - MTH-001           # Cites entire framework
    - MTH-001.3         # Cites specific study
    - MTH-001.4#emergence-timing  # Cites specific section
```

See **METHODS-SCHEMA.md** for complete specification.

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
**Specification:** See **METHODS-SCHEMA.md** for complete content and authoring guidelines.

**Layout:**
- Page header with section title
- Method families displayed as grouped sections
- Each family shows: ID, title, abstract, status, child study count
- Child studies listed under each family with visual hierarchy
- Cards use unified Card component with `variant="family"` and `variant="study"`

**Grouping Behavior:**
```
MTH-001 · Observational Chat Analysis
Framework for analyzing real-world human-AI conversations at scale
Dataset: WildChat-4.8M · Status: Published · v1.1

   MTH-001.1 · Engagement Prediction from First-Turn Features
   MTH-001.2 · Semantic Exploration and Sustained Utilization  
   MTH-001.3 · Model Upgrade Impact on User Engagement
   MTH-001.4 · Characterizing Concerning Usage Sessions

MTH-002 · Conversational Cognitive Assessment
Framework for inferring cognitive traits from brief AI conversations
Status: Researching · v0.1

   MTH-002.1 · Verbal Fluency Assessment (planned)
   MTH-002.2 · Belief Rigidity Inference (planned)
```

### 7. Method Family Page (`/methods/[family-slug]/`)
**Mode:** Light

**Layout:**
- Meta bar (ID, version, status, date)
- Title + subtitle
- Abstract
- Dataset information block
- Assumptions section
- Shared infrastructure (common tools, pipelines, classifiers)
- Studies listing (auto-generated from child studies)
- Framework-level limitations
- Changelog

**Frontmatter:** See METHODS-SCHEMA.md Section 2.1

### 8. Method Study Page (`/methods/[family-slug]/[study-slug]/`)
**Mode:** Light
**Specification:** See **METHODS-SCHEMA.md** for complete content structure and authoring workflow.

**Layout:**
- Breadcrumb: Methods > [Family Title] > [Study Title]
- Meta bar (ID, version, status, date)
- Title + subtitle
- Executive summary
- Table of contents (generated from sections frontmatter)
- Body: Methodology sections with anchored headers
- Metrics and calculations (with LaTeX math)
- Validation documentation
- Limitations
- Data artifacts table
- Sibling navigation (previous/next study in family)
- Changelog

**Deep Linking:** All H2/H3 headers have explicit anchors for citation:
- `MTH-001.4#toxicity-analysis` → `/methods/observational-chat-analysis/concerning-sessions/#toxicity-analysis`

**Frontmatter:** See METHODS-SCHEMA.md Section 2.2

### 9. Instrument Listing (`/instruments/`)
**Mode:** Dark

**Layout:**
- Page header with section title
- Card grid of all instruments
- Cards use unified Card component (dark variant)

### 10. Instrument Page (`/instruments/[slug]`)
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
title: "Semantic Cartography"
description: "Instruments for mapping how you navigate conceptual space."
status: calibrating  # live | calibrating | planned | archived
order: 1
related_method: MTH-001
version: "0.1"
---
```

### 11. Constitution (`/constitution`)
**Mode:** Light

**Layout:**
- Title
- Vision block
- Mission block
- Prior section
- Seven Axioms (I-VII)
- Footer note about living document
- Backronym

### 12. Soul (`/soul`)
**Mode:** Light

**Layout:**
- Personal essay format
- Founder byline
- Backronym

### 13. About (`/about`)
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
      methods: z.array(z.string()).optional(),      // Can reference MTH-001, MTH-001.3, or MTH-001.3#section
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

// Method Families (MTH-NNN) - Framework-level methodology documents
const methodFamilies = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),                                 // MTH-001
    slug: z.string(),                               // observational-chat-analysis
    type: z.literal('family'),
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    version: z.string(),
    abstract: z.string(),
    dataset: z.object({
      name: z.string(),
      source: z.string().optional(),
      size: z.string().optional(),
      collection_period: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
    related_instruments: z.array(z.string()).optional(),
    studies: z.array(z.string()).optional(),        // Auto-populated or manual
    description: z.string(),                        // SEO meta description
    keywords: z.array(z.string()).optional(),
    author: z.string().default('Vishal Patel'),
    contributors: z.array(z.string()).optional(),
  }),
});

// Method Studies (MTH-NNN.N) - Individual analyses within a family
const methodStudies = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),                                 // MTH-001.3
    slug: z.string(),                               // model-upgrade-impact
    type: z.literal('study'),
    family: z.string(),                             // MTH-001
    family_slug: z.string(),                        // observational-chat-analysis
    order: z.number(),                              // Position in family
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    status: z.enum(['published', 'researching', 'planned', 'archived']),
    version: z.string(),
    abstract: z.string(),
    sections: z.array(z.object({                    // For deep linking
      anchor: z.string(),
      title: z.string(),
    })).optional(),
    supersedes: z.string().optional(),              // Previous version if major revision
    notebook: z.string().optional(),                // Source notebook filename
    description: z.string(),                        // SEO meta description
    keywords: z.array(z.string()).optional(),
    author: z.string().default('Vishal Patel'),
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
    related_method: z.string().optional(),          // Can reference MTH-001 or MTH-001.3
    version: z.string().optional(),
  }),
});

export const collections = { 
  dispatches, 
  library, 
  methodFamilies,
  methodStudies,
  instruments 
};
```

**Note:** See **METHODS-SCHEMA.md** for complete frontmatter specifications and authoring guidelines.

### Workflow

1. **Create/update content** → Edit MDX file, change `status` in frontmatter
2. **Build site** → Astro queries collections, renders with current status
3. **Deploy** → Vercel/Cloudflare rebuilds on git push

Status changes propagate automatically. No manual syncing.

### Content Files Structure

```
/src/content/
├── config.ts                  # Schema definitions
├── dispatches/
│   ├── dsp-001.mdx            # status: published
│   └── dsp-002.mdx            # status: researching
├── library/
│   └── lib-001.mdx            # status: planned
├── method-families/
│   ├── mth-001-observational-chat-analysis.mdx    # MTH-001
│   ├── mth-002-conversational-assessment.mdx      # MTH-002
│   └── mth-003-relationship-dynamics.mdx          # MTH-003
├── method-studies/
│   ├── mth-001-1-engagement-prediction.mdx        # MTH-001.1
│   ├── mth-001-2-semantic-exploration.mdx         # MTH-001.2
│   ├── mth-001-3-model-upgrade-impact.mdx         # MTH-001.3
│   ├── mth-001-4-concerning-sessions.mdx          # MTH-001.4
│   ├── mth-002-1-verbal-fluency.mdx               # MTH-002.1
│   └── mth-002-2-belief-rigidity.mdx              # MTH-002.2
└── instruments/
    ├── ins-001.mdx            # status: calibrating
    └── ins-002.mdx            # status: calibrating
```

**File Naming Convention:**
- Families: `mth-[NNN]-[slug].mdx` (e.g., `mth-001-observational-chat-analysis.mdx`)
- Studies: `mth-[NNN]-[N]-[slug].mdx` (e.g., `mth-001-3-model-upgrade-impact.mdx`)

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
| **METHODS-SCHEMA.md** | Methods article schema, frontmatter specs, notebook extraction workflow, authoring guidelines |
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
| 1.4.0 | 2026-01-05 | Hierarchical methods architecture: two-tier structure (families + studies), semantic URLs, updated content schemas, added METHODS-SCHEMA.md reference |
| 1.3.0 | 2025-12-27 | Added Font Loading (V1), MDX Component Registration, CSS Import Order, and Image Path Convention sections per RECONCILIATION-PLAN.md |
| 1.2.1 | 2025-12-28 | Added DISPATCH-PAGE.md reference; updated dispatch page section with Cartographic Suite requirement and references schema |
| 1.2.0 | 2025-12-28 | Aligned homepage with mockup v2; unified card system; updated grid values (60px light, 40px dark); expanded status taxonomy (6 statuses); added navigation order; detailed hero/about/footer specs |
| 1.1.2 | 2025-12-27 | Formalized Substack custom domain with canonical URL strategy |
| 1.1.1 | 2025-12-26 | Added Library section; restored Instruments to dark mode |
| 1.0.0 | 2025-12-25 | Initial architecture |
