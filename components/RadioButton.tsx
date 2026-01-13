/**
 * Aspora Design System - Radio Button Component
 * A radio button component with multiple states and sizes
 */

import React from 'react';

export type RadioSize = 'large' | 'regular' | 'small';

export interface RadioButtonProps {
  /** Whether the radio is selected */
  checked?: boolean;
  /** Size variant */
  size?: RadioSize;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Radio button name for grouping */
  name?: string;
  /** Radio button value */
  value?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const sizeStyles: Record<RadioSize, {
  outer: number;
  inner: number;
  borderWidth: number;
}> = {
  large: { outer: 28, inner: 14, borderWidth: 1.5 },
  regular: { outer: 24, inner: 12, borderWidth: 1.5 },
  small: { outer: 20, inner: 10, borderWidth: 1.5 },
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
  size = 'regular',
  disabled = false,
  name,
  value = '',
  onChange,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const styles = sizeStyles[size];

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
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

  const getInnerColor = () => {
    if (disabled && checked) return 'var(--fills-primary-300, #A38CE5)';
    if (checked) return 'var(--fills-primary-500, #5523B2)';
    return 'transparent';
  };

  return (
    <button
      type="button"
      role="radio"
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
        borderRadius: '50%',
        backgroundColor: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'border-color 0.2s ease',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Inner circle when selected */}
      <span
        style={{
          width: styles.inner,
          height: styles.inner,
          borderRadius: '50%',
          backgroundColor: getInnerColor(),
          transition: 'background-color 0.2s ease, transform 0.2s ease',
          transform: checked ? 'scale(1)' : 'scale(0)',
        }}
      />
      {/* Hidden input for form compatibility */}
      <input
        type="radio"
        name={name}
        value={value}
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

export default RadioButton;
