
import { useState, useEffect, useRef, useCallback } from 'react';

interface LongPressOptions {
  shouldPreventDefault?: boolean;
  delay?: number;
}

interface LongPressResult {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  isLongPressing: boolean;
}

export const useLongPress = (
  onLongPress: (e: React.MouseEvent | React.TouchEvent) => void,
  onClick: (e: React.MouseEvent | React.TouchEvent) => void = () => {},
  { shouldPreventDefault = true, delay = 600 }: LongPressOptions = {}
): LongPressResult => {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (shouldPreventDefault && e.target) {
        e.target.addEventListener(
          "touchend",
          preventDefault,
          { passive: false }
        );
        target.current = e.target;
      }
      
      timeout.current = setTimeout(() => {
        onLongPress(e);
        setIsLongPressing(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (e: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      
      if (shouldTriggerClick && !isLongPressing && e.type !== 'mouseleave') {
        onClick(e);
      }
      
      if (shouldPreventDefault && target.current) {
        (target.current as HTMLElement).removeEventListener("touchend", preventDefault);
      }
      
      setIsLongPressing(false);
    },
    [shouldPreventDefault, onClick, isLongPressing]
  );

  const preventDefault = useCallback((e: Event) => {
    if (isLongPressing) {
      e.preventDefault();
    }
  }, [isLongPressing]);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (target.current) {
        (target.current as HTMLElement).removeEventListener("touchend", preventDefault);
      }
    };
  }, [shouldPreventDefault, preventDefault]);

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
    isLongPressing,
  };
};
