import { request } from '@/utils';
import store from './store';

const { getState, setState } = store;

const { paramsFilterChange } = getState();

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
