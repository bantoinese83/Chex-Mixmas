import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to manage state that automatically resets after a timeout
 * Eliminates duplication of setTimeout patterns for success/notification states
 * Follows DRY principle
 */
export const useTimeoutState = <T>(initialValue: T, timeoutMs: number = 2000) => {
  const [value, setValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setValueWithTimeout = (newValue: T) => {
    setValue(newValue);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to reset to initial value
    if (newValue !== initialValue) {
      timeoutRef.current = setTimeout(() => {
        setValue(initialValue);
      }, timeoutMs);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [value, setValueWithTimeout] as const;
};
