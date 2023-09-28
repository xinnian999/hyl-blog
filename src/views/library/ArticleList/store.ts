import { create } from 'zustand';

export interface articleItem extends Item {
  title: string;
  category: string;
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
  orderBys: string;
  sort: string;
};

type StoreTypes = {
  articleData: articleItem[];
  total: number;
  params: paramsType;
  loading: boolean;
  value: string;
  paramsChange: (param: Partial<paramsType>) => void;
  paramsFilterChange: (filter: paramsType['filters']) => void;
  reset: () => void;
};

const initialValues = {
  articleData: [],
  total: 0,
  params: {
    pageNum: 1,
    pageSize: 10,
    filters: { publish: 1 },
    orderBys: 'topping desc,id desc',
    sort: '日期',
  },
  loading: false,
  value: '',
};

const store = create<StoreTypes>((set, get) => ({
  ...initialValues,

  paramsChange(param) {
    set({ params: { ...get().params, ...param } });
  },

  paramsFilterChange(filter) {
    const { params, paramsChange } = get();
    paramsChange({
      filters: { ...params.filters, ...filter },
      pageNum: 1,
    });
  },

  reset() {
    set(initialValues);
  },
}));

export default store;
