# Phronos Component Specifications

**Version:** 1.0.0  
**Date:** 2025-12-28  
**Status:** Ready for implementation  
**Alignment:** ARCHITECTURE.md v1.2.1, BRAND.yaml v1.1.1, CARD-SYSTEM.md v1.1.0

---

## Overview

This document specifies all shared UI components not covered in CARD-SYSTEM.md or page-specific specs. It serves as the definitive reference for navigation, footer, hero elements, iconography, and the instrument interface container.

---

## Table of Contents

1. [Navigation](#navigation)
2. [Footer](#footer)
3. [Hero Section](#hero-section)
4. [Section Headers](#section-headers)
5. [Iconography](#iconography)
6. [Instrument Container (The Lab)](#instrument-container-the-lab)
7. [Form Elements](#form-elements)
8. [Loading & Error States](#loading--error-states)
9. [Utility Components](#utility-components)

---

## Navigation

### Overview

The navigation is a sticky horizontal bar with the animated ouroboros logo, text links, and a subscribe button. It uses a solid background (not blur) to maintain the sharp, cartographic aesthetic.

### Desktop Layout (≥768px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [◎] PHRONOS        Dispatches  Library  Methods  Instruments    [Subscribe] │
└──────────────────────────────────────────────────────────────────────────────┘
     ↑                     ↑                                            ↑
   Logo Group          Nav Links                                  CTA Button
```

**Structure:**
- **Logo Group (left):** Animated ouroboros canvas (31×31px) + "PHRONOS" wordmark
- **Nav Links (center-right):** Horizontal list, evenly spaced
- **Subscribe Button (right):** Primary CTA, always visible

### V1 Navigation State

For the initial launch, some sections are not yet built. These appear grayed out and are not clickable:

| Link | Status | Clickable | Styling |
|------|--------|-----------|---------|
| Dispatches | Active | Yes | Normal (ink) |
| Library | Coming Soon | No | Faded, no hover, `cursor: default` |
| Methods | Coming Soon | No | Faded, no hover, `cursor: default` |
| Instruments | Coming Soon | No | Faded, no hover, `cursor: default` |

**Note:** About has been removed from navigation. The About content lives in the homepage footer section.

### Mobile Layout (<768px)

```
┌──────────────────────────────────────────┐
│  [◎] PHRONOS                       [≡]   │
└──────────────────────────────────────────┘
                                      ↑
                               Hamburger Icon
```

**Mobile Menu (Expanded):**

```
┌──────────────────────────────────────────┐
│  [◎] PHRONOS                       [✕]   │
├──────────────────────────────────────────┤
│                                          │
│  Dispatches                              │
│  ─────────────────────────────────────   │
│  Library                        (soon)   │
│  ─────────────────────────────────────   │
│  Methods                        (soon)   │
│  ─────────────────────────────────────   │
│  Instruments                    (soon)   │
│  ─────────────────────────────────────   │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │           Subscribe                │  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

- Full-screen overlay with paper background
- Links stacked vertically with divider lines
- "(soon)" label for inactive items (mono, faded)
- Subscribe button at bottom, full width
- Close icon replaces hamburger

### Design Tokens

```css
.nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--white);
    border-bottom: 1px solid var(--faded-light);
    padding: 0 var(--space-lg);
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav-logo-group {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.nav-logo-canvas {
    width: 31px;
    height: 31px;
}

.nav-wordmark {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--ink);
}

.nav-links {
    display: flex;
    gap: var(--space-xl);
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-link {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--ink);
    text-decoration: none;
    padding: var(--space-xs) 0;
    border-bottom: 1px solid transparent;
    transition: border-color var(--transition-default);
}

.nav-link:hover {
    border-bottom-color: var(--gold);
}

.nav-link.disabled {
    color: var(--faded);
    cursor: default;
    pointer-events: none;
}

.nav-link.disabled:hover {
    border-bottom-color: transparent;
}

.nav-subscribe {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--white);
    background: var(--ink);
    border: 1px solid var(--ink);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
    transition: all var(--transition-default);
}

.nav-subscribe:hover {
    background: var(--gold);
    border-color: var(--gold);
}

/* Mobile */
@media (max-width: 767px) {
    .nav-links {
        display: none;
    }
    
    .nav-hamburger {
        display: flex;
    }
}

.nav-hamburger {
    display: none;
    width: 24px;
    height: 24px;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
}

.nav-hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: var(--ink);
}

/* Mobile Menu Overlay */
.nav-mobile-menu {
    position: fixed;
    inset: 0;
    background: var(--paper);
    z-index: 200;
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
}

.nav-mobile-menu .nav-link {
    font-size: 1rem;
    padding: var(--space-md) 0;
    border-bottom: 1px solid var(--faded-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-mobile-menu .nav-link .soon-label {
    font-size: var(--text-xs);
    color: var(--faded);
}
```

### HTML Structure

```html
<nav class="nav">
    <div class="nav-logo-group">
        <canvas class="nav-logo-canvas" width="31" height="31"></canvas>
        <span class="nav-wordmark">Phronos</span>
    </div>
    
    <ul class="nav-links">
        <li><a href="/dispatches" class="nav-link">Dispatches</a></li>
        <li><span class="nav-link disabled">Library</span></li>
        <li><span class="nav-link disabled">Methods</span></li>
        <li><span class="nav-link disabled">Instruments</span></li>
    </ul>
    
    <a href="https://dispatches.phronos.org/subscribe" class="nav-subscribe">
        Subscribe
    </a>
    
    <button class="nav-hamburger" aria-label="Open menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
</nav>
```

---

## Footer

### Overview

The footer is a centered, transparent-background element that allows the site grid to show through. It contains the backronym tagline, essential links, and copyright.

### Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│     Phenotyping for Human Resilience, Ontological Navigation, & Open Science│
│                                                                              │
│                          GitHub  ·  Contact                                  │
│                                                                              │
│                         © 2025 Phronos                                       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Structure:**
- Three rows, all centered
- Row 1: Backronym tagline (serif, italic)
- Row 2: Links with middot separator (mono)
- Row 3: Copyright (mono, faded)
- Generous vertical padding
- Transparent background (grid shows through)

### Design Tokens

```css
.footer {
    padding: var(--space-2xl) var(--space-lg);
    text-align: center;
    background: transparent;
    border-top: 1px solid var(--faded-light);
}

.footer-tagline {
    font-family: var(--font-serif);
    font-size: var(--text-md);
    font-style: italic;
    color: var(--ink);
    margin-bottom: var(--space-lg);
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
}

.footer-link {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--ink);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.footer-link:hover {
    color: var(--gold);
    text-decoration: underline;
    text-underline-offset: 3px;
}

.footer-separator {
    color: var(--faded);
}

.footer-copyright {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--faded);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

### HTML Structure

```html
<footer class="footer">
    <p class="footer-tagline">
        Phenotyping for Human Resilience, Ontological Navigation, & Open Science
    </p>
    
    <div class="footer-links">
        <a href="https://github.com/phronos" class="footer-link">GitHub</a>
        <span class="footer-separator">·</span>
        <a href="mailto:hello@phronos.org" class="footer-link">Contact</a>
    </div>
    
    <p class="footer-copyright">© 2025 Phronos</p>
</footer>
```

### Dark Mode Footer (Instruments Section)

When the footer appears after a dark-mode section, it transitions:

```css
.footer.footer--dark {
    background: var(--bg-deep);
    border-top-color: var(--faded-light-dark);
}

.footer--dark .footer-tagline,
.footer--dark .footer-link {
    color: var(--text-light);
}

.footer--dark .footer-separator,
.footer--dark .footer-copyright {
    color: var(--faded-dark);
}
```

---

## Hero Section

### Overview

The homepage hero is a two-column layout with narrative content on the left and a telemetry panel on the right. This is distinct from the "Rail" concept used in Library pages.

**Disambiguation:**
- **Hero Telemetry Panel:** A contained card in the homepage hero showing sample observatory metrics. Static or with CSS-only animations.
- **Library Sidebar Rail:** A sticky column in Library entry pages containing TOC and citations. Described in a future LIBRARY-PAGE.md.

The `html_rail_structure` snippet in BRAND.yaml is reference material for high-density typographic patterns—it should be adapted for context, not used verbatim.

### Hero Layout

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                                                                                │
│   ─────  COGNITIVE INFRASTRUCTURE          ┌─────────────────────────────────┐ │
│                                            │ LIVE TELEMETRY           [●]    │ │
│   Know thyself.                            ├─────────────────────────────────┤ │
│   Empirically.                             │                                 │ │
│                                            │ ACTIVE OBSERVERS                │ │
│   Phronos is an observatory for            │ ▃▅▇▅▃▂▄▆▅▃▁▂▄▅▆▄▂    1,247     │ │
│   human cognition—a place of               │                                 │ │
│   structured observation...                │ DISPATCHES                      │ │
│                                            │ ████████░░░░░░░░░░░    3 / 12   │ │
│                                            │                                 │ │
│                                            │ LAST SIGNAL                     │ │
│                                            │ DSP-001 · 4h ago                │ │
│                                            │                                 │ │
│                                            └─────────────────────────────────┘ │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Left Column

| Element | Specification |
|---------|---------------|
| Label | Horizontal line (40px, 2px, ink) + "COGNITIVE INFRASTRUCTURE" (mono, 0.7rem, uppercase, faded, letter-spacing: 1px) |
| Headline Line 1 | "Know thyself." (serif, text-hero, light weight, ink) |
| Headline Line 2 | "Empirically." (serif, text-hero, light weight, italic, gold) |
| Intro | 2-3 sentences (serif, text-md, ink, max-width: 480px) |

### Right Column: Telemetry Panel

The telemetry panel is a self-contained card showing sample metrics from the observatory. It reinforces the "scientific instrument" aesthetic.

```css
.telemetry-panel {
    background: var(--white);
    border: 1px solid var(--ink);
    box-shadow: 8px 8px 0px rgba(26, 26, 26, 0.08);
    padding: 0;
    width: 100%;
    max-width: 360px;
}

.telemetry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--faded-light);
    background: rgba(26, 26, 26, 0.02);
}

.telemetry-title {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--ink);
}

.telemetry-status {
    display: flex;
    align-items: center;
    gap: 6px;
}

.telemetry-status-dot {
    width: 6px;
    height: 6px;
    background: var(--success);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.telemetry-body {
    padding: var(--space-md);
}

.telemetry-metric {
    margin-bottom: var(--space-md);
}

.telemetry-metric:last-child {
    margin-bottom: 0;
}

.telemetry-metric-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--faded);
    margin-bottom: var(--space-xs);
}

.telemetry-metric-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
}

.telemetry-metric-value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--ink);
}

/* Sparkline (CSS-only) */
.telemetry-sparkline {
    flex: 1;
    height: 16px;
    display: flex;
    align-items: flex-end;
    gap: 2px;
}

.telemetry-sparkline-bar {
    flex: 1;
    background: var(--gold);
    min-height: 2px;
}

/* Progress bar */
.telemetry-progress {
    flex: 1;
    height: 8px;
    background: var(--faded-light);
    display: flex;
}

.telemetry-progress-fill {
    background: var(--ink);
}

/* Last signal */
.telemetry-signal {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--ink);
}

.telemetry-signal-time {
    color: var(--faded);
    margin-left: var(--space-xs);
}
```

### Hero HTML Structure

```html
<section class="hero">
    <div class="hero-content">
        <div class="hero-label">
            <span class="hero-label-line"></span>
            <span class="hero-label-text">Cognitive Infrastructure</span>
        </div>
        
        <h1 class="hero-headline">
            <span class="hero-headline-1">Know thyself.</span>
            <span class="hero-headline-2">Empirically.</span>
        </h1>
        
        <p class="hero-intro">
            Phronos is an observatory for human cognition—a place of structured 
            observation rather than instruction. We develop ways to measure how 
            you think, and we communicate our observations to show you how your 
            thinking compares to the machines thinking alongside you.
        </p>
    </div>
    
    <div class="hero-telemetry">
        <div class="telemetry-panel">
            <div class="telemetry-header">
                <span class="telemetry-title">Live Telemetry</span>
                <span class="telemetry-status">
                    <span class="telemetry-status-dot"></span>
                </span>
            </div>
            
            <div class="telemetry-body">
                <div class="telemetry-metric">
                    <div class="telemetry-metric-label">Active Observers</div>
                    <div class="telemetry-metric-row">
                        <div class="telemetry-sparkline">
                            <span class="telemetry-sparkline-bar" style="height: 30%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 50%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 80%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 60%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 40%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 25%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 45%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 70%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 55%"></span>
                            <span class="telemetry-sparkline-bar" style="height: 35%"></span>
                        </div>
                        <span class="telemetry-metric-value">1,247</span>
                    </div>
                </div>
                
                <div class="telemetry-metric">
                    <div class="telemetry-metric-label">Dispatches</div>
                    <div class="telemetry-metric-row">
                        <div class="telemetry-progress">
                            <span class="telemetry-progress-fill" style="width: 25%"></span>
                        </div>
                        <span class="telemetry-metric-value">3 / 12</span>
                    </div>
                </div>
                
                <div class="telemetry-metric">
                    <div class="telemetry-metric-label">Last Signal</div>
                    <span class="telemetry-signal">
                        DSP-001
                        <span class="telemetry-signal-time">· 4h ago</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Responsive Behavior

At <768px, the hero stacks vertically with the telemetry panel below the content:

```css
@media (max-width: 767px) {
    .hero {
        flex-direction: column;
        gap: var(--space-xl);
    }
    
    .hero-telemetry {
        width: 100%;
    }
    
    .telemetry-panel {
        max-width: 100%;
    }
}
```

---

## Section Headers

### Overview

Section headers introduce major content sections on the homepage. They use a numbered system (01, 02, 03...) for cartographic precision.

### Layout

```
01 ─────────────────────────────────────────────────────
   Dispatches from the Observatory
```

### Design Tokens

```css
.section-header {
    margin-bottom: var(--space-lg);
}

.section-header-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
}

.section-id {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--gold);
}

.section-line {
    flex: 1;
    height: 1px;
    background: var(--faded-light);
}

.section-title {
    font-family: var(--font-serif);
    font-size: var(--text-xl);
    font-weight: 400;
    color: var(--ink);
}

/* Dark mode variant */
.instruments-section .section-id {
    color: var(--gold);
}

.instruments-section .section-line {
    background: var(--faded-light-dark);
}

.instruments-section .section-title {
    color: var(--text-light);
}
```

### HTML Structure

```html
<div class="section-header">
    <div class="section-header-row">
        <span class="section-id">01</span>
        <span class="section-line"></span>
    </div>
    <h2 class="section-title">Dispatches from the Observatory</h2>
</div>
```

---

## Iconography

### Philosophy

Phronos uses a minimal, hard-edged icon system consistent with the brutalist aesthetic. Icons are either:
1. **CSS-only shapes** (preferred for simple elements)
2. **Inline SVG** (for complex icons, hand-drawn style)

**No icon libraries.** Lucide, Heroicons, and similar rounded icon sets clash with the sharp, cartographic aesthetic. All icons should feel like they belong on a technical illustration or map.

### Icon Specifications

| Icon | Method | Specification |
|------|--------|---------------|
| Hamburger menu | CSS | Three horizontal lines, 2px thick, 24px wide, 5px gap |
| Close (X) | CSS | Two diagonal lines, 2px thick, 24px, 45° rotation |
| Arrow right (→) | CSS/Unicode | Use → character or CSS triangle |
| Arrow down (↓) | CSS/Unicode | Use ↓ character or CSS triangle |
| External link (↗) | Unicode | Use ↗ character |
| GitHub | Inline SVG | Simplified mark, no rounded corners |
| Diamond separator (◈) | Unicode | Use ◈ or ◇ character |
| Status dot | CSS | 6-8px circle, solid fill |

### CSS Icon Examples

```css
/* Hamburger */
.icon-hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 24px;
    height: 24px;
}

.icon-hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: currentColor;
}

/* Close X */
.icon-close {
    position: relative;
    width: 24px;
    height: 24px;
}

.icon-close::before,
.icon-close::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
}

.icon-close::before {
    transform: rotate(45deg);
}

.icon-close::after {
    transform: rotate(-45deg);
}

/* Arrow right */
.icon-arrow-right::after {
    content: '→';
    font-family: var(--font-mono);
}

/* CSS Triangle Arrow */
.icon-chevron-right {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 6px solid currentColor;
}
```

### SVG Icons

When SVG is necessary, use sharp, geometric forms:

```html
<!-- GitHub (simplified) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M10 1C5.03 1 1 5.03 1 10c0 3.98 2.58 7.35 6.16 8.54.45.08.62-.2.62-.43v-1.5c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.23-.4-1.15.08-2.4 0 0 .76-.24 2.48.93.72-.2 1.49-.3 2.26-.3.77 0 1.54.1 2.26.3 1.72-1.17 2.48-.93 2.48-.93.49 1.25.18 2.17.09 2.4.58.63.92 1.44.92 2.42 0 3.46-2.1 4.22-4.11 4.44.32.28.61.83.61 1.68v2.49c0 .24.16.52.62.43C16.42 17.35 19 13.98 19 10c0-4.97-4.03-9-9-9z"/>
</svg>
```

### Usage Guidelines

1. **Prefer text when possible.** "Subscribe →" is better than a mail icon.
2. **Use Unicode arrows** for inline directional hints: →, ↓, ↗, ←
3. **Use ◈ (diamond)** as the section/separator symbol
4. **Keep icons monochromatic.** They inherit `currentColor`.
5. **Maintain 1.5-2px stroke weight** for consistency with borders.

---

## Instrument Container (The Lab)

### Overview

When an instrument is active, it displays within a "Lab" container—a dark-mode terminal-like environment that provides visual separation from narrative content and signals "you are now in an assessment."

### Container Structure

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ INS-001 · SEMANTIC ASSOCIATIONS                              v0.1  [●]  │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                          │ │
│ │                                                                          │ │
│ │                       [ REACT COMPONENT RENDERS HERE ]                   │ │
│ │                                                                          │ │
│ │                                                                          │ │
│ │                                                                          │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │ Estimated time: 5 min                                        Begin →    │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
   ↑ Page background (dark, with grid)        ↑ Lab container (elevated surface)
```

### Layout

The Lab container is a centered, elevated box within the full-width dark section:

| Element | Specification |
|---------|---------------|
| Page background | `--bg-deep` (#1A1A1A) with 40px grid |
| Container max-width | 800px (can expand for complex instruments) |
| Container background | `--card-bg` (#252525) |
| Container border | 1px solid `rgba(242, 240, 233, 0.15)` |
| Container padding | 0 (header/body/footer have their own) |

### Design Tokens

```css
/* Page wrapper */
.instrument-page {
    min-height: 100vh;
    background: var(--bg-deep);
    position: relative;
    padding: var(--space-2xl) var(--space-lg);
}

.instrument-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(242, 240, 233, 0.015) 1px, transparent 1px),
        linear-gradient(90deg, rgba(242, 240, 233, 0.015) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
}

/* Lab container */
.lab-container {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    background: var(--card-bg);
    border: 1px solid rgba(242, 240, 233, 0.15);
}

/* Lab header */
.lab-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid rgba(242, 240, 233, 0.1);
    background: rgba(242, 240, 233, 0.02);
}

.lab-header-left {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.lab-id {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--gold);
    text-transform: uppercase;
}

.lab-title {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.lab-header-right {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.lab-version {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--faded-dark);
}

.lab-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.lab-status-dot.live {
    background: var(--success);
    animation: pulse 2s infinite;
}

.lab-status-dot.calibrating {
    background: var(--gold);
    animation: pulse 3s infinite;
}

/* Lab body - where React component mounts */
.lab-body {
    padding: var(--space-xl);
    min-height: 400px;
}

/* Lab footer */
.lab-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    border-top: 1px solid rgba(242, 240, 233, 0.1);
}

.lab-meta {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--faded-dark);
}

.lab-action {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-light);
    background: transparent;
    border: 1px solid var(--text-light);
    padding: var(--space-xs) var(--space-md);
    cursor: pointer;
    transition: all var(--transition-default);
}

.lab-action:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--bg-deep);
}

.lab-action:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
```

### HTML Structure

```html
<div class="instrument-page">
    <div class="lab-container">
        <header class="lab-header">
            <div class="lab-header-left">
                <span class="lab-id">INS-001</span>
                <span class="lab-separator">·</span>
                <span class="lab-title">Semantic Associations</span>
            </div>
            <div class="lab-header-right">
                <span class="lab-version">v0.1</span>
                <span class="lab-status-dot calibrating"></span>
            </div>
        </header>
        
        <div class="lab-body" id="instrument-root">
            <!-- React component mounts here -->
        </div>
        
        <footer class="lab-footer">
            <span class="lab-meta">Estimated time: 5 min</span>
            <button class="lab-action">Begin →</button>
        </footer>
    </div>
</div>
```

### States

| State | Header Dot | Footer Button | Notes |
|-------|------------|---------------|-------|
| Calibrating | Gold, pulsing | "Coming Soon" (disabled) | Instrument in development |
| Ready | Green, pulsing | "Begin →" | Ready to start |
| In Progress | Green, solid | "Continue →" or "Submit" | Assessment active |
| Complete | Green, solid | "View Results" | Assessment finished |

### React Integration

The Astro page passes props to the React component:

```astro
---
// pages/instruments/[slug].astro
import { getEntry } from 'astro:content';
import InstrumentLayout from '@/layouts/InstrumentLayout.astro';

const { slug } = Astro.params;
const instrument = await getEntry('instruments', slug);
---

<InstrumentLayout 
    id={instrument.data.id}
    title={instrument.data.title}
    version={instrument.data.version}
    status={instrument.data.status}
>
    <div id="instrument-root" data-instrument={slug}></div>
</InstrumentLayout>

<script>
    // Hydrate React component
    import { renderInstrument } from '@/instruments';
    const root = document.getElementById('instrument-root');
    const slug = root.dataset.instrument;
    renderInstrument(slug, root);
</script>
```

---

## Form Elements

### Overview

Form elements appear primarily in the subscribe CTA and future instrument interfaces. They maintain the sharp, monospace aesthetic.

### Text Input

```css
.input-text {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--ink);
    background: var(--white);
    border: 1px solid var(--ink);
    padding: var(--space-sm) var(--space-md);
    width: 100%;
    transition: border-color var(--transition-default);
}

.input-text::placeholder {
    color: var(--faded);
}

.input-text:focus {
    outline: none;
    border-color: var(--gold);
}

/* Dark mode */
.input-text.input-dark {
    background: var(--card-bg);
    border-color: rgba(242, 240, 233, 0.3);
    color: var(--text-light);
}

.input-text.input-dark::placeholder {
    color: var(--faded-dark);
}

.input-text.input-dark:focus {
    border-color: var(--gold);
}
```

### Button

```css
.btn {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid;
    cursor: pointer;
    transition: all var(--transition-default);
}

/* Primary (filled) */
.btn-primary {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--white);
}

.btn-primary:hover {
    background: var(--gold);
    border-color: var(--gold);
}

/* Secondary (outlined) */
.btn-secondary {
    background: transparent;
    border-color: var(--ink);
    color: var(--ink);
}

.btn-secondary:hover {
    background: var(--ink);
    color: var(--white);
}

/* Dark mode variants */
.btn-primary-dark {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--bg-deep);
}

.btn-primary-dark:hover {
    background: var(--text-light);
    border-color: var(--text-light);
}

.btn-secondary-dark {
    background: transparent;
    border-color: var(--text-light);
    color: var(--text-light);
}

.btn-secondary-dark:hover {
    background: var(--text-light);
    color: var(--bg-deep);
}
```

---

## Loading & Error States

### Loading Spinner

Uses the ouroboros animation at a smaller scale:

```html
<div class="loading">
    <canvas class="loading-spinner" width="48" height="48"></canvas>
    <span class="loading-text">Loading...</span>
</div>
```

```css
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-xl);
}

.loading-text {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--faded);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

### Error State

```html
<div class="error-state">
    <span class="error-icon">◈</span>
    <p class="error-message">Session data could not be saved.</p>
    <p class="error-action">Your responses are stored locally. Retry when connection is restored.</p>
    <button class="btn btn-secondary">Retry</button>
</div>
```

```css
.error-state {
    text-align: center;
    padding: var(--space-xl);
}

.error-icon {
    font-size: 2rem;
    color: var(--alert);
    display: block;
    margin-bottom: var(--space-md);
}

.error-message {
    font-family: var(--font-serif);
    font-size: var(--text-md);
    color: var(--ink);
    margin-bottom: var(--space-sm);
}

.error-action {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--faded);
    margin-bottom: var(--space-md);
}
```

### Empty State

```html
<div class="empty-state">
    <p class="empty-message">No dispatches yet.</p>
    <p class="empty-hint">The first observations are being recorded.</p>
</div>
```

```css
.empty-state {
    text-align: center;
    padding: var(--space-2xl);
}

.empty-message {
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    font-style: italic;
    color: var(--ink);
    margin-bottom: var(--space-sm);
}

.empty-hint {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--faded);
}
```

---

## Utility Components

### Diamond Separator

Used between sections or as a decorative break:

```html
<div class="diamond-separator">◈</div>
```

```css
.diamond-separator {
    text-align: center;
    font-size: 1rem;
    color: var(--gold);
    padding: var(--space-lg) 0;
}
```

### Tooltip (Citation Hover)

For hoverable citations in dispatches:

```css
.tooltip-trigger {
    position: relative;
    cursor: help;
    border-bottom: 1px dashed var(--faded);
}

.tooltip-content {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    padding: var(--space-xs) var(--space-sm);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-fast), visibility var(--transition-fast);
    z-index: 50;
}

.tooltip-trigger:hover .tooltip-content {
    opacity: 1;
    visibility: visible;
}
```

### Skip Link (Accessibility)

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-md);
    background: var(--ink);
    color: var(--paper);
    padding: var(--space-sm) var(--space-md);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    z-index: 1000;
    transition: top var(--transition-fast);
}

.skip-link:focus {
    top: var(--space-sm);
}
```

---

## Responsive Breakpoints

Add to `tokens.css` for consistency across all components:

```css
:root {
    /* Breakpoints (for reference in JS/media queries) */
    --breakpoint-sm: 480px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
}

/* Usage in CSS */
@media (max-width: 767px) { /* Mobile */ }
@media (min-width: 768px) and (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-28 | Initial specification: Nav, Footer, Hero, Section Headers, Iconography, Lab Container, Forms, States |
