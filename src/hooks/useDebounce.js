import { useRef, useCallback } from "react";

export const useDebounce = (fn, delay) => {
  const timer = useRef(null);

  const debouncedFn = useCallback((...args) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};
