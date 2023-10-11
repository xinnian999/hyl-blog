import { create } from 'zustand';

export interface articleItem extends Item {
  title: string;
  category: string[];
  introduce: string;
  content: string;
  picture: string;
  type: number;
  visits: number;
  comments: number;
  publish: number;
  topping: number;
}

type paramsType = {
  pageNum: number;
  pageSize: number;
  filters: { publish?: number; category?: string; title?: string };
  orderBys: { [key: string]: string };
};

type StoreTypes = {
  articleData: articleItem[];
  total: number;
  params: paramsType;
  loading: boolean;
  value: string;
  setParams: (param: Partial<paramsType>) => void;
  setParamsFilter: (filter: paramsType['filters']) => void;
  reset: () => void;
};

const store = create<StoreTypes>((set, get) => ({
  articleData: [],
  total: 0,
  params: {
    pageNum: 1,
    pageSize: 12,
    filters: { publish: 1 },
    orderBys: { topping: 'desc', createTime: 'desc' },
  },
  loading: false,
  value: '',

  setParams(param) {
    set({ params: { ...get().params, pageNum: 1, ...param } });
  },

  setParamsFilter(filter) {
    const { setParams, params } = get();
    setParams({
      filters: { ...params.filters, ...filter },
    });
  },

  reset() {
    set(get());
  },
}));

export default store;
