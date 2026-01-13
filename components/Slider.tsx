/**
 * Aspora Design System - Slider Component
 * Built on Radix UI Slider for reliable touch/mouse interactions
 */

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

export type SliderType = 'single' | 'range';

export interface SliderProps {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value (for single slider) */
  value?: number;
  /** Current range values (for range slider) */
  rangeValue?: [number, number];
  /** Slider type - single thumb or range (two thumbs) */
  type?: SliderType;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Callback when value changes (single slider) */
  onChange?: (value: number) => void;
  /** Callback when range changes (range slider) */
  onRangeChange?: (value: [number, number]) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  rangeValue = [25, 75],
  type = 'single',
  disabled = false,
  onChange,
  onRangeChange,
  className = '',
  'aria-label': ariaLabel = 'Slider',
}) => {
  // Handle value change from Radix
  const handleValueChange = (newValue: number[]) => {
    if (type === 'single') {
      onChange?.(newValue[0]);
    } else {
      onRangeChange?.([newValue[0], newValue[1]]);
    }
  };

  // Get current value array for Radix
  const currentValue = type === 'single' ? [value] : rangeValue;

  // Design system colors
  const trackBg = disabled
    ? 'var(--fills-gray-300, #D1D1D6)'
    : 'var(--fills-gray-200, #E5E5EA)';
  const fillBg = disabled
    ? 'var(--fills-primary-300, #A38CE5)'
    : 'var(--fills-primary-500, #5523B2)';

  return (
    <>
      <style>{`
        .slider-root {
          position: relative;
          display: flex;
          align-items: center;
          user-select: none;
          touch-action: none;
          width: 100%;
          height: 28px;
        }

        .slider-root[data-disabled] {
          opacity: 0.6;
          pointer-events: none;
        }

        .slider-track {
          background-color: ${trackBg};
          position: relative;
          flex-grow: 1;
          height: 4px;
          border-radius: 2px;
        }

        .slider-range {
          position: absolute;
          background-color: ${fillBg};
          height: 100%;
          border-radius: 2px;
        }

        .slider-thumb {
          display: block;
          width: 28px;
          height: 28px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: grab;
          outline: none;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        .slider-thumb:hover {
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb:focus {
          box-shadow: 0 0 0 3px rgba(85, 35, 178, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
        }

        .slider-thumb[data-disabled] {
          cursor: not-allowed;
        }
      `}</style>

      <SliderPrimitive.Root
        className={`slider-root ${className}`}
        value={currentValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        <SliderPrimitive.Track className="slider-track">
          <SliderPrimitive.Range className="slider-range" />
        </SliderPrimitive.Track>

        {type === 'single' ? (
          <SliderPrimitive.Thumb className="slider-thumb" aria-label={ariaLabel} />
        ) : (
          <>
            <SliderPrimitive.Thumb className="slider-thumb" aria-label={`${ariaLabel} minimum`} />
            <SliderPrimitive.Thumb className="slider-thumb" aria-label={`${ariaLabel} maximum`} />
          </>
        )}
      </SliderPrimitive.Root>
    </>
  );
};

export default Slider;
