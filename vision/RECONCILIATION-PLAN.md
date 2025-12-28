# Vision Folder Reconciliation Plan

**Version:** 1.0.0  
**Date:** 2025-12-27  
**Status:** Pending review  
**Purpose:** Document discrepancies between vision specifications and V1 implementation

---

## Overview

This document identifies where the vision folder specifications were underspecified, incorrect, or where our implementation consciously deviated. It serves as a plan for updating the vision folder to reflect the actual V1 implementation.

---

## 1. Underspecified Areas

Areas where the vision specs lacked necessary detail, requiring implementation decisions.

| Issue | File | Implementation Decision |
|-------|------|------------------------|
| Font loading strategy | ARCHITECTURE.md | Google Fonts CDN for V1; added Lora for body text |
| MDX component registration | ARCHITECTURE.md | Pass components via `<Content components={...} />` in layouts |
| Image path structure | ARCHITECTURE.md | `/public/images/dispatches/[slug]/` convention |
| CSS import order | ARCHITECTURE.md | tokens → reset → base → layout |
| Empty content collections | ARCHITECTURE.md | Added `.gitkeep` files to empty directories |
| Homepage telemetry content | COMPONENTS.md | Used actual DSP-001 power user data |
| Mobile nav toggle JS | COMPONENTS.md | Vanilla JS toggle in Nav.astro |
| Logo animation timing | logo-animation-specs.md | Delta-time for frame-rate independence |
| Anchor scroll behavior | DISPATCH-PAGE.md | `scroll-margin-top: 100px` on Figure |
| Figure id prop | DISPATCH-PAGE.md | Added `id` prop for anchor linking |

---

## 2. Incorrect Specifications

Specs that didn't match mockups or didn't work as described.

| Spec Location | Specification Said | Reality/Mockup Shows | Action |
|---------------|-------------------|---------------------|--------|
| COMPONENTS.md:301-304 | Footer tagline: serif, italic, ink | mono, uppercase, faded | Update spec |
| COMPONENTS.md:665-738 | Section header: two-row with line | Single-line (ID + title) with thick bottom border | Simplify spec |
| BRAND.yaml:491 | Dispatches mode: "light (body), dark (charts)" | All dispatch content is light (Cartographic is light-only) | Remove dark reference |
| DISPATCH-PAGE.md:98-99 | Lead paragraph: 1.3rem larger | User preferred consistent sizing | Mark optional or remove |
| DISPATCH-PAGE.md:99 | Body text: 1.1rem | Final: 1.05rem per user feedback | Update value |

---

## 3. Implementation Differences

Conscious deviations from spec based on user feedback or practical considerations.

| Vision Spec | Our Implementation | Reason |
|-------------|-------------------|--------|
| Only Cormorant Garamond for serif | Added Lora for body text | User found Cormorant hard to read for long prose |
| Generic "LIVE TELEMETRY" panel | DSP-001 Power Users sparklines linking to figure | Real data is more compelling |
| Footer: `github.com/phronos` | `github.com/phronos-2025` | User's actual GitHub org |
| Footer: `hello@phronos.org` | `interest@phronos.org` | User's preferred contact |
| Substack: `dispatches.phronos.org/embed` | `phronos.substack.com/embed` | Custom domain not yet configured |
| Telemetry panel: rotated annotation | Straight annotation | User preference |
| All paragraphs: first larger | All paragraphs same size | User preference for consistency |

---

## 4. Updates Needed

### 4.1 ARCHITECTURE.md

**Add new section: Font Loading (V1)**

```markdown
## Font Loading (V1)

Use Google Fonts CDN for initial release. Self-hosting is a future optimization.

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Fira+Code:wght@400;500;600&family=Lora:wght@400;500&display=swap" rel="stylesheet">
```
```

**Add new section: MDX Component Registration**

```markdown
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
```

**Add new section: CSS Import Order**

```markdown
## CSS Import Order

In BaseLayout.astro, import stylesheets in this order:

1. `tokens.css` — Design tokens (colors, typography, spacing)
2. `reset.css` — Browser reset
3. `base.css` — Element styles
4. `layout.css` — Grid backgrounds, section layouts
```

**Add new section: Image Path Convention**

```markdown
## Image Path Convention

Dispatch images are stored in the public folder:

```
/public/images/dispatches/[slug]/
├── figure-1.png
├── figure-2.png
└── figure-3.png
```

Referenced in MDX as `/images/dispatches/[slug]/figure-1.png`.
```

---

### 4.2 BRAND.yaml

**Update typography.families:**

```yaml
typography:
  families:
    serif: ["Cormorant Garamond", "Georgia", "serif"]
    body_serif: ["Lora", "Georgia", "serif"]  # NEW: For dispatch body text
    mono: ["Fira Code", "Consolas", "Monaco", "monospace"]
    sans: ["Inter", "system-ui", "sans-serif"]  # Fallback only
  
  usage:
    headers: "serif"              # Cormorant Garamond
    body_dispatches: "body_serif" # Lora (NEW)
    body_other: "serif"           # Cormorant Garamond
    data: "mono"
    labels: "mono"
    navigation: "mono"
    buttons: "mono"
```

**Fix site_structure.dispatches.mode (line ~491):**

```yaml
dispatches:
  path: "/dispatches"
  content: "Essays reporting observatory findings"
  id_format: "DSP-### (e.g. DSP-001)"
  mode: "light"  # FIXED: Was "light (body), dark (embedded charts/tables)"
```

---

### 4.3 COMPONENTS.md

**Update Footer section (~line 300-360):**

```css
.footer-tagline {
    font-family: var(--font-mono);  /* CHANGED: Was var(--font-serif) */
    font-size: var(--text-md);
    text-transform: uppercase;       /* NEW */
    letter-spacing: 2px;             /* NEW */
    color: var(--faded);             /* CHANGED: Was var(--ink) */
    margin-bottom: var(--space-md);  /* CHANGED: Was var(--space-lg) */
    /* REMOVED: font-style: italic; */
}
```

**Update Section Headers section (~line 665-738):**

Replace two-row layout with single-line:

```markdown
### Layout

```
01  Dispatches from the Observatory
────────────────────────────────────
```

### Design Tokens

```css
.section-header {
    display: flex;
    align-items: baseline;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-sm);
    border-bottom: 2px solid var(--ink);
}

.section-id {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--gold);
}

.section-title {
    font-family: var(--font-serif);
    font-size: 1.6rem;
    font-weight: 400;
    font-style: italic;
    color: var(--ink);
}
```

### HTML Structure

```html
<div class="section-header">
    <span class="section-id">01</span>
    <h2 class="section-title">Dispatches from the Observatory</h2>
</div>
```
```

**Add to logo animation section:**

```markdown
### Frame-Rate Independence

The logo animation uses delta-time to ensure consistent rotation speed across different monitor refresh rates (60Hz, 120Hz, 144Hz):

```javascript
const ROTATION_SPEED = 0.03; // radians per second

function animate(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    orbitAngle += ROTATION_SPEED * deltaTime;
    // ... render
}
```
```

---

### 4.4 CARD-SYSTEM.md

**Add to CSS section (~line 117):**

```css
/* Card as link element */
.card {
    /* ...existing styles... */
    text-decoration: none;  /* Prevent underlines when card is <a> */
    color: inherit;         /* Inherit color from context */
}
```

**Add to Accessibility section (~line 454):**

```markdown
- When cards are rendered as `<a>` elements, apply `text-decoration: none` and `color: inherit` to prevent default link styling from affecting card content
```

---

### 4.5 DISPATCH-PAGE.md

**Update Typography table (~line 96-102):**

```markdown
### Typography

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Body text | Lora | 1.05rem | 400 | Line-height: 1.8 |
| H2 | Cormorant Garamond | 1.6rem | 500 | First H2 has NO top border |
| H3 | Cormorant Garamond | 1.35rem | 500 | Italic |
| Links | — | — | — | Gold, underline, turns ink on hover |

**Note:** Lead paragraph styling (larger first paragraph) was removed in V1 for visual consistency. All paragraphs use the same size.
```

**Update Author Block section (~line 77-87):**

```markdown
## Author Block

```
┌──────────────────────────────────────┐
│ [VP]  Vishal Patel                   │
│       MD · PhD (Genetics)            │
├──────────────────────────────────────┤  ← Border via ::after pseudo-element
```

- Avatar: 48px circle, gold-dim background, gold border, initials in mono
- Name: serif, 1rem, medium weight
- Credentials: serif, 0.85rem, italic, faded
- Bottom border: Via `::after` pseudo-element with `left: 5%; right: 5%` to match content padding width
```

**Add new section: Figure Component**

```markdown
## Figure Component

Figures support an `id` prop for anchor linking:

```astro
<Figure 
  id="figure-4"
  src="/images/dispatches/dsp-001/figure-4.png" 
  alt="Description of the figure"
  caption="Figure 4: Power User Activity Over Time"
/>
```

### Anchor Link Behavior

Figures include `scroll-margin-top: 100px` to account for the sticky navigation when jumping to anchors:

```css
.figure {
    margin: var(--space-xl) 0;
    scroll-margin-top: 100px;
}
```
```

---

## 5. New Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `404-PAGE.md` | Specification for branded 404 page | Low |
| `IMPLEMENTATION-NOTES.md` | Runtime decisions, gotchas, edge cases | Medium |

---

## 6. Version History Updates

After applying changes, update version headers:

| File | Current Version | New Version |
|------|-----------------|-------------|
| ARCHITECTURE.md | 1.2.1 | 1.3.0 |
| BRAND.yaml | 1.2.0 | 1.3.0 |
| COMPONENTS.md | 1.0.0 | 1.1.0 |
| CARD-SYSTEM.md | 1.1.0 | 1.2.0 |
| DISPATCH-PAGE.md | 1.0.0 | 1.1.0 |

---

## Appendix: Implementation Files Reference

Key files created during V1 implementation:

```
src/
├── components/
│   ├── cards/Card.astro
│   ├── content/
│   │   ├── Callout.astro
│   │   ├── Caption.astro
│   │   ├── Figure.astro
│   │   ├── PullQuote.astro
│   │   └── Table.astro
│   ├── dispatch/
│   │   ├── AuthorBlock.astro
│   │   ├── DispatchFooter.astro
│   │   ├── DispatchHeader.astro
│   │   └── SubscribeCTA.astro
│   ├── global/
│   │   ├── Footer.astro
│   │   ├── Logo.astro
│   │   ├── Nav.astro
│   │   └── SectionHeader.astro
│   └── home/
│       ├── AboutSection.astro
│       ├── Hero.astro
│       ├── SubscribeSection.astro
│       └── TelemetryPanel.astro
├── content/
│   ├── config.ts
│   └── dispatches/dsp-001/index.mdx
├── layouts/
│   ├── BaseLayout.astro
│   └── ProseLayout.astro
├── lib/
│   └── logo-animation.ts
├── pages/
│   ├── 404.astro
│   ├── about.astro
│   ├── constitution.astro
│   ├── dispatches/
│   │   ├── [...slug].astro
│   │   └── index.astro
│   ├── index.astro
│   └── soul.astro
└── styles/
    ├── base.css
    ├── cartographic.css
    ├── components/
    │   ├── cards.css
    │   ├── dispatch.css
    │   ├── footer.css
    │   └── nav.css
    ├── layout.css
    ├── reset.css
    └── tokens.css
```

