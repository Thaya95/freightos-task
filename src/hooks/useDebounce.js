import { useState, useEffect } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after
 * the user stops typing for `delay` ms.
 *
 * @param {*}      value  – the raw value to debounce
 * @param {number} delay  – debounce window in milliseconds
 * @returns {*}           – debounced value
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Clean up on every re-render so stale timers never fire
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
