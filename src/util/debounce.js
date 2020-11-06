export const debounce = (fn, ms, ...args) => {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn(...args);
    }, ms);
  };
};
