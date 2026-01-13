# Aspora Design System - Typography

## Overview

The Aspora design system uses **Inter** as the primary typeface. Inter is a variable font family designed for computer screens, offering excellent readability at all sizes.

## Font Setup

### Self-Hosted (Recommended)

The design system includes self-hosted Inter font files for production use. This eliminates external dependencies and improves loading performance.

**Import the font CSS:**

```css
/* In your main CSS file */
@import url('./fonts/inter/inter.css');
```

**Or link in HTML:**

```html
<link rel="stylesheet" href="./fonts/inter/inter.css">
```

**Included Files:**
- `inter-latin-400-normal.woff2` - Regular (23KB)
- `inter-latin-500-normal.woff2` - Medium (24KB)
- `inter-latin-600-normal.woff2` - Semi Bold (24KB)
- `inter-latin-700-normal.woff2` - Bold (24KB)

Total size: ~95KB (Latin subset only)

### Google Fonts (Alternative)

If you prefer using Google's CDN:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Import (Alternative)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

## Type Scale

| Size | Pixel | Usage |
|------|-------|-------|
| Display L | 40px | Hero headlines, marketing pages |
| H1 | 28px | Page titles |
| H2 | 24px | Section headers |
| H3 | 22px | Subsection headers |
| H4 | 20px | Card titles |
| Body XL | 17px | Large body text, emphasis |
| Body L | 16px | Default body text |
| Button L | 15px | Large buttons |
| Body M | 14px | Compact body text, buttons |
| Footnote | 13px | Footnotes, helper text |
| Caption 1 | 12px | Labels, captions, small buttons |
| Caption 2 | 11px | Smallest text, legal |

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Emphasized body text |
| Semi Bold | 600 | Buttons, subheadings |
| Bold | 700 | Headings, strong emphasis |

## Typography Styles

### Display

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Display/L/Emphasized` | 40px | Bold (700) | 100% | -1.5% |
| `Display/L/SemiBold` | 40px | Semi Bold (600) | 100% | -1.25% |

### Headings

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Heading/H1` | 28px | Bold (700) | 130% | -1.5% |
| `Heading/H2` | 24px | Bold (700) | 130% | -1.5% |
| `Heading/H3` | 22px | Bold (700) | 130% | -2% |
| `Heading/H4` | 20px | Bold (700) | 130% | -1.5% |

### Body XL (17px)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Body/XL/Regular` | 17px | Regular (400) | 130% | -1% |
| `Body/XL/Medium` | 17px | Medium (500) | 130% | -1% |
| `Body/XL/Semi Bold` | 17px | Semi Bold (600) | 130% | -1% |
| `Body/XL/Bold` | 17px | Bold (700) | 130% | -1% |

### Body L (16px)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Body/L/Regular` | 16px | Regular (400) | 130% | -1% |
| `Body/L/Medium` | 16px | Medium (500) | 130% | -1% |
| `Body/L/Bold` | 16px | Bold (700) | 130% | -1% |

### Body M (14px)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Body/M/Regular` | 14px | Regular (400) | 140% | -1% |
| `Body/M/Medium` | 14px | Medium (500) | 140% | -1% |
| `Body/M/Bold` | 14px | Bold (700) | 140% | -1% |

### Footnote (13px)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Body/Footnote/Regular` | 13px | Regular (400) | 130% | -1% |
| `Body/Footnote/Emphasized` | 13px | Bold (700) | 130% | -1% |

### Caption 1 (12px)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Body/Caption 1/Regular` | 12px | Regular (400) | 140% | -1% |
| `Body/Caption 1/Emphasized` | 12px | Bold (700) | 140% | -1% |

### Caption 2 (11px)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Body/Caption 2/Regular` | 11px | Regular (400) | 130% | -1% |
| `Body/Caption 2/Emphasized` | 11px | Bold (700) | 130% | -1% |

### Buttons

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `Button/L` | 15px | Semi Bold (600) | 110% | -1% |
| `Button/M` | 14px | Semi Bold (600) | 110% | -1% |
| `Button/S` | 12px | Semi Bold (600) | 110% | -1% |

## Usage Examples

### CSS Variables

```css
.page-title {
  font: var(--font-heading-h1);
  letter-spacing: -1.5%;
}

.card-title {
  font: var(--font-heading-h4);
  letter-spacing: -1.5%;
}

.body-text {
  font: var(--font-body-l-regular);
  letter-spacing: -1%;
}

.button {
  font: var(--font-button-l);
  letter-spacing: -1%;
}

.caption {
  font: var(--font-caption-1-regular);
  letter-spacing: -1%;
}
```

### CSS Utility Classes

```html
<h1 class="text-h1">Page Title</h1>
<h2 class="text-h2">Section Header</h2>
<p class="text-body-l-regular">Body text goes here...</p>
<button class="text-button-l">Click Me</button>
<span class="text-caption-1-regular">Small caption</span>
```

### TypeScript

```typescript
import { typography, toCssFont } from '../tokens/typography';

// Access typography values
const h1Style = typography.heading.h1;
console.log(h1Style.fontSize); // 28
console.log(h1Style.fontWeight); // 700

// Generate CSS font shorthand
const cssFont = toCssFont(typography.bodyL.regular);
// "400 16px/1.3 'Inter', -apple-system, ..."
```

## Best Practices

1. **Use semantic tokens**: Prefer `--font-heading-h1` over raw values
2. **Consistent letter spacing**: All styles use negative letter spacing for tighter, more modern appearance
3. **Line height**: Use 130% for most text, 140% for smaller text sizes to maintain readability
4. **Weight usage**:
   - Regular (400) for body text
   - Medium (500) for emphasis
   - Semi Bold (600) for buttons and interactive elements
   - Bold (700) for headings
