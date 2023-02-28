const stopWriteLoading = () => {
  const loadingDom = document.querySelector("#loading-box");
  if (loadingDom) {
    loadingDom.remove();
  }
};

export default stopWriteLoading;
