import { request } from '@/utils';
import { useEffect, useState } from 'react';

type responseType = {
  data: any[];
  status: number;
  total: number;
};

type toolConfig = {
  data?: object;
  manual?: boolean;
  onSuccess?: (res: responseType) => void;
  onFail?: (err: Response) => void;
  mockLoadingCount?: number;
  cache?: boolean;
  parseResult?: (result: any[]) => any[];
  deps?: any[];
};

type runFn = (props?: toolConfig) => Promise<responseType>;

//默认在组件挂载完成时自动发一次请求，可设置config的manual为 true取消自动
//默认开启progress顶部加载进度条，可设置config的progress为 false
//默认关闭缓存数据，可设置config的cacheData为 true开启
const defaultConfig: Required<toolConfig> = {
  onSuccess: () => {},
  onFail: () => {},
  data: {},
  manual: false,
  mockLoadingCount: 0,
  cache: false,
  parseResult: result => result,
  deps: [],
};

function useGetData<T = any>(
  url: string,
  newConfig: toolConfig = defaultConfig
) {
  const config = { ...defaultConfig, ...newConfig };

  const [result, setResult] = useState<T[]>([]);
  const [data, setData] = useState<T[]>([]);

  const run: runFn = async runProps => {
    //重复请求的新配置合并
    if (runProps) {
      Object.assign(config, runProps);
    }

    const res = await request({
      url,
      method: 'GET',
      params: config.data,
    });

    if (Array.isArray(res.data)) {
      const newData = config.cache ? data.concat(res.data) : res.data;

      const parseResult = config.parseResult(newData);
      setResult(parseResult);
      setData(parseResult);
    }

    //调用成功的回调函数
    config.onSuccess(res);

    return Promise.resolve(res);
  };

  const set = data => {
    setResult(data);
    setData(data);
  };

  useEffect(() => {
    if (!config.manual) {
      run();
    }
  }, config.deps);

  return [result, run, set] as [T[], runFn, (data: T[]) => void];
}

export default useGetData;
