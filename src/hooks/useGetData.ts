import { useState } from "react";
import Nprogress from "nprogress";
import { request } from "@/utils";
import useMount from "./useMount";

type toolConfig = {
  data?: object;
  manual?: boolean;
  progress?: boolean;
  onSuccess?: (res: responseType) => void;
  onFail?: (err: Response) => void;
  mockLoadingCount?: number;
  cache?: boolean;
};

type runFn = (props?: toolConfig) => Promise<responseType>;

//默认在组件挂载完成时自动发一次请求，可设置config的manual为 true取消自动
//默认开启progress顶部加载进度条，可设置config的progress为 false
//默认关闭缓存数据，可设置config的cacheData为 true开启
const defaultConfig: Required<toolConfig> = {
  progress: true,
  onSuccess: () => {},
  onFail: () => {},
  data: { orderBys: "id desc" },
  manual: false,
  mockLoadingCount: 0,
  cache: false,
};

function useGetData<T = any>(
  url: string,
  newConfig: toolConfig = defaultConfig
) {
  const config = { ...defaultConfig, ...newConfig };

  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  const run: runFn = async (runProps) => {
    //重复请求的新配置合并
    if (runProps) {
      Object.assign(config, runProps);
    }

    // 是否开启顶部加载进度条
    if (config.progress) {
      Nprogress.start();
    }

    //mock骨架屏加载数据
    if (config.mockLoadingCount) {
      const mockData = [...new Array(config.mockLoadingCount)].map(
        (item, index) => ({
          loading: true,
          id: `${index}-key`,
        })
      );
      setResult(data.concat(mockData as any));
    }

    try {
      const res = await request.get(url, config.data);

      const newData = config.cache ? data.concat(res.data) : res.data;
      setResult(newData);
      setData(newData);

      //调用成功的回调函数
      config.onSuccess(res);

      return res;
    } catch (e) {
      //调用失败的回调函数
      config.onFail(e as Response);

      return e;
    }
  };

  const set = (data) => {
    setResult(data);
    setData(data);
  };

  useMount(() => {
    if (!config.manual) {
      run();
    }
  });

  return [result, run, set] as [T[], runFn, (data: T[]) => void];
}

export default useGetData;
