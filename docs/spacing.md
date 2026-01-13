# Aspora Design System - Spacing Tokens

## Overview

The Aspora design system uses a consistent spacing scale for padding, margins, and gaps. The scale is designed to maintain visual harmony and rhythm across all UI components.

**Source:** Figma Aspora Component Library
**Last Updated:** 18th November 2025

## Spacing Scale

| Token | CSS Variable | Value | Rem | Usage |
|-------|--------------|-------|-----|-------|
| None | `--spacing-none` | 0px | 0rem | No spacing |
| Closest | `--spacing-closest` | 2px | 0.125rem | Minimal spacing, tight layouts |
| XXS | `--spacing-xxs` | 4px | 0.25rem | Extra extra small spacing |
| XXS Alt | `--spacing-xxs-alt` | 6px | 0.375rem | Alternative XXS spacing |
| XS | `--spacing-xs` | 8px | 0.5rem | Extra small spacing |
| S | `--spacing-s` | 12px | 0.75rem | Small spacing |
| M | `--spacing-m` | 16px | 1rem | Medium spacing (base unit) |
| L | `--spacing-l` | 20px | 1.25rem | Large spacing |
| XL | `--spacing-xl` | 24px | 1.5rem | Extra large spacing |
| XXL | `--spacing-xxl` | 28px | 1.75rem | Extra extra large spacing |
| XXXL | `--spacing-xxxl` | 32px | 2rem | Triple extra large spacing |
| 4XL | `--spacing-4xl` | 36px | 2.25rem | Quadruple extra large spacing |
| 5XL | `--spacing-5xl` | 40px | 2.5rem | Quintuple extra large spacing |
| 6XL | `--spacing-6xl` | 48px | 3rem | Sextuple extra large spacing |

## Visual Scale

```
None     (0px)   │
Closest  (2px)   ██
XXS      (4px)   ████
XXS Alt  (6px)   ██████
XS       (8px)   ████████
S        (12px)  ████████████
M        (16px)  ████████████████
L        (20px)  ████████████████████
XL       (24px)  ████████████████████████
XXL      (28px)  ████████████████████████████
XXXL     (32px)  ████████████████████████████████
4XL      (36px)  ████████████████████████████████████
5XL      (40px)  ████████████████████████████████████████
6XL      (48px)  ████████████████████████████████████████████████
```

## Semantic Spacing

Use semantic spacing tokens for consistent application across components:

### Component Padding

| Purpose | CSS Variable | Maps To | Value |
|---------|--------------|---------|-------|
| Button padding | `--padding-button` | `--spacing-xs` | 8px |
| Input padding | `--padding-input` | `--spacing-s` | 12px |
| Card padding | `--padding-card` | `--spacing-m` | 16px |
| Section padding | `--padding-section` | `--spacing-xl` | 24px |
| Page padding | `--padding-page` | `--spacing-xxxl` | 32px |

### Gap Between Elements

| Purpose | CSS Variable | Maps To | Value |
|---------|--------------|---------|-------|
| Tight gap | `--gap-tight` | `--spacing-xxs` | 4px |
| Default gap | `--gap-default` | `--spacing-xs` | 8px |
| Relaxed gap | `--gap-relaxed` | `--spacing-m` | 16px |
| Loose gap | `--gap-loose` | `--spacing-xl` | 24px |

## Usage Examples

### CSS

```css
/* Using spacing variables */
.card {
  padding: var(--spacing-m);
  margin-bottom: var(--spacing-l);
}

.card-header {
  padding: var(--spacing-s) var(--spacing-m);
  margin-bottom: var(--spacing-xs);
}

.button-group {
  display: flex;
  gap: var(--spacing-xs);
}

/* Using semantic variables */
.form-field {
  padding: var(--padding-input);
  margin-bottom: var(--gap-default);
}

.page-container {
  padding: var(--padding-page);
}
```

### CSS Utility Classes

```html
<!-- Padding utilities -->
<div class="p-m">Medium padding (16px)</div>
<div class="p-xl">Extra large padding (24px)</div>

<!-- Margin utilities -->
<div class="m-s">Small margin (12px)</div>
<div class="m-xxl">Extra extra large margin (28px)</div>

<!-- Gap utilities (for flex/grid) -->
<div class="gap-xs" style="display: flex;">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### TypeScript

```typescript
import {
  spacing,
  spacingPx,
  spacingRem,
  semanticSpacing,
  toPx,
  toRem,
  getSpacingVar
} from '../tokens/spacing';

// Using raw pixel values
const cardPadding = spacing.m; // 16
const buttonGap = spacing.xs; // 8

// Using CSS pixel strings
const marginBottom = spacingPx.l; // '20px'

// Using rem values
const sectionPadding = spacingRem.xl; // '1.5rem'

// Using semantic spacing
const inputPadding = semanticSpacing.paddingInput; // 12

// Converting values
const customSpacing = toPx(24); // '24px'
const remValue = toRem(16); // '1rem'

// Getting CSS variable reference
const cssVar = getSpacingVar('m'); // 'var(--spacing-m)'
```

### Styled Components / CSS-in-JS

```typescript
import { spacing, spacingPx } from '../tokens/spacing';

const Card = styled.div`
  padding: ${spacingPx.m};
  margin-bottom: ${spacingPx.l};

  & > * + * {
    margin-top: ${spacingPx.xs};
  }
`;

const Button = styled.button`
  padding: ${spacing.xxs}px ${spacing.s}px;
  gap: ${spacing.xs}px;
`;
```

## Design Guidelines

### When to Use Each Size

| Size | Use Case |
|------|----------|
| **None (0)** | Reset spacing, no visual separation needed |
| **Closest (2)** | Icon and text alignment, micro-adjustments |
| **XXS (4)** | Inline elements, tight icon groups |
| **XXS Alt (6)** | Subtle separation, badge padding |
| **XS (8)** | Button padding, compact list items |
| **S (12)** | Input fields, small cards |
| **M (16)** | Default spacing, card padding, form groups |
| **L (20)** | Section separation within components |
| **XL (24)** | Major section breaks, card margins |
| **XXL (28)** | Large component separation |
| **XXXL (32)** | Page sections, modal padding |
| **4XL (36)** | Hero sections, large containers |
| **5XL (40)** | Full-width section padding |
| **6XL (48)** | Maximum spacing, page-level padding |

### Best Practices

1. **Consistency**: Use spacing tokens instead of arbitrary pixel values
2. **Vertical rhythm**: Maintain consistent vertical spacing using the scale
3. **Component boundaries**: Use larger spacing between components, smaller within
4. **Responsive design**: Consider reducing spacing on smaller screens
5. **Semantic naming**: Prefer semantic tokens (`--padding-card`) over raw values when the meaning is clear

### Spacing Hierarchy

```
Page Container (6XL - 48px)
└── Section (XXXL - 32px)
    └── Card (M - 16px)
        ├── Header (S - 12px)
        ├── Content (M - 16px)
        │   └── Items (XS - 8px gap)
        └── Footer (S - 12px)
```

## Related Tokens

- [Colors](./colors.md) - Color tokens for backgrounds and borders
- [Typography](./typography.md) - Font sizes that work with spacing scale
