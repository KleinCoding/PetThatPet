import { useState, useEffect, useRef, useCallback } from 'react';




//CUSTOM HOOKS
//
//useTimeout is used inside useDelayNextChildren to delay rendering
const useTimeout = (callback, delay) => {
  // save id in a ref
  const timeoutId = useRef('');
  // save callback as a ref so we can update the timeout callback without resetting the clock
  const savedCallback = useRef();
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback],
  );
  // clear the timeout and start a new one, updating the timeoutId ref
  const reset = useCallback(
    () => {
      clearTimeout(timeoutId.current);

      const id = setTimeout(savedCallback.current, delay);
      timeoutId.current = id;
    },
    [delay],
  );
  useEffect(
    () => {
      if (delay !== null) {
        reset();

        return () => clearTimeout(timeoutId.current);
      }
    },
    [delay, reset],
  );

  return { reset };
};

//Hook for delaying rendering of a component
export const useDelayNextChildren = (children, delay) => {
    const [finalChildren, setFinalChildren] = useState(null);
  
    const { reset } = useTimeout(() => {
      setFinalChildren(children);
    }, delay);
  
    useEffect(
      () => {
        reset();
      },
      [reset, children],
    );
  
    return finalChildren || null;
  };

  //Hook for creating an interval timer. call with
  // useInterval({function here}, delayWantedHere)
  // set delay to null in order to stop the timer.

 export function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }