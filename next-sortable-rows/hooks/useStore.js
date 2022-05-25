import { useState, useMemo } from 'react';

class EventEmitter extends EventTarget {
  emit(key) {
    this.dispatchEvent(new Event(key));
  }
}

export const createStore = (initialState = {}) => {
  const instance = new EventEmitter();

  return (key) => {
    const [, setCount] = useState(0);

    useMemo(() => {
      instance.addEventListener(key, () => {
        setCount((c) => (c + 1) % Number.MAX_SAFE_INTEGER);
      });
    }, [key]);

    return [
      initialState[key],
      (cb) => {
        initialState[key] = cb(initialState[key]);
        instance.emit(key);
      },
    ];
  };
};
