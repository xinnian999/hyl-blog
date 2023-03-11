function r(pxValue: any) {
  const ratio = 54; // 根据项目配置比例的方式自行设定

  // 针对template literals
  if (Array.isArray(pxValue)) {
    pxValue = pxValue[0];
  }

  pxValue = parseInt(pxValue);

  return pxValue / ratio + "rem";
}

export default r;
