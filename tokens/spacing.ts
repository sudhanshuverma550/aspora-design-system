/**
 * Aspora Design System - Spacing Tokens
 * Source: Figma Aspora Component Library
 * Last Updated: 18th November 2025
 */

// ===================================================
// SPACING SCALE
// Core spacing values in pixels
// ===================================================

export const spacing = {
  /** No spacing - 0px */
  none: 0,
  /** Closest - 2px - Minimal spacing for tight layouts */
  closest: 2,
  /** XXS - 4px - Extra extra small */
  xxs: 4,
  /** XXS Alternate - 6px - Slightly larger than XXS */
  xxsAlt: 6,
  /** XS - 8px - Extra small */
  xs: 8,
  /** S - 12px - Small */
  s: 12,
  /** M - 16px - Medium (base unit) */
  m: 16,
  /** L - 20px - Large */
  l: 20,
  /** XL - 24px - Extra large */
  xl: 24,
  /** XXL - 28px - Extra extra large */
  xxl: 28,
  /** XXXL - 32px - Triple extra large */
  xxxl: 32,
  /** 4XL - 36px - Quadruple extra large */
  '4xl': 36,
  /** 5XL - 40px - Quintuple extra large */
  '5xl': 40,
  /** 6XL - 48px - Sextuple extra large */
  '6xl': 48,
} as const;

export type SpacingKey = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingKey];

// ===================================================
// SPACING AS CSS VALUES
// Values with 'px' suffix for direct CSS usage
// ===================================================

export const spacingPx = {
  none: '0px',
  closest: '2px',
  xxs: '4px',
  xxsAlt: '6px',
  xs: '8px',
  s: '12px',
  m: '16px',
  l: '20px',
  xl: '24px',
  xxl: '28px',
  xxxl: '32px',
  '4xl': '36px',
  '5xl': '40px',
  '6xl': '48px',
} as const;

// ===================================================
// SPACING AS REM VALUES
// Values in rem (based on 16px base font size)
// ===================================================

export const spacingRem = {
  none: '0rem',
  closest: '0.125rem',
  xxs: '0.25rem',
  xxsAlt: '0.375rem',
  xs: '0.5rem',
  s: '0.75rem',
  m: '1rem',
  l: '1.25rem',
  xl: '1.5rem',
  xxl: '1.75rem',
  xxxl: '2rem',
  '4xl': '2.25rem',
  '5xl': '2.5rem',
  '6xl': '3rem',
} as const;

// ===================================================
// SEMANTIC SPACING
// Named spacing for specific use cases
// ===================================================

export const semanticSpacing = {
  /** Padding inside buttons */
  paddingButton: spacing.xs,
  /** Padding inside input fields */
  paddingInput: spacing.s,
  /** Padding inside cards */
  paddingCard: spacing.m,
  /** Padding for sections */
  paddingSection: spacing.xl,
  /** Padding for page containers */
  paddingPage: spacing.xxxl,

  /** Tight gap between elements */
  gapTight: spacing.xxs,
  /** Default gap between elements */
  gapDefault: spacing.xs,
  /** Relaxed gap between elements */
  gapRelaxed: spacing.m,
  /** Loose gap between elements */
  gapLoose: spacing.xl,
} as const;

// ===================================================
// STACK SPACING (VERTICAL)
// For vertical rhythm and stacking elements
// ===================================================

export const stack = {
  xxs: spacing.xxs,
  xs: spacing.xs,
  s: spacing.s,
  m: spacing.m,
  l: spacing.l,
  xl: spacing.xl,
  xxl: spacing.xxl,
  xxxl: spacing.xxxl,
} as const;

// ===================================================
// INLINE SPACING (HORIZONTAL)
// For horizontal spacing between elements
// ===================================================

export const inline = {
  xxs: spacing.xxs,
  xs: spacing.xs,
  s: spacing.s,
  m: spacing.m,
  l: spacing.l,
  xl: spacing.xl,
  xxl: spacing.xxl,
  xxxl: spacing.xxxl,
} as const;

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

/**
 * Convert spacing value to CSS pixel string
 */
export function toPx(value: number): string {
  return `${value}px`;
}

/**
 * Convert spacing value to CSS rem string (based on 16px base)
 */
export function toRem(value: number): string {
  return `${value / 16}rem`;
}

/**
 * Get spacing value by key
 */
export function getSpacing(key: SpacingKey): number {
  return spacing[key];
}

/**
 * Get spacing as CSS variable reference
 */
export function getSpacingVar(key: SpacingKey): string {
  const varNames: Record<SpacingKey, string> = {
    none: 'var(--spacing-none)',
    closest: 'var(--spacing-closest)',
    xxs: 'var(--spacing-xxs)',
    xxsAlt: 'var(--spacing-xxs-alt)',
    xs: 'var(--spacing-xs)',
    s: 'var(--spacing-s)',
    m: 'var(--spacing-m)',
    l: 'var(--spacing-l)',
    xl: 'var(--spacing-xl)',
    xxl: 'var(--spacing-xxl)',
    xxxl: 'var(--spacing-xxxl)',
    '4xl': 'var(--spacing-4xl)',
    '5xl': 'var(--spacing-5xl)',
    '6xl': 'var(--spacing-6xl)',
  };
  return varNames[key];
}

// ===================================================
// COMBINED EXPORT
// ===================================================

export const spacingTokens = {
  spacing,
  spacingPx,
  spacingRem,
  semantic: semanticSpacing,
  stack,
  inline,
} as const;

export default spacingTokens;
