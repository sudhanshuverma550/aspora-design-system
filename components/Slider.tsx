/**
 * Aspora Design System - Slider Component
 * A range slider with single or dual thumb variants
 */

import React, { useRef, useCallback, useEffect } from 'react';

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
  const trackRef = useRef<HTMLDivElement>(null);

  // Use ref for dragging state to avoid async state update issues
  const draggingRef = useRef<'left' | 'right' | 'single' | null>(null);

  // Force re-render when dragging changes (for cursor style)
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Use refs for all values to avoid stale closures
  const valueRef = useRef(value);
  const rangeValueRef = useRef(rangeValue);
  const onChangeRef = useRef(onChange);
  const onRangeChangeRef = useRef(onRangeChange);
  const disabledRef = useRef(disabled);
  const stepRef = useRef(step);
  const minRef = useRef(min);
  const maxRef = useRef(max);

  // Keep refs in sync with props
  useEffect(() => { valueRef.current = value; }, [value]);
  useEffect(() => { rangeValueRef.current = rangeValue; }, [rangeValue]);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { onRangeChangeRef.current = onRangeChange; }, [onRangeChange]);
  useEffect(() => { disabledRef.current = disabled; }, [disabled]);
  useEffect(() => { stepRef.current = step; }, [step]);
  useEffect(() => { minRef.current = min; }, [min]);
  useEffect(() => { maxRef.current = max; }, [max]);

  // Calculate percentage from value
  const valueToPercent = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  // Calculate value from percentage (uses refs for latest values)
  const percentToValue = useCallback((percent: number) => {
    const currentMin = minRef.current;
    const currentMax = maxRef.current;
    const currentStep = stepRef.current;
    const rawValue = (percent / 100) * (currentMax - currentMin) + currentMin;
    const steppedValue = Math.round(rawValue / currentStep) * currentStep;
    return Math.min(currentMax, Math.max(currentMin, steppedValue));
  }, []);

  // Get position from mouse/touch event
  const getPositionFromEvent = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    let clientX: number;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
    } else if ('clientX' in e) {
      clientX = e.clientX;
    } else {
      return 0;
    }

    const percent = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, percent));
  }, []);

  // Move handler that reads dragging type from ref
  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (disabledRef.current) return;
    if (!draggingRef.current) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);
    const currentStep = stepRef.current;

    if (draggingRef.current === 'single') {
      onChangeRef.current?.(newValue);
    } else if (draggingRef.current === 'left') {
      const currentRange = rangeValueRef.current;
      const newLeft = Math.min(newValue, currentRange[1] - currentStep);
      onRangeChangeRef.current?.([newLeft, currentRange[1]]);
    } else if (draggingRef.current === 'right') {
      const currentRange = rangeValueRef.current;
      const newRight = Math.max(newValue, currentRange[0] + currentStep);
      onRangeChangeRef.current?.([currentRange[0], newRight]);
    }
  }, [getPositionFromEvent, percentToValue]);

  // End handler
  const handleEnd = useCallback(() => {
    draggingRef.current = null;

    // Remove listeners
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('touchcancel', handleEnd);

    forceUpdate(); // Update cursor style
  }, [handleMove]);

  // Start dragging - attach listeners immediately
  const startDragging = useCallback((dragType: 'left' | 'right' | 'single') => {
    if (disabledRef.current) return;

    draggingRef.current = dragType;

    // Attach listeners immediately (not waiting for React state update)
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);

    forceUpdate(); // Update cursor style
  }, [handleMove, handleEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
    };
  }, [handleMove, handleEnd]);

  // Track colors
  const trackBg = disabled
    ? 'var(--fills-gray-300, #D1D1D6)'
    : 'var(--fills-gray-200, #E5E5EA)';
  const fillBg = disabled
    ? 'var(--fills-primary-300, #A38CE5)'
    : 'var(--fills-primary-500, #5523B2)';

  // Handle track click/tap to jump to position
  const handleTrackInteraction = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Don't handle if it originated from thumb
    if ((e.target as HTMLElement).getAttribute('role') === 'slider') return;

    e.preventDefault();
    e.stopPropagation();

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);

    if (type === 'single') {
      onChange?.(newValue);
    } else {
      // For range, move the closest thumb
      const leftDist = Math.abs(newValue - rangeValue[0]);
      const rightDist = Math.abs(newValue - rangeValue[1]);

      if (leftDist < rightDist) {
        const newLeft = Math.min(newValue, rangeValue[1] - step);
        onRangeChange?.([newLeft, rangeValue[1]]);
      } else {
        const newRight = Math.max(newValue, rangeValue[0] + step);
        onRangeChange?.([rangeValue[0], newRight]);
      }
    }
  }, [disabled, getPositionFromEvent, percentToValue, type, onChange, onRangeChange, rangeValue, step]);

  // Thumb mouse down handler
  const handleThumbMouseDown = useCallback((dragType: 'left' | 'right' | 'single') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startDragging(dragType);
  }, [startDragging]);

  // Thumb touch start handler
  const handleThumbTouchStart = useCallback((dragType: 'left' | 'right' | 'single') => (e: React.TouchEvent) => {
    // IMPORTANT: preventDefault stops browser from interpreting as scroll/pan gesture
    e.preventDefault();
    e.stopPropagation();
    startDragging(dragType);
  }, [startDragging]);

  // Keyboard handler for accessibility
  const handleKeyDown = useCallback((dragType: 'left' | 'right' | 'single') => (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (dragType === 'single') {
        const newValue = Math.min(max, value + step);
        onChange?.(newValue);
      } else if (dragType === 'left') {
        const newLeft = Math.min(rangeValue[0] + step, rangeValue[1] - step);
        onRangeChange?.([newLeft, rangeValue[1]]);
      } else {
        const newRight = Math.min(max, rangeValue[1] + step);
        onRangeChange?.([rangeValue[0], newRight]);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (dragType === 'single') {
        const newValue = Math.max(min, value - step);
        onChange?.(newValue);
      } else if (dragType === 'left') {
        const newLeft = Math.max(min, rangeValue[0] - step);
        onRangeChange?.([newLeft, rangeValue[1]]);
      } else {
        const newRight = Math.max(rangeValue[0] + step, rangeValue[1] - step);
        onRangeChange?.([rangeValue[0], newRight]);
      }
    }
  }, [disabled, min, max, step, value, rangeValue, onChange, onRangeChange]);

  const isDragging = draggingRef.current !== null;
  const singlePercent = valueToPercent(value);
  const leftPercent = valueToPercent(rangeValue[0]);
  const rightPercent = valueToPercent(rangeValue[1]);

  // Thumb wrapper style (larger touch target)
  const getThumbWrapperStyle = (position: number): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    left: `${position}%`,
    transform: 'translate(-50%, -50%)',
    width: 44, // Minimum recommended touch target size
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
    zIndex: 2,
    outline: 'none',
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    // Debug: uncomment to see touch area
    // backgroundColor: 'rgba(255,0,0,0.2)',
  });

  // Visual thumb style (smaller visible circle)
  const thumbVisualStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    pointerEvents: 'none',
    transition: isDragging ? 'none' : 'transform 0.1s ease',
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        padding: '12px 0',
        opacity: disabled ? 0.6 : 1,
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        onClick={handleTrackInteraction}
        onTouchEnd={handleTrackInteraction}
        style={{
          position: 'relative',
          width: '100%',
          height: 4,
          backgroundColor: trackBg,
          borderRadius: 2,
          cursor: disabled ? 'not-allowed' : 'pointer',
          touchAction: 'none',
        }}
      >
        {/* Filled portion */}
        {type === 'single' ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${singlePercent}%`,
              height: '100%',
              backgroundColor: fillBg,
              borderRadius: 2,
              transition: isDragging ? 'none' : 'width 0.1s ease',
              pointerEvents: 'none',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              left: `${leftPercent}%`,
              top: 0,
              width: `${rightPercent - leftPercent}%`,
              height: '100%',
              backgroundColor: fillBg,
              borderRadius: 2,
              transition: isDragging ? 'none' : 'all 0.1s ease',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Thumb(s) */}
        {type === 'single' ? (
          <div
            role="slider"
            aria-label={ariaLabel}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            tabIndex={disabled ? -1 : 0}
            onMouseDown={handleThumbMouseDown('single')}
            onTouchStart={handleThumbTouchStart('single')}
            onKeyDown={handleKeyDown('single')}
            style={getThumbWrapperStyle(singlePercent)}
          >
            <div style={thumbVisualStyle} />
          </div>
        ) : (
          <>
            <div
              role="slider"
              aria-label={`${ariaLabel} minimum`}
              aria-valuenow={rangeValue[0]}
              aria-valuemin={min}
              aria-valuemax={rangeValue[1]}
              tabIndex={disabled ? -1 : 0}
              onMouseDown={handleThumbMouseDown('left')}
              onTouchStart={handleThumbTouchStart('left')}
              onKeyDown={handleKeyDown('left')}
              style={getThumbWrapperStyle(leftPercent)}
            >
              <div style={thumbVisualStyle} />
            </div>
            <div
              role="slider"
              aria-label={`${ariaLabel} maximum`}
              aria-valuenow={rangeValue[1]}
              aria-valuemin={rangeValue[0]}
              aria-valuemax={max}
              tabIndex={disabled ? -1 : 0}
              onMouseDown={handleThumbMouseDown('right')}
              onTouchStart={handleThumbTouchStart('right')}
              onKeyDown={handleKeyDown('right')}
              style={getThumbWrapperStyle(rightPercent)}
            >
              <div style={thumbVisualStyle} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
