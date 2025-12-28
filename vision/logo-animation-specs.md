# Phronos Logo Animation Specifications

This document defines the animated logo ("Lens") used across Phronos properties.

---

## Overview

The Phronos Lens is an **ouroboros** (self-consuming serpent) that rotates continuously around a pulsing gold center. It symbolizes the cyclical nature of self-knowledge and empirical observation.

---

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `colorInk` | `#1A1A1A` | Serpent body, strokes |
| `colorGold` | `#B08D55` | Eye, center core, accents |
| `colorGoldDim` | `rgba(176, 141, 85, 0.4)` | Pulse ripple, subtle effects |

---

## Canvas Specifications

| Property | Value | Notes |
|----------|-------|-------|
| Default size | 31×31px | Form/small contexts |
| Scalable | Yes | Adjust `radius` proportionally |
| Center point | `(width/2, height/2)` | Always centered |

---

## Animation Elements

### 1. Ouroboros (Rotating Serpent Ring)

The main visual element—a serpent consuming its own tail.

| Property | Value |
|----------|-------|
| Radius | 11.2px (at 31px canvas) |
| Arc range | `0.3` to `π × 1.9` radians |
| Stroke width | 2.7px |
| Stroke color | `colorInk` |
| Line cap | `round` |
| Rotation speed | `+0.015 rad/frame` (~60fps = ~0.9 rad/sec) |
| Direction | Clockwise |

### 2. Serpent Head

A circle at the end of the arc representing the serpent's head.

| Property | Value |
|----------|-------|
| Position | End of arc at `π × 1.9` radians |
| Radius | 3.25px |
| Fill | `colorInk` |

### 3. Serpent Eye

A gold detail inside the head, representing awareness/observation.

| Property | Value |
|----------|-------|
| Position | Center of head circle |
| Radius | 1.2px |
| Fill | `colorGold` |

### 4. Pulsing Center Core

The fixed center point with a breathing effect.

| Property | Value |
|----------|-------|
| Inner core radius | 1.6px |
| Inner core fill | `colorGold` |
| Ripple base radius | 3.25px |
| Ripple expansion | +1.6px at peak |
| Ripple stroke | 1.2px, `colorGoldDim` |
| Pulse timing | `sin(Date.now() / 400)` |
| Pulse period | ~2.5 seconds |

---

## Timing & Performance

| Property | Value |
|----------|-------|
| Frame rate | 60fps (requestAnimationFrame) |
| Rotation per frame | 0.015 radians |
| Full rotation | ~419 frames (~7 seconds) |
| Pulse cycle | ~2.5 seconds |

---

## Scaling Guidelines

To scale the animation for different contexts:

```javascript
const scale = desiredSize / 31;  // Base size is 31px

// Apply scale to all measurements:
const radius = 11.2 * scale;
const strokeWidth = 2.7 * scale;
const headRadius = 3.25 * scale;
const eyeRadius = 1.2 * scale;
const coreRadius = 1.6 * scale;
```

### Recommended Sizes

| Context | Size | Notes |
|---------|------|-------|
| Favicon | 16×16px | May need simplified version |
| Form accent | 31×31px | Default/reference size |
| Nav logo | 48×48px | Standard navigation |
| Hero/splash | 120×120px | Large display contexts |
| Loading screen | 80×80px | Centered loading indicator |

---

## CSS Companion: Status Dot Pulse

A simpler CSS animation for status indicators:

```css
.status-dot {
    width: 6px;
    height: 6px;
    background: #B08D55;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 1; }
}
```

---

## Implementation

See `logo-animation.js` for the reference implementation.

### Usage (Vanilla JS)

```html
<canvas id="phronos-lens" width="31" height="31"></canvas>
<script src="logo-animation.js"></script>
<script>
    const canvas = document.getElementById('phronos-lens');
    const lens = new PhronosLens(canvas);
    lens.start();
</script>
```

### Usage (React)

```tsx
import { usePhronosLens } from '@/hooks/usePhronosLens';

const Logo: React.FC<{ size?: number }> = ({ size = 31 }) => {
    const canvasRef = usePhronosLens(size);
    return <canvas ref={canvasRef} width={size} height={size} />;
};
```

---

## Design Rationale

1. **Ouroboros**: Represents the cyclical nature of self-knowledge—observation leads to understanding, which leads to new questions, which leads to new observation.

2. **Gold eye**: The observer within the system. Phronos watches how you think, but you remain the one who sees.

3. **Pulsing center**: Life, activity, the present moment of cognition being measured.

4. **Continuous rotation**: Time moves forward; the process never stops.

5. **Ink + Gold palette**: Matches brand colors from `vision/BRAND.yaml`.

---

## Files

| File | Purpose |
|------|---------|
| `docs/logo-animation-specs.md` | This specification document |
| `temp-site/logo-animation.js` | Reference JS implementation |
| `temp-site/icon.svg` | Static SVG version |
| `temp-site/favicon.svg` | Favicon version |
