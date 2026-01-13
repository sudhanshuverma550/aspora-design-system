/**
 * Aspora Design System - Slider Component
 * A range slider with single or dual thumb variants
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';

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
  const [isDragging, setIsDragging] = useState<'left' | 'right' | 'single' | null>(null);

  // Use refs to avoid stale closures in event handlers
  const valueRef = useRef(value);
  const rangeValueRef = useRef(rangeValue);
  const onChangeRef = useRef(onChange);
  const onRangeChangeRef = useRef(onRangeChange);

  // Keep refs in sync with props
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    rangeValueRef.current = rangeValue;
  }, [rangeValue]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onRangeChangeRef.current = onRangeChange;
  }, [onRangeChange]);

  // Calculate percentage from value
  const valueToPercent = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  // Calculate value from percentage
  const percentToValue = useCallback((percent: number) => {
    const rawValue = (percent / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  }, [min, max, step]);

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

  // Handle mouse/touch move
  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (disabled) return;

    // Prevent scrolling on touch devices
    if (e.cancelable) {
      e.preventDefault();
    }

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);

    if (type === 'single') {
      onChangeRef.current?.(newValue);
    } else if (type === 'range') {
      const currentRange = rangeValueRef.current;
      // We need to check which thumb is being dragged from the dragging state
      // But since this is called from document event, we check via a ref
    }
  }, [disabled, type, getPositionFromEvent, percentToValue]);

  // Create specific handlers for each drag type to avoid stale closure issues
  const handleSingleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (disabled) return;
    if (e.cancelable) e.preventDefault();

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);
    onChangeRef.current?.(newValue);
  }, [disabled, getPositionFromEvent, percentToValue]);

  const handleLeftMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (disabled) return;
    if (e.cancelable) e.preventDefault();

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);
    const currentRange = rangeValueRef.current;
    const newLeft = Math.min(newValue, currentRange[1] - step);
    onRangeChangeRef.current?.([newLeft, currentRange[1]]);
  }, [disabled, getPositionFromEvent, percentToValue, step]);

  const handleRightMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (disabled) return;
    if (e.cancelable) e.preventDefault();

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);
    const currentRange = rangeValueRef.current;
    const newRight = Math.max(newValue, currentRange[0] + step);
    onRangeChangeRef.current?.([currentRange[0], newRight]);
  }, [disabled, getPositionFromEvent, percentToValue, step]);

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Add/remove event listeners based on drag state
  useEffect(() => {
    if (!isDragging) return;

    let moveHandler: (e: MouseEvent | TouchEvent) => void;

    if (isDragging === 'single') {
      moveHandler = handleSingleMove;
    } else if (isDragging === 'left') {
      moveHandler = handleLeftMove;
    } else {
      moveHandler = handleRightMove;
    }

    // Use passive: false to allow preventDefault on touch events
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', handleEnd);
      document.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDragging, handleSingleMove, handleLeftMove, handleRightMove, handleEnd]);

  // Track colors
  const trackBg = disabled
    ? 'var(--fills-gray-300, #D1D1D6)'
    : 'var(--fills-gray-200, #E5E5EA)';
  const fillBg = disabled
    ? 'var(--fills-primary-300, #A38CE5)'
    : 'var(--fills-primary-500, #5523B2)';

  // Handle track click to jump to position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

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
  };

  // Thumb component
  const Thumb: React.FC<{
    position: number;
    onStart: () => void;
    label: string;
  }> = ({ position, onStart, label }) => {
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) onStart();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      e.stopPropagation();
      if (!disabled) onStart();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      const currentValue = percentToValue(position);

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const newValue = Math.min(max, currentValue + step);
        if (type === 'single') onChange?.(newValue);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newValue = Math.max(min, currentValue - step);
        if (type === 'single') onChange?.(newValue);
      }
    };

    return (
      <div
        role="slider"
        aria-label={label}
        aria-valuenow={percentToValue(position)}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        style={{
          position: 'absolute',
          top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
          zIndex: 2,
          transition: isDragging ? 'none' : 'left 0.1s ease',
          outline: 'none',
          touchAction: 'none', // Prevent browser touch behaviors
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      />
    );
  };

  const singlePercent = valueToPercent(value);
  const leftPercent = valueToPercent(rangeValue[0]);
  const rightPercent = valueToPercent(rangeValue[1]);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        padding: '12px 0',
        opacity: disabled ? 0.6 : 1,
        touchAction: 'none', // Prevent scrolling while interacting
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        style={{
          position: 'relative',
          width: '100%',
          height: 4,
          backgroundColor: trackBg,
          borderRadius: 2,
          cursor: disabled ? 'not-allowed' : 'pointer',
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
          <Thumb
            position={singlePercent}
            onStart={() => setIsDragging('single')}
            label={ariaLabel}
          />
        ) : (
          <>
            <Thumb
              position={leftPercent}
              onStart={() => setIsDragging('left')}
              label={`${ariaLabel} minimum`}
            />
            <Thumb
              position={rightPercent}
              onStart={() => setIsDragging('right')}
              label={`${ariaLabel} maximum`}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
