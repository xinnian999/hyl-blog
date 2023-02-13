import request from "./request";
import clearLogin from "./clearLogin";
import changeBlogTitle from "./changeBlogTitle";
import getDecode from "./getDecode";
import batchCopyDom from "./batchCopyDom";
import stopWriteLoading from "./stopWriteLoading";
import httpTohttps from "./httpTohttps";

const globalConfig = {
  remoteStaticUrl: "https://cdn.hyl999.co/public",
};

export {
  request,
  clearLogin,
  changeBlogTitle,
  getDecode,
  batchCopyDom,
  globalConfig,
  stopWriteLoading,
  httpTohttps,
};
