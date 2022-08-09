const debounce = (fn: Function, delay: number) => {
  let time: any = null;

  return () => {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(fn, delay);
  };
};

export default debounce;
