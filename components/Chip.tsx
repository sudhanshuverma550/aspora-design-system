/**
 * Aspora Design System - Chip Component
 * A selectable chip/tag component with icon support
 */

import React from 'react';

export type ChipSize = 'large' | 'medium' | 'small';
export type ChipVariant = 'chip' | 'selector';

export interface ChipProps {
  /** Chip label text */
  label: string;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Size variant */
  size?: ChipSize;
  /** Style variant - chip (with icon) or selector (text only) */
  variant?: ChipVariant;
  /** Icon element to display (only for chip variant) */
  icon?: React.ReactNode;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Callback when chip is clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const sizeStyles: Record<ChipSize, {
  height: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  iconSize: number;
  gap: number;
  borderRadius: number;
}> = {
  large: {
    height: 37,
    paddingX: 16,
    paddingY: 8,
    fontSize: 16,
    iconSize: 17,
    gap: 8,
    borderRadius: 20,
  },
  medium: {
    height: 36,
    paddingX: 14,
    paddingY: 8,
    fontSize: 14,
    iconSize: 15,
    gap: 6,
    borderRadius: 18,
  },
  small: {
    height: 33,
    paddingX: 12,
    paddingY: 6,
    fontSize: 13,
    iconSize: 13,
    gap: 4,
    borderRadius: 16,
  },
};

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  size = 'medium',
  variant = 'chip',
  icon,
  disabled = false,
  onClick,
  className = '',
}) => {
  const styles = sizeStyles[size];

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine colors based on state
  const getBackgroundColor = () => {
    if (disabled) return 'var(--fills-gray-100, #F2F2F7)';
    if (selected) return 'var(--fills-primary-500, #5523B2)';
    return 'transparent';
  };

  const getBorderColor = () => {
    if (disabled) return 'var(--fills-gray-300, #D1D1D6)';
    if (selected) return 'var(--fills-primary-500, #5523B2)';
    return 'var(--fills-gray-400, #C7C7CC)';
  };

  const getTextColor = () => {
    if (disabled) return 'var(--text-base-400, rgba(14, 15, 17, 0.45))';
    if (selected) return 'var(--text-contrast-700, #FFFFFF)';
    return 'var(--text-base-600, #0E0F11)';
  };

  // Default icon for chip variant
  const defaultIcon = variant === 'chip' && !icon ? (
    <svg
      width={styles.iconSize}
      height={styles.iconSize}
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M2.5 6.5H14.5M2.5 6.5V13.5C2.5 14.0523 2.94772 14.5 3.5 14.5H13.5C14.0523 14.5 14.5 14.0523 14.5 13.5V6.5M2.5 6.5V4.5C2.5 3.94772 2.94772 3.5 3.5 3.5H5.5M14.5 6.5V4.5C14.5 3.94772 14.0523 3.5 13.5 3.5H11.5M5.5 3.5V2.5M5.5 3.5H11.5M11.5 3.5V2.5"
        stroke={selected && !disabled ? 'white' : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : icon;

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: styles.gap,
        height: styles.height,
        paddingLeft: styles.paddingX,
        paddingRight: styles.paddingX,
        paddingTop: styles.paddingY,
        paddingBottom: styles.paddingY,
        border: `1px solid ${getBorderColor()}`,
        borderRadius: styles.borderRadius,
        backgroundColor: getBackgroundColor(),
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        outline: 'none',
        fontFamily: "'Inter', sans-serif",
        fontSize: styles.fontSize,
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        color: getTextColor(),
        whiteSpace: 'nowrap',
      }}
    >
      {variant === 'chip' && defaultIcon}
      <span>{label}</span>
    </button>
  );
};

export default Chip;
