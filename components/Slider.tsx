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
  const draggingRef = useRef<'left' | 'right' | 'single' | null>(null);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  // Store ALL mutable values in refs to avoid ANY stale closure issues
  const propsRef = useRef({
    min, max, step, value, rangeValue, disabled, onChange, onRangeChange
  });

  // Update refs on every render
  propsRef.current = { min, max, step, value, rangeValue, disabled, onChange, onRangeChange };

  // Calculate percentage from value
  const valueToPercent = (val: number) => {
    const { min: mn, max: mx } = propsRef.current;
    return ((val - mn) / (mx - mn)) * 100;
  };

  // Calculate value from percentage
  const percentToValue = (percent: number) => {
    const { min: mn, max: mx, step: st } = propsRef.current;
    const rawValue = (percent / 100) * (mx - mn) + mn;
    const steppedValue = Math.round(rawValue / st) * st;
    return Math.min(mx, Math.max(mn, steppedValue));
  };

  // Get position from event - stable function
  const getPositionFromEvent = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
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
  };

  // Create stable handler refs that never change
  const handleMoveRef = useRef<(e: MouseEvent | TouchEvent) => void>(null!);
  const handleEndRef = useRef<() => void>(null!);

  // Initialize handlers once (will read from propsRef for current values)
  if (!handleMoveRef.current) {
    handleMoveRef.current = (e: MouseEvent | TouchEvent) => {
      const { disabled: dis, step: st, onChange: oc, onRangeChange: orc } = propsRef.current;

      if (dis) return;
      if (!draggingRef.current) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      const percent = getPositionFromEvent(e);
      const newValue = percentToValue(percent);

      if (draggingRef.current === 'single') {
        oc?.(newValue);
      } else if (draggingRef.current === 'left') {
        const currentRange = propsRef.current.rangeValue;
        const newLeft = Math.min(newValue, currentRange[1] - st);
        orc?.([newLeft, currentRange[1]]);
      } else if (draggingRef.current === 'right') {
        const currentRange = propsRef.current.rangeValue;
        const newRight = Math.max(newValue, currentRange[0] + st);
        orc?.([currentRange[0], newRight]);
      }
    };
  }

  if (!handleEndRef.current) {
    handleEndRef.current = () => {
      draggingRef.current = null;
      document.removeEventListener('mousemove', handleMoveRef.current);
      document.removeEventListener('mouseup', handleEndRef.current);
      document.removeEventListener('touchmove', handleMoveRef.current);
      document.removeEventListener('touchend', handleEndRef.current);
      document.removeEventListener('touchcancel', handleEndRef.current);
      forceUpdate();
    };
  }

  // Start dragging
  const startDragging = (dragType: 'left' | 'right' | 'single') => {
    if (propsRef.current.disabled) return;

    draggingRef.current = dragType;

    document.addEventListener('mousemove', handleMoveRef.current);
    document.addEventListener('mouseup', handleEndRef.current);
    document.addEventListener('touchmove', handleMoveRef.current, { passive: false });
    document.addEventListener('touchend', handleEndRef.current);
    document.addEventListener('touchcancel', handleEndRef.current);

    forceUpdate();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMoveRef.current);
      document.removeEventListener('mouseup', handleEndRef.current);
      document.removeEventListener('touchmove', handleMoveRef.current);
      document.removeEventListener('touchend', handleEndRef.current);
      document.removeEventListener('touchcancel', handleEndRef.current);
    };
  }, []);

  // Track colors
  const trackBg = disabled
    ? 'var(--fills-gray-300, #D1D1D6)'
    : 'var(--fills-gray-200, #E5E5EA)';
  const fillBg = disabled
    ? 'var(--fills-primary-300, #A38CE5)'
    : 'var(--fills-primary-500, #5523B2)';

  // Handle track click/tap
  const handleTrackInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    if ((e.target as HTMLElement).getAttribute('role') === 'slider') return;

    e.preventDefault();
    e.stopPropagation();

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);

    if (type === 'single') {
      onChange?.(newValue);
    } else {
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

  // Keyboard handler
  const handleKeyDown = (dragType: 'left' | 'right' | 'single') => (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (dragType === 'single') {
        onChange?.(Math.min(max, value + step));
      } else if (dragType === 'left') {
        onRangeChange?.([Math.min(rangeValue[0] + step, rangeValue[1] - step), rangeValue[1]]);
      } else {
        onRangeChange?.([rangeValue[0], Math.min(max, rangeValue[1] + step)]);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (dragType === 'single') {
        onChange?.(Math.max(min, value - step));
      } else if (dragType === 'left') {
        onRangeChange?.([Math.max(min, rangeValue[0] - step), rangeValue[1]]);
      } else {
        onRangeChange?.([rangeValue[0], Math.max(rangeValue[0] + step, rangeValue[1] - step)]);
      }
    }
  };

  const isDragging = draggingRef.current !== null;
  const singlePercent = valueToPercent(value);
  const leftPercent = valueToPercent(rangeValue[0]);
  const rightPercent = valueToPercent(rangeValue[1]);

  // Styles
  const getThumbWrapperStyle = (position: number): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    left: `${position}%`,
    transform: 'translate(-50%, -50%)',
    width: 44,
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
  });

  const thumbVisualStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    pointerEvents: 'none',
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
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); startDragging('single'); }}
            onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); startDragging('single'); }}
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
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); startDragging('left'); }}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); startDragging('left'); }}
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
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); startDragging('right'); }}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); startDragging('right'); }}
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
