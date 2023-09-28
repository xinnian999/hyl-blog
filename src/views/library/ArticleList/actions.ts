import { request } from '@/utils';
import store from './store';

type pageChangeProps = {
  pageNum: number;
  pageSize: number;
  listRef: React.RefObject<HTMLDivElement>;
};

const { getState, setState } = store;

const { paramsChange, paramsFilterChange } = getState();

export const fetchData = async () => {
  const api = {
    url: '/article/query',
    method: 'get',
    params: getState().params,
  };

  setState({ loading: true });

  const { data: articleData, total } = await request(api);

  setState({ loading: false, articleData, total });
};

export const onSearch = (q: string) => {
  paramsFilterChange({ category: '', title: q });
};

export const onClickCategory = (category: string) => {
  // 如果点击的是当前分类，就取消分类查询所有
  paramsFilterChange({
    category: category === getState().params.filters.category ? '' : category,
    title: '',
  });
  // 重置搜索
  setState({ value: '' });
};

export const onChangePage = ({
  pageNum,
  pageSize,
  listRef,
}: pageChangeProps) => {
  paramsChange({ pageNum, pageSize });

  //TODO:未实现异步滚动（等接口加载完且渲染完dom，尝试监听pageNum但页面挂载完成时必定执行一次滚动）
  const prevPage = getState().params.pageNum;
  if (pageNum !== prevPage) {
    // 滚动回列表顶部
    window.scrollTo({
      top:
        listRef.current!.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        250,
      behavior: 'smooth', // 平滑滚动
    });
  }
};
