# Phronos Website Build Instructions

**For:** Cursor / AI-assisted development  
**Date:** 2025-12-28  
**Reference:** ARCHITECTURE.md v1.1.2, BRAND.yaml v1.1.1, CARD-SYSTEM.md v1.1.0

---

## Project Overview

Build phronos.org — a static website for a cognitive research observatory. The site uses a "Field Journal" aesthetic: scholarly, cartographic, brutalist. Light mode for narrative content, dark mode only for the Instruments section.

---

## Quick Start

```bash
npm create astro@latest phronos-site
cd phronos-site
npm install
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro 4.x |
| Styling | CSS Custom Properties (NO Tailwind) |
| Content | MDX via Astro Content Collections |
| Interactivity | React (instruments only, future) |
| Deployment | Vercel |

---

## File Structure

```
/src
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── Card.astro              # Unified card component
│   ├── SectionHeader.astro
│   ├── StatusDot.astro
│   ├── Button.astro
│   ├── ObservatoryPanel.astro  # Hero telemetry panel
│   └── SubscribeCTA.astro
├── layouts/
│   ├── BaseLayout.astro
│   ├── DispatchLayout.astro
│   ├── MethodLayout.astro
│   ├── LibraryLayout.astro
│   └── InstrumentLayout.astro
├── pages/
│   ├── index.astro
│   ├── dispatches/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── library/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── methods/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── instruments/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── about.astro
│   ├── constitution.astro
│   └── soul.astro
├── content/
│   ├── config.ts
│   ├── dispatches/
│   ├── library/
│   ├── methods/
│   └── instruments/
└── styles/
    ├── tokens.css
    ├── reset.css
    ├── base.css
    ├── layout.css
    ├── components/
    │   ├── nav.css
    │   ├── footer.css
    │   ├── cards.css
    │   └── buttons.css
    └── pages/
        ├── home.css
        ├── dispatch.css
        ├── method.css
        └── instrument.css
```

---

## Design Tokens (/src/styles/tokens.css)

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

  /* === COLORS: DARK MODE (Instruments section only) === */
  --bg-deep: #1A1A1A;
  --text-light: #F2F0E9;
  --faded-dark: rgba(242, 240, 233, 0.5);
  --faded-light-dark: rgba(242, 240, 233, 0.15);
  --card-bg: #252525;

  /* === TYPOGRAPHY === */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-mono: 'Fira Code', Consolas, Monaco, monospace;

  /* === SCALE === */
  --text-xs: 0.65rem;
  --text-sm: 0.7rem;
  --text-base: 0.95rem;
  --text-md: 1rem;
  --text-lg: 1.3rem;
  --text-xl: 2rem;
  --text-2xl: 2.75rem;
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
}
```

---

## Fonts

Load via Google Fonts in BaseLayout.astro `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Grid Background

The entire page has a subtle grid background applied to the body:

```css
body {
  background-color: var(--paper);
  background-image:
    linear-gradient(rgba(26,26,26,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,26,26,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  background-attachment: fixed;
}
```

For dark mode sections (instruments):
```css
.instruments-section {
  background: var(--bg-deep);
}

.instruments-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(242,240,233,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242,240,233,0.015) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

---

## Homepage Structure

Reference the mockup file `phronos-homepage-v2.html` for exact implementation.

### Section Order:
1. **Navigation** (sticky)
2. **Hero** (two-column: content + telemetry panel)
3. **Dispatches** (01)
4. **Library** (02)
5. **Methods** (03)
6. **Instruments** (04) — Dark mode section
7. **About** (05)
8. **Subscribe** (06)
9. **Footer**

### Navigation
- Logo: Animated ouroboros canvas (31x31px) — see `logo-animation.js`
- Brand: "PHRONOS" in Fira Code
- Links: Dispatches · Library · Methods · Instruments · About · [Subscribe]
- Subscribe button is styled as CTA (gold border, gold text)
- Sticky on scroll with white background

### Hero Section
Two-column grid: content (left) + observatory panel (right), vertically centered.

**Left column:**
- Label: `——` line + "Cognitive Infrastructure" (grey, mono, uppercase)
- H1: "Know thyself." / "Empirically." (italic gold)
- Intro paragraph
- No buttons

**Right column (Observatory Panel):**
- White background, ink border, hard shadow
- "LIVE TELEMETRY" header
- Sample metrics (Daily Surprisal Index, Active Participants)
- SVG sparkline chart

### Card System

All content cards use unified structure per CARD-SYSTEM.md v1.1.0:

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

**Card States:**
- `.card.clickable` — Published/Live items, hover effects
- `.card.disabled` — Researching/Calibrating/Planned, semi-transparent, no hover

**Status Dots:**
- Published/Live: Green (#44AA77), pulse 2s
- Researching/Calibrating: Gold (#B08D55), pulse 3s  
- Planned: Grey (faded), no animation

### Section Headers
Each section has numbered header:
```html
<div class="section-header">
  <span class="section-id">01</span>
  <span class="section-title">Dispatches from the Observatory</span>
</div>
```

### Instruments Section (Dark Mode)
The only dark section on the homepage. Cards have:
- Dark background (#252525 or semi-transparent)
- Light text
- Gold hover shadow instead of ink

### About Section
Two-column: founder info (left) + content (right)
- Founder: Name, credentials, blockquote
- Content: Tagline, description paragraphs, "Read the Constitution" button

### Subscribe Section
Two-column: content (left) + Substack embed iframe (right)
- Simple copy: "Essays reporting what Phronos detects. No spam. Just signal."

### Footer
- Centered layout
- Tagline: "Phenotyping for Human Resilience, Ontological Navigation, & Open Science"
- Links: GitHub, Contact
- Copyright: © 2025 Phronos

---

## Content Collections

### Schema (/src/content/config.ts)

```typescript
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
    topics: z.array(z.string()).optional(),
    data_source: z.string().optional(),
    version: z.string().optional(),
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

---

## Component: Card.astro

```astro
---
interface Props {
  id: string;
  title: string;
  description: string;
  status: 'published' | 'live' | 'researching' | 'calibrating' | 'planned';
  version?: string;
  href?: string;
  mode?: 'light' | 'dark';
}

const { id, title, description, status, version, href, mode = 'light' } = Astro.props;

const isClickable = status === 'published' || status === 'live';
const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
---

<div class:list={['card', { clickable: isClickable, disabled: !isClickable }]}>
  <div class="card-header">
    <span class="card-id">{id}</span>
    <div class="card-status-group">
      <span class="card-status-text">{statusLabel}</span>
      <span class:list={['status-dot', status]}></span>
    </div>
  </div>
  <h3 class="card-title">{title}</h3>
  <p class="card-body">{description}</p>
  <div class="card-footer">
    {version || '—'}
  </div>
</div>
```

---

## Homepage Dynamic Content

The homepage should query content collections:

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Card from '../components/Card.astro';

const dispatches = await getCollection('dispatches', ({ data }) => 
  data.status !== 'archived'
);
const sortedDispatches = dispatches.sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);

const library = await getCollection('library', ({ data }) => 
  data.status !== 'archived'
);

const methods = await getCollection('methods', ({ data }) => 
  data.status !== 'archived'
);

const instruments = await getCollection('instruments', ({ data }) => 
  data.status !== 'archived'
);
const sortedInstruments = instruments.sort((a, b) => a.data.order - b.data.order);
---
```

---

## Substack Integration

Embed in Subscribe section:
```html
<iframe 
  src="https://phronos.substack.com/embed" 
  width="100%" 
  height="150" 
  style="border:none; background:transparent;" 
  frameborder="0" 
  scrolling="no">
</iframe>
```

Add canonical URL to all dispatch pages:
```html
<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site)} />
```

---

## Logo Animation

The ouroboros logo is a canvas-based animation. See `logo-animation.js` for implementation details:
- Rotating serpent ring around pulsing gold center
- Default size: 31x31px
- Self-contained, no dependencies

---

## Key CSS Rules

### No Tailwind
All styling uses CSS custom properties. No utility classes.

### Typography Usage
- Headers, body text: `var(--font-serif)` (Cormorant Garamond)
- Navigation, labels, buttons, data: `var(--font-mono)` (Fira Code)

### Button Styles
```css
.btn {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.875rem 1.75rem;
  border: 1px solid var(--ink);
  text-decoration: none;
  transition: all var(--transition-default);
  cursor: pointer;
}

.btn-primary {
  background: var(--ink);
  color: var(--paper);
}

.btn-secondary {
  background: transparent;
  color: var(--ink);
}
```

### Status Dot Animation
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.status-dot.published,
.status-dot.live {
  background: var(--success);
  animation: pulse 2s infinite;
}

.status-dot.researching,
.status-dot.calibrating {
  background: var(--gold);
  animation: pulse 3s infinite;
}
```

---

## Reference Files

1. **phronos-homepage-v2.html** — Complete homepage mockup with all CSS
2. **CARD-SYSTEM.md** — Card component specification
3. **ARCHITECTURE.md** — Full site architecture
4. **BRAND.yaml** — Voice, tone, visual identity
5. **logo-animation.js** — Ouroboros animation code

---

## Build Checklist

- [ ] Set up Astro project with TypeScript
- [ ] Configure content collections
- [ ] Create BaseLayout with fonts, meta, grid background
- [ ] Build Nav component with logo animation
- [ ] Build Card component per CARD-SYSTEM.md
- [ ] Build homepage sections in order
- [ ] Add dark mode styles for instruments section
- [ ] Create Footer component
- [ ] Add sample content files for each collection
- [ ] Test responsive behavior
- [ ] Verify hover states and animations
- [ ] Add canonical URLs for SEO
