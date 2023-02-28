import request from "./request";
import clearLogin from "./clearLogin";
import changeBlogTitle from "./changeBlogTitle";
import getDecode from "./getDecode";
import batchCopyDom from "./batchCopyDom";
import stopWriteLoading from "./stopWriteLoading";

const imgPrestrain = (imgs: string[]) => {
  imgs.forEach((item) => {
    const image = new Image();
    image.src = item;
  });
};

export {
  request,
  clearLogin,
  changeBlogTitle,
  getDecode,
  batchCopyDom,
  stopWriteLoading,
  imgPrestrain,
};
