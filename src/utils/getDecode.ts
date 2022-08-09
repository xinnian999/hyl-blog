const getDecode = (str: any) => {
  // 对base64转编码
  var decode = atob(str);
  // 编码转字符串
  return decodeURI(decode);
};

export default getDecode;
