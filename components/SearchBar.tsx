/**
 * Aspora Design System - Search Bar Component
 * A search input component with clear button
 */

import React, { useState, useRef } from 'react';

export type SearchBarState = 'default' | 'active' | 'filled';

export interface SearchBarProps {
  /** Search value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the search bar is disabled */
  disabled?: boolean;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when search is submitted */
  onSubmit?: (value: string) => void;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Callback when input gains focus */
  onFocus?: () => void;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  placeholder = 'Search something',
  disabled = false,
  onChange,
  onSubmit,
  onClear,
  onFocus,
  onBlur,
  className = '',
  'aria-label': ariaLabel = 'Search',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine state
  const state: SearchBarState = value ? 'filled' : isFocused ? 'active' : 'default';

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

  const handleClear = () => {
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit?.(value);
    }
  };

  // Get border color based on state
  const getBorderColor = () => {
    if (disabled) return 'var(--fills-gray-300, #D1D1D6)';
    if (state === 'active') return 'var(--fills-primary-500, #5523B2)';
    return 'var(--fills-gray-400, #C7C7CC)';
  };

  // Get text color
  const getTextColor = () => {
    if (disabled) return 'var(--text-base-400, rgba(14, 15, 17, 0.45))';
    if (value) return 'var(--text-base-600, #0E0F11)';
    return 'var(--text-base-400, rgba(14, 15, 17, 0.45))';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{ width: '100%' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs, 8px)',
          width: '100%',
          padding: '12px 16px 12px 12px',
          backgroundColor: 'var(--surface-white, #FFFFFF)',
          border: `1px solid ${getBorderColor()}`,
          borderRadius: 24,
          transition: 'border-color 0.2s ease',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {/* Search Icon */}
        <div
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M16.5 16.5L12.875 12.875M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z"
              stroke="var(--text-base-600, #0E0F11)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: '-0.16px',
            color: getTextColor(),
            cursor: disabled ? 'not-allowed' : 'text',
            padding: 0,
            minWidth: 0,
          }}
        />

        {/* Clear Button */}
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 12px',
              backgroundColor: 'var(--fills-primary-500, #5523B2)',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: 'white',
              transition: 'background-color 0.2s ease',
            }}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
