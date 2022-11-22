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
};

type isRunProps = {
  params?: object;
  data?: object;
};

type isRun = (props?: isRunProps) => Promise<any>;

type SetResult = (state: any) => void;

type useRequestResult = [any[], SetResult, isRun];

const defaultConfig: toolConfig = {
  method: "get",
  progress: true,
  onSuccess: undefined,
  data: {},
  manual: false,
  params: {},
};

//只传入url，默认get请求
//默认在组件挂载完成时自动发一次请求，可设置config的manual为true取消自动
function useRequest(
  url: string,
  newConfig: toolConfig = defaultConfig
): useRequestResult {
  const config = { ...defaultConfig, ...newConfig };

  const [result, setResult] = useState([]);

  const thenFn = (res: any) => {
    if (res.status === 0) {
      setResult(res.data);
      return res;
    }
  };

  const run: isRun = (runProps) => {
    if (config.progress) {
      // 开启顶部加载进度条
      Nprogress.start();
    }

    if (!config) {
      return request(url).then(thenFn);
    }

    const options = {
      url,
      ...pick(config, ["method", "data", "params"]),
    };

    if (runProps) {
      Object.assign(options, runProps);
    }
    return request(options).then(config.onSuccess || thenFn);
  };

  useMount(() => {
    if (!config.manual) {
      run();
    }
  });

  return [result, setResult, run];
}

export default useRequest;
