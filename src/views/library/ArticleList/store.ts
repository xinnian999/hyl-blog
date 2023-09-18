import { request } from '@/utils';
import { flushSync } from 'react-dom';
import { create } from 'zustand';

interface articleItem extends Item {
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
};

type StoreTypes = {
  articleData: articleItem[];
  total: number;
  params: paramsType;
  loading: boolean;
  fetchData: (scroll: () => void) => void;
  paramsChange: (param: Partial<paramsType>) => void;
  pageChange: (page: number) => void;
  categoryChange: (category: string) => void;
  onSearch: (q: string) => void;
};

const store = create<StoreTypes>((set, get) => ({
  articleData: [],
  total: 0,
  params: {
    pageNum: 1,
    pageSize: 10,
    filters: { publish: 1 },
    orderBys: 'topping desc,id desc',
  },
  loading: false,

  async fetchData(scroll) {
    const api = {
      url: '/article/query',
      method: 'get',
      params: get().params,
    };

    set({ loading: true });

    const { data: articleData, total } = await request(api);

    flushSync(() => {
      set({ articleData, total, loading: false });
    });

    scroll();
  },

  paramsChange(param) {
    set({ params: { ...get().params, ...param } });
  },

  pageChange(pageNum) {
    get().paramsChange({ pageNum });
  },

  categoryChange(category) {
    const { params, paramsChange } = get();
    paramsChange({ filters: { ...params.filters, category }, pageNum: 1 });
  },

  onSearch(q) {
    const { params, paramsChange } = get();
    paramsChange({
      filters: { ...params.filters, category: '', title: q },
      pageNum: 1,
    });
  },
}));

export default store;
