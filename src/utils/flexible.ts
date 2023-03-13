const flexible = (size: number = 54) => {
  const htmlEl = window.document.documentElement;

  const change = () => {
    const width = htmlEl.getBoundingClientRect().width;

    if (width < size * 10) {
      htmlEl.style.fontSize = `${width / 10}px`;
    } else {
      htmlEl.style.fontSize = `${size}px`;
    }
  };
  change();

  window.addEventListener("resize", change);
};

export default flexible;
