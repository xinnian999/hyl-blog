import request from "./request";
import clearLogin from "./clearLogin";
import changeBlogTitle from "./changeBlogTitle";
import getDecode from "./getDecode";
import batchCopyDom from "./batchCopyDom";
import stopWriteLoading from "./stopWriteLoading";

const lazyImg = (attr: string) => {
  const viewHeight = document.documentElement.clientHeight;
  const imgList = document.querySelectorAll(`img[${attr}]`);

  imgList.forEach((item: any) => {
    let rect = item.getBoundingClientRect();
    if (rect.top <= viewHeight && rect.top > -rect.height) {
      item.src = item.attributes[attr].value;
    }
  });
};

const throttle = (func: Function, delay: number) => {
  let timer: any = null;
  return (e) => {
    if (!timer) {
      timer = setTimeout(function () {
        func(e);
        timer = null;
      }, delay);
    }
  };
};

export {
  request,
  clearLogin,
  changeBlogTitle,
  getDecode,
  batchCopyDom,
  stopWriteLoading,
  lazyImg,
  throttle,
};
