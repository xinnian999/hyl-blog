import { request } from '@/utils';
import store from './store';

type pageChangeProps = {
  pageNum: number;
  pageSize: number;
  listRef: React.RefObject<HTMLDivElement>;
};

const { getState: get, setState: set } = store;

const { setParams, setParamsFilter } = get();

export const fetchData = async () => {
  const api = {
    url: '/current/query/article',
    method: 'get',
    params: get().params,
  };

  set({ loading: true });

  const { data: articleData, total } = await request(api);

  set({ loading: false, articleData, total });
};

export const onSearch = (q: string) => {
  setParamsFilter({ tag: '', title: q });
};

export const onClickCategory = (category: string) => {
  // 如果点击的是当前分类，就取消分类查询所有
  setParamsFilter({
    tag: category === get().params.filters.tag ? '' : category,
    title: '',
  });
  // 重置搜索
  set({ value: '' });
};

export const onClickOrderBy = (order: string) => {
  setParams({
    orderBys: {
      topping: order === 'createTime' ? 'desc' : '',
      [order]: 'desc',
    },
  });

  // 重置搜索
  set({ value: '' });
};

export const onChangePage = ({
  pageNum,
  pageSize,
  listRef,
}: pageChangeProps) => {
  setParams({ pageNum, pageSize });

  //TODO:未实现异步滚动（等接口加载完且渲染完dom，尝试监听pageNum但页面挂载完成时必定执行一次滚动）

  // 滚动回列表顶部
  window.scrollTo({
    top:
      listRef.current!.getBoundingClientRect().top +
      document.documentElement.scrollTop -
      300,
    behavior: 'smooth', // 平滑滚动
  });
};
