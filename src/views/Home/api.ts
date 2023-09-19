import { request } from '@/utils';

export const addArticleVisits = data =>
  request({ url: '/article/visit', method: 'put', data });

export const queryAboutArticle = category => {
  const params = {
    pageNum: 1,
    pageSize: 6,
    orderBys: 'topping desc,id desc',
    filters: { publish: 1, category },
  };
  return request({ url: '/article/query', params });
};
