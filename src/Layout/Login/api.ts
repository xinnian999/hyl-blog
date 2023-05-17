import { request } from "@/utils";
import md5 from "js-md5";

export const loginApi = ({ username, password }) => {
  const data = { username, password: md5(password) };
  return request.post("/user/login", data);
};

export const registerApi = (params) => {
  const data = {
    ...params,
    password: md5(params.password),
  };
  return request.post("/user/register", data);
};

export const getWxQrCodeApi = () => {
  return request.get("/qq/getWxQrCode");
};

export const getLoginStatusApi = () => {
  return request.get("/qq/getLoginStatus");
};
