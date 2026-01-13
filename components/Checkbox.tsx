/**
 * Aspora Design System - Checkbox Component
 * A checkbox component with multiple states, sizes, and variants
 */

import React from 'react';

export type CheckboxSize = 'large' | 'regular' | 'small';
export type CheckboxVariant = 'square' | 'circular';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Size variant */
  size?: CheckboxSize;
  /** Shape variant - square (default) or circular */
  variant?: CheckboxVariant;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const sizeStyles: Record<CheckboxSize, {
  outer: number;
  borderWidth: number;
  borderRadius: number;
  iconSize: number;
}> = {
  large: { outer: 28, borderWidth: 1.5, borderRadius: 8, iconSize: 16 },
  regular: { outer: 24, borderWidth: 1.5, borderRadius: 6, iconSize: 14 },
  small: { outer: 20, borderWidth: 1.5, borderRadius: 5, iconSize: 12 },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  size = 'regular',
  variant = 'square',
  disabled = false,
  onChange,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const styles = sizeStyles[size];

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine colors based on state
  const getBorderColor = () => {
    if (disabled && checked) return 'var(--fills-primary-300, #A38CE5)';
    if (disabled) return 'var(--fills-gray-300, #D1D1D6)';
    if (checked) return 'var(--fills-primary-500, #5523B2)';
    return 'var(--fills-gray-600, #8E8E93)';
  };

  const getBackgroundColor = () => {
    if (disabled && checked) return 'var(--fills-primary-300, #A38CE5)';
    if (checked) return 'var(--fills-primary-500, #5523B2)';
    return 'transparent';
  };

  const borderRadius = variant === 'circular' ? '50%' : styles.borderRadius;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        position: 'relative',
        width: styles.outer,
        height: styles.outer,
        padding: 0,
        border: `${styles.borderWidth}px solid ${getBorderColor()}`,
        borderRadius,
        backgroundColor: getBackgroundColor(),
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Checkmark icon when checked */}
      {checked && (
        <svg
          width={styles.iconSize}
          height={styles.iconSize}
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transition: 'transform 0.2s ease',
            transform: checked ? 'scale(1)' : 'scale(0)',
          }}
        >
          <path
            d="M3 8L6.5 11.5L13 4.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {/* Hidden input for form compatibility */}
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {}}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
    </button>
  );
};

export default Checkbox;
