# Phronos Card System

**Version:** 1.2.0  
**Date:** 2025-12-27  
**Status:** Active  
**Alignment:** BRAND.yaml v1.3.0, ARCHITECTURE.md v1.3.0

---

## Overview

The Phronos Card System provides a unified component for displaying content previews across Dispatches, Methods, Library entries, and Instruments. All cards share the same structure, with visual differences only for light/dark mode contexts.

---

## Card Structure

```
┌─────────────────────────────────────────┐
│ TYPE-###                   Status   [●] │  ← Header: ID (left), Status Group (right)
├─────────────────────────────────────────┤
│ Title                                   │  ← Title (serif, lg)
│                                         │
│ Description text that can wrap to       │  ← Body (serif, base, flex: 1)
│ multiple lines as needed...             │
│                                         │
├─────────────────────────────────────────┤
│ v1.0                                    │  ← Footer: Version only
└─────────────────────────────────────────┘
```

---

## Content Type Mapping

| Content Type | ID Format | Status Values | Mode |
|--------------|-----------|---------------|------|
| Dispatches | `DSP-###` | Published, Researching, Planned | Light |
| Methods | `MTH-###` | Published, Researching, Planned | Light |
| Library | `LIB-###` | Published, Researching, Planned | Light |
| Instruments | `INS-###` | Live, Calibrating, Planned | Dark |

---

## Status System

### Status Group

The status text and dot are grouped together in the upper right corner of the card header. The text appears first, followed by the dot.

```html
<div class="card-status-group">
    <span class="card-status-text">Published</span>
    <span class="status-dot published"></span>
</div>
```

### Status Dot Colors

| Status | Color | Animation | Clickable |
|--------|-------|-----------|-----------|
| **Published** / **Live** | `--success` (#44AA77) | Pulse 2s | Yes |
| **Researching** / **Calibrating** | `--gold` (#B08D55) | Pulse 3s | No |
| **Planned** | `--faded` (rgba(26,26,26,0.5)) | None | No |

### Pulse Animation

```css
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

@keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

.status-dot.published,
.status-dot.live {
    animation: pulse 2s infinite;
}

.status-dot.researching,
.status-dot.calibrating {
    animation: pulse-slow 3s infinite;
}
```

---

## Card States

### Clickable (Published/Live)

- **Cursor:** `pointer`
- **Hover transform:** `translate(-2px, -2px)`
- **Hover shadow (Light):** `5px 5px 0px rgba(26, 26, 26, 0.1)`
- **Hover shadow (Dark):** `5px 5px 0px rgba(176, 141, 85, 0.3)` (gold)
- **Hover status text:** Color changes to `--gold`, underline appears

### Disabled (Researching/Calibrating/Planned)

- **Cursor:** `default`
- **Background (Light):** `rgba(255, 255, 255, 0.5)` (semi-transparent)
- **Background (Dark):** `rgba(37, 37, 37, 0.5)` (semi-transparent)
- **Title color:** Faded (see Color Specs below)
- **Body color:** Faded
- **No hover effects**

---

## Design Tokens

### Light Mode (Dispatches, Methods, Library)

```css
.card {
    background: #FFFFFF;                    /* Clickable */
    /* background: rgba(255, 255, 255, 0.5);  Disabled */
    border: 1px solid #1A1A1A;
    padding: 1.5rem;
    text-decoration: none;  /* Prevent underlines when card is <a> */
    color: inherit;         /* Inherit color from context */
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.card-id {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #B08D55;                         /* Gold */
}

.card-status-group {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.card-status-text {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(26, 26, 26, 0.5);           /* Faded */
    transition: color 0.2s ease;
}

.card-title {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.3;
    color: #1A1A1A;                         /* Ink */
    /* color: rgba(26, 26, 26, 0.5);          Disabled */
    margin-bottom: 0.75rem;
}

.card-body {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.6;
    color: #1A1A1A;                         /* Ink */
    /* color: rgba(26, 26, 26, 0.5);          Disabled */
    flex: 1;
}

.card-footer {
    border-top: 1px solid rgba(26, 26, 26, 0.08);
    padding-top: 0.75rem;
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(26, 26, 26, 0.5);           /* Faded */
}

/* Hover state (clickable only) */
.card.clickable:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0px rgba(26, 26, 26, 0.1);
}

.card.clickable:hover .card-status-text {
    color: #B08D55;                         /* Gold */
    text-decoration: underline;
    text-underline-offset: 2px;
}
```

### Dark Mode (Instruments)

```css
.card {
    background: #252525;                    /* Clickable */
    /* background: rgba(37, 37, 37, 0.5);     Disabled */
    border: 1px solid rgba(242, 240, 233, 0.15);
    padding: 1.5rem;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.card-id {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #B08D55;                         /* Gold */
}

.card-status-group {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.card-status-text {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(242, 240, 233, 0.5);
    transition: color 0.2s ease;
}

.card-title {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.3;
    color: #F2F0E9;                         /* Light text */
    /* color: rgba(242, 240, 233, 0.5);       Disabled */
    margin-bottom: 0.75rem;
}

.card-body {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(242, 240, 233, 0.7);
    /* color: rgba(242, 240, 233, 0.4);       Disabled */
    flex: 1;
}

.card-footer {
    border-top: 1px solid rgba(242, 240, 233, 0.1);
    padding-top: 0.75rem;
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: rgba(242, 240, 233, 0.5);
}

/* Hover state (clickable only) */
.card.clickable:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0px rgba(176, 141, 85, 0.3);  /* Gold shadow */
}

.card.clickable:hover .card-status-text {
    color: #B08D55;                         /* Gold */
    text-decoration: underline;
    text-underline-offset: 2px;
}
```

---

## Layout Specifications

### Grid Container

```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Ensure equal height cards */
.card-grid > * {
    display: flex;
    flex-direction: column;
}

.card {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.card-body {
    flex: 1;  /* Pushes footer to bottom */
}

.card-footer {
    margin-top: auto;
}
```

### Responsive Behavior

| Breakpoint | Columns |
|------------|---------|
| > 900px | 3 columns |
| 600-900px | 2 columns |
| < 600px | 1 column |

---

## Status Dot Specifications

```css
.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
}

.status-dot.published,
.status-dot.live {
    background: #44AA77;
    animation: pulse 2s infinite;
}

.status-dot.researching,
.status-dot.calibrating {
    background: #B08D55;
    animation: pulse-slow 3s infinite;
}

.status-dot.planned {
    background: rgba(26, 26, 26, 0.5);  /* Light mode */
    /* background: rgba(242, 240, 233, 0.3);  Dark mode */
}
```

---

## HTML Structure

### Standard Card (Light Mode)

```html
<div class="card clickable">
    <div class="card-header">
        <span class="card-id">MTH-001</span>
        <div class="card-status-group">
            <span class="card-status-text">Published</span>
            <span class="status-dot published"></span>
        </div>
    </div>
    <h3 class="card-title">Observational Chat Analysis</h3>
    <p class="card-body">
        Analyzing real-world human-AI chats. Measures effects of AI protest on human responses.
    </p>
    <div class="card-footer">
        v1.0
    </div>
</div>
```

### Disabled Card (Not Yet Published)

```html
<div class="card disabled">
    <div class="card-header">
        <span class="card-id">MTH-002</span>
        <div class="card-status-group">
            <span class="card-status-text">Researching</span>
            <span class="status-dot researching"></span>
        </div>
    </div>
    <h3 class="card-title">Semantic Association Mapping</h3>
    <p class="card-body">
        Measuring divergent thinking through word association chains.
    </p>
    <div class="card-footer">
        —
    </div>
</div>
```

### Instrument Card (Dark Mode)

```html
<div class="card clickable">
    <div class="card-header">
        <span class="card-id">INS-001</span>
        <div class="card-status-group">
            <span class="card-status-text">Live</span>
            <span class="status-dot live"></span>
        </div>
    </div>
    <h3 class="card-title">Semantic Associations</h3>
    <p class="card-body">
        Maps how your mind connects ideas through word association chains.
    </p>
    <div class="card-footer">
        v1.0
    </div>
</div>
```

---

## Astro Component Props

```typescript
interface CardProps {
    id: string;           // e.g., "MTH-001", "DSP-002", "INS-001"
    title: string;
    description: string;
    status: 'published' | 'live' | 'researching' | 'calibrating' | 'planned';
    version?: string;     // e.g., "v1.0" or "—" for non-published
    href?: string;        // Link destination (only for clickable cards)
    mode?: 'light' | 'dark';  // Default: 'light'
}
```

### Usage in Astro

```astro
---
import Card from '../components/Card.astro';
---

<Card 
    id="MTH-001"
    title="Observational Chat Analysis"
    description="Analyzing real-world human-AI chats."
    status="published"
    version="v1.0"
    href="/methods/mth-001"
/>
```

---

## Accessibility

- Cards use semantic HTML (`<h3>` for titles)
- Clickable cards should be wrapped in `<a>` tags in production
- When cards are rendered as `<a>` elements, apply `text-decoration: none` and `color: inherit` to prevent default link styling from affecting card content
- Status dots have sufficient color contrast
- Disabled cards are visually distinct (semi-transparent background, muted text)
- Focus states should match hover states for keyboard navigation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.2.0 | 2025-12-27 | Added card-as-link styling (text-decoration: none, color: inherit). Updated accessibility section. Per RECONCILIATION-PLAN.md |
| 1.1.0 | 2025-12-28 | Moved status text + dot to header as grouped element; footer now version only |
| 1.0.0 | 2025-12-28 | Initial specification |
