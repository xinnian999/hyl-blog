import { request } from '@/utils';

export const addArticleVisits = (data) => {
  return request({ url: '/article/visit', method: 'post', data });
};

export const queryAboutArticle = (category) => {
  const params = {
    pageNum: 1,
    pageSize: 6,
    orderBys: 'topping desc,id desc',
    filters: { publish: 1, category },
  };
  return request({ url: '/article/query', params });
};
