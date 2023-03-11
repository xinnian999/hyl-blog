const flexible = (size: number = 54) => {
  const htmlEl = window.document.documentElement;

  htmlEl.style.fontSize = `${size}px`;

  window.addEventListener("resize", () => {
    const width = htmlEl.getBoundingClientRect().width;
    if (width < size * 10) {
      htmlEl.style.fontSize = `${width / 10}px`;
    }
  });
};

export default flexible;
