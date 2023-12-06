import { request } from '@/utils';
import md5 from 'js-md5';

export const loginApi = ({ username, password }) => {
  const data = { username, password: md5(password) };
  return request({ url: '/user/login', method: 'post', data });
};

export const registerApi = (params) => {
  const data = {
    ...params,
    password: md5(params.password),
  };
  return request({ url: '/user/register', method: 'post', data });
};

export const getWxQrCodeApi = () => {
  return request<any>({ url: '/qq/getWxQrCode', method: 'get' });
};

export const getLoginStatusApi = () => {
  return request<any>({ url: '/qq/getLoginStatus', method: 'get' });
};
