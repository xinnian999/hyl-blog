import { request } from "@/utils";

export const addArticleVisits = (data) => {
  return request.put("/article/visit", data);
};

export const queryAboutArticle = (category) => {
  const params = {
    pageNum: 1,
    pageSize: 6,
    orderBys: "topping desc,id desc",
    filters: { publish: 1, category },
  };
  return request.get("/article/query", params);
};
