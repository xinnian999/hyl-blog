import { request } from '@/utils';
import { create } from 'zustand';

export interface articleItem extends Item {
  title: string;
  category: string;
  tag: string;
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
  filters: {
    publish?: number;
    category?: string;
    tag?: string;
    title?: string;
  };
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
  fetchData: () => void;
  onSearch: (q: string) => void;
  onClickCategory: (category: string) => void;
  onClickOrderBy: (order: string) => void;
  onChangePage: (prop: {
    pageNum: number;
    pageSize: number;
    listRef: React.RefObject<HTMLDivElement>;
  }) => void;
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

  fetchData: async () => {
    const api = {
      url: '/current/query/article',
      method: 'get',
      params: get().params,
    };

    set({ loading: true });

    const { data: articleData, total } = await request(api);

    set({ loading: false, articleData, total });
  },

  onSearch: q => {
    get().setParamsFilter({ tag: '', title: q });
  },

  onClickCategory: category => {
    // 如果点击的是当前分类，就取消分类查询所有
    get().setParamsFilter({
      category: category === get().params.filters.category ? '' : category,
      title: '',
    });
    // 重置搜索
    set({ value: '' });
  },

  onClickOrderBy: (order: string) => {
    get().setParams({
      orderBys: {
        topping: order === 'createTime' ? 'desc' : '',
        [order]: 'desc',
      },
    });

    // 重置搜索
    set({ value: '' });
  },

  onChangePage: ({ pageNum, pageSize, listRef }) => {
    get().setParams({ pageNum, pageSize });

    //TODO:未实现异步滚动（等接口加载完且渲染完dom，尝试监听pageNum但页面挂载完成时必定执行一次滚动）

    // 滚动回列表顶部
    window.scrollTo({
      top:
        listRef.current!.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        300,
      behavior: 'smooth', // 平滑滚动
    });
  },
}));

export default store;
