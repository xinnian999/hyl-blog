import request from "./request";
import Time from "./time";
import clearLogin from "./clearLogin";
import getRandom from "./getRandom";
import changeBlogTitle from "./changeBlogTitle";
import getDecode from "./getDecode";
import debounce from "./debounce";
import copy from "./copy";
import batchCopyDom from "./batchCopyDom";

function isFunction(obj: any): boolean {
  return typeof obj === "function";
}

function isIE() {
  //@ts-ignore
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
  else return false;
}

const isDev = process.env.NODE_ENV === "development";

export {
  Time,
  isFunction,
  request,
  isIE,
  isDev,
  clearLogin,
  getRandom,
  changeBlogTitle,
  getDecode,
  debounce,
  copy,
  batchCopyDom
};
