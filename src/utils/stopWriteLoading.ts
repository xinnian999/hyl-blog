const stopWriteLoading = () => {
  const loadingDom: any = document.querySelector("#loading-box");
  if (loadingDom) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    loadingDom.style.display = "none";
  }
};

export default stopWriteLoading;
