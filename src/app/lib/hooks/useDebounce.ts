import { useState, useEffect } from "react";

/**
 * useDebounce
 *
 * Custom React hook that delays updating a value until after a specified delay has elapsed since the last change.
 * Typical use case: Preventing excessive API calls or expensive operations while a user is typing in an input field.
 *
 * Example:
 *   const debouncedValue = useDebounce({ inputValue, delay: 300 });
 * 
 * could use lodash or use-debounce but the challenger says minimal dependencies is pteferred...
 */
export function useDebounce({ inputValue, delay }: {inputValue: string, delay: number}) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}