import { setState } from '@/rootStore';
import { notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { cookie } from 'hyl-utils';
import topProgress from 'nprogress';
import 'nprogress/nprogress.css';

type responseType<T = any> = {
  data: T[];
  status: number;
  total: number;
};

const myAxios = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
  paramsSerializer: params =>
    Object.keys(params)
      .map(key => {
        if (typeof params[key] !== 'object') return `${key}=${params[key]}`;
        return `${key}=${encodeURI(JSON.stringify(params[key]))}`;
      })
      .join('&'),
});

myAxios.interceptors.request.use(config => {
  config.xsrfHeaderName = 'X-CSRF-TOKEN';
  config.xsrfCookieName = 'csrf_token';
  topProgress.start();
  return config;
});

myAxios.interceptors.response.use(
  response => {
    const { message } = response.data;
    // 关闭顶部加载进度条
    topProgress.done();

    if (message) {
      notification.error({
        message: '接口报错',
        description: message,
      });
    }

    // 监听登陆是否失效：
    if (!cookie.get('blog_token')) {
      setState({ loginState: false });
    }

    return response;
  },
  error => {
    const { status } = error.response;

    switch (status) {
      case 504:
        notification.error({
          message: status,
          description: '请求超时',
        });

        break;
      case 502:
        notification.error({
          message: status,
          description: '后端服务挂了',
        });
        break;
      case 500:
        notification.error({
          message: status,
          description: '请求接口异常',
        });
        break;
      case 404:
        notification.error({
          message: status,
          description: '请求接口不存在',
        });
        break;
      default:
        notification.error({
          message: status,
          description: '请求接口失败',
        });
        break;
    }

    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const request = <T = responseType>(config: AxiosRequestConfig) =>
  new Promise<T>((resolve, reject) => {
    myAxios(config)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export default request;
