import { useState } from "react";
import Nprogress from "nprogress";
import { pick } from "lodash";
import { request } from "@/utils";
import useMount from "./useMount";

type toolConfig = {
  method?: "get" | "post" | "put" | "delete";
  data?: object;
  params?: object;
  manual?: boolean;
  progress?: boolean;
  onSuccess?: (res: any) => void;
  onFail?: (res: any) => void;
  mockLoadingCount?: number;
  cache?: boolean;
};

type isRun = (props?: toolConfig) => Promise<any>;

type useRequestResult = [any[], isRun, (data: any) => void];

type useStateResult = [any[], (data?: any) => void];

const defaultConfig: toolConfig = {
  method: "get",
  progress: true,
  onSuccess: undefined,
  onFail: undefined,
  data: {},
  manual: false,
  params: {    orderBys:
    'id desc'},
  mockLoadingCount: undefined,
  cache: false,
};

//只传入url，默认get请求
//默认在组件挂载完成时自动发一次请求，可设置config的manual为 true取消自动
//默认开启progress顶部加载进度条，可设置config的progress为 false
//默认关闭缓存数据，可设置config的cacheData为 true开启
function useRequest(
  url: string,
  newConfig: toolConfig = defaultConfig
): useRequestResult {
  const config = { ...defaultConfig, ...newConfig };

  const [result, setResult]: useStateResult = useState([]);
  const [data, setData]: useStateResult = useState([]);

  const run: isRun = async (runProps) => {
    //重复请求的新配置合并
    if (runProps) {
      Object.assign(config, runProps);
    }

    // 是否开启顶部加载进度条
    if (config.progress) {
      Nprogress.start();
    }

    //是否mock骨架屏加载数据
    if (config.mockLoadingCount) {
      const mockData = [...new Array(config.mockLoadingCount)].map(
        (item, index) => ({
          loading: true,
          id: `${index}-key`,
        })
      );
      setResult(data.concat(mockData));
    }

    //合并axios需要的请求配置
    const options = {
      url,
      ...pick(config, ["method", "data", "params"]),
    };

    try {
      const res = await request(options);
      const newData = config.cache ? data.concat(res.data) : res.data;
      setResult(newData);
      setData(newData);

      //调用成功的回调函数
      if (config.onSuccess) config.onSuccess(res);

      return res;
    } catch (e) {
      //调用失败的回调函数
      if (config.onFail) config.onFail(e);

      return e;
    }
  };

  const set = (data: any) => {
    setResult(data);
    setData(data);
  };

  useMount(() => {
    if (!config.manual) {
      run();
    }
  });

  return [result, run, set];
}

export default useRequest;
