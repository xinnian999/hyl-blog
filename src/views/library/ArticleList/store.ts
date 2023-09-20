import { request } from '@/utils';
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
  fetchData: () => void;
  paramsChange: (param: Partial<paramsType>) => void;
  paramsFilterChange: (filter: paramsType['filters']) => void;
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

  async fetchData() {
    const api = {
      url: '/article/query',
      method: 'get',
      params: get().params,
    };

    set({ loading: true });

    const { data: articleData, total } = await request(api);

    set({ articleData, total, loading: false });
  },

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

  categoryChange(category) {
    const { params, paramsFilterChange } = get();
    // 如果点击的是当前分类，就取消分类查询所有
    paramsFilterChange({
      category: category === params.filters.category ? '' : category,
    });
  },

  onSearch(q) {
    get().paramsFilterChange({ category: '', title: q });
  },
}));

export default store;
