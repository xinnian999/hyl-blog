import { useState } from "react";
import { pick } from "lodash";
import { request } from "@/utils";
import useMount from "./useMount";

type toolConfig = {
  method: string;
  data?: object;
  params?: object;
  manual?: boolean;
  onSuccess?: (res: any) => void;
};

type isRunProps = {
  params?: any;
  data?: any;
};

type isRun = (props?: isRunProps) => void;

type SetResult = (state: any) => void;

type useRequestResult = [any[], SetResult, isRun];

//只传入url，默认get请求
//默认在组件挂载完成时自动发一次请求，可设置config的manual为true取消自动

const useRequest = (url: string, config?: toolConfig): useRequestResult => {
  const [result, setResult] = useState([]);

  const thenFn = (res: any) => {
    if (res.status === 0) {
      setResult(res.data);
    }
  };

  const run: isRun = (runProps) => {
    if (!config) {
      return request(url).then(thenFn);
    }

    const options = { url, ...pick(config, ["method", "data", "params"]) };
    if (runProps) {
      Object.assign(options, runProps);
    }
    request(options).then(config.onSuccess || thenFn);
  };

  useMount(() => {
    if (!config?.manual) {
      run();
    }
  });

  return [result, setResult, run];
};

export default useRequest;
