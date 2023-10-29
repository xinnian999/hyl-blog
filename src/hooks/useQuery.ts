import { request } from '@/utils';
import { useEffect, useState } from 'react';
import useBoolean from './useBoolean';

type responseType = {
  data: any[];
  status: number;
  total: number;
};

type optionsType = {
  url: string;
  params?: object;
  manual?: boolean;
  onSuccess?: (res: responseType) => void;
  onFail?: (err: Response) => void;
  deps?: any[];
};

type runFn = (props?: optionsType) => Promise<responseType>;

function useQuery<T = any>(options: optionsType) {
  const [data, setData] = useState<T[]>([]);

  const [loading, onLoading, offLoading] = useBoolean(false);

  const {
    url = '',
    params = {},
    onSuccess,
    deps = [],
    manual = false,
  } = options;

  const run: runFn = async runProps => {
    //重复请求的新配置合并
    if (runProps) {
      Object.assign(options, runProps);
    }

    onLoading();
    const res = await request({
      url,
      method: 'GET',
      params,
    });

    setData(res.data);
    offLoading();
    //调用成功的回调函数
    if (onSuccess) {
      onSuccess(res);
    }

    return Promise.resolve(res);
  };

  useEffect(() => {
    if (!manual) {
      run();
    }
  }, deps);

  return {
    data,
    set: setData,
    run,
    loading,
  };
}

export default useQuery;
