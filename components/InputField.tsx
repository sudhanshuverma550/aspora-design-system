/**
 * Aspora Design System - Input Field Component
 * A text input component with multiple states and validation
 */

import React, { useState, useRef, useEffect } from 'react';

export type InputState = 'rest' | 'typing' | 'error' | 'success' | 'disabled';

export interface InputFieldProps {
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Current state (auto-determined if not provided) */
  state?: InputState;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Success message to display */
  successMessage?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when input gains focus */
  onFocus?: () => void;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Input name for forms */
  name?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  placeholder = 'Placeholder',
  type = 'text',
  state,
  disabled = false,
  errorMessage,
  successMessage,
  onChange,
  onFocus,
  onBlur,
  className = '',
  name,
  'aria-label': ariaLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine state automatically if not provided
  const computedState: InputState = state || (
    disabled ? 'disabled' :
    errorMessage ? 'error' :
    successMessage ? 'success' :
    isFocused ? 'typing' : 'rest'
  );

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  // Get divider color based on state
  const getDividerColor = () => {
    switch (computedState) {
      case 'error':
        return 'var(--utility-red-100, #F71D11)';
      case 'success':
        return 'var(--utility-green-100, #21BD45)';
      case 'typing':
        return 'var(--fills-primary-500, #5523B2)';
      case 'disabled':
        return 'var(--fills-gray-300, #D1D1D6)';
      default:
        return 'var(--fills-gray-400, #C7C7CC)';
    }
  };

  // Get text color based on state
  const getTextColor = () => {
    if (computedState === 'disabled') return 'var(--text-base-400, rgba(14, 15, 17, 0.45))';
    if (value) return 'var(--text-base-600, #0E0F11)';
    return 'var(--text-base-400, rgba(14, 15, 17, 0.45))';
  };

  // Get message color
  const getMessageColor = () => {
    if (computedState === 'error') return 'var(--utility-red-100, #F71D11)';
    if (computedState === 'success') return 'var(--utility-green-100, #21BD45)';
    return 'var(--text-base-500, rgba(14, 15, 17, 0.65))';
  };

  const message = errorMessage || successMessage;

  return (
    <div className={className} style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs, 8px)',
          width: '100%',
        }}
      >
        {/* Input Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <input
              ref={inputRef}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label={ariaLabel}
              aria-invalid={computedState === 'error'}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '-0.17px',
                color: getTextColor(),
                cursor: disabled ? 'not-allowed' : 'text',
                padding: 0,
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: 2,
            backgroundColor: getDividerColor(),
            borderRadius: 1,
            transition: 'background-color 0.2s ease',
          }}
        />

        {/* Message */}
        {message && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xxs, 4px)',
            }}
          >
            {/* Icon */}
            {computedState === 'error' && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke={getMessageColor()} strokeWidth="1.5" />
                <path d="M7 4V7.5" stroke={getMessageColor()} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="10" r="0.75" fill={getMessageColor()} />
              </svg>
            )}
            {computedState === 'success' && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke={getMessageColor()} strokeWidth="1.5" />
                <path d="M4.5 7L6.5 9L9.5 5" stroke={getMessageColor()} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.3,
                color: getMessageColor(),
              }}
            >
              {message}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
