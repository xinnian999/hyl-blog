import { Button, Divider, Spin } from "antd";
import { useBoolean, useGetData, useSetState } from "@/hooks";
import ArticleCard from "./ArticleCard";
import { HomeMainWrapper, ArticleWrapper } from "./styled";

function Main() {
  const [state, setState] = useSetState({
    pageNum: 1,
    category: "all",
    total: 10,
  });

  const [loading, on, off] = useBoolean(true);

  const [articleData, run] = useGetData<articleItem>("/article/query", {
    progress: false,
    cache: true,
    data: {
      pageNum: state.pageNum,
      pageSize: 12,
      filters: { publish: 1 },
      orderBys: "topping desc,id desc",
    },
    onSuccess(res) {
      setState({
        total: res.total,
        pageNum: state.pageNum + 1,
      });
      off();
    },
  });

  const queryArticle = () => {
    on();
    run();
  };

  return (
    <HomeMainWrapper>
      <ArticleWrapper>
        {articleData.map((item) => (
          <div className="item" key={item.id}>
            <ArticleCard {...item} />
          </div>
        ))}
        <Divider plain className="article-footer">
          {loading ? (
            <Spin />
          ) : articleData.length < state.total ? (
            <Button onClick={queryArticle}>点击加载更多</Button>
          ) : (
            <Divider plain className="article-footer">
              没有更多文章了 ---- 🤐
            </Divider>
          )}
        </Divider>
      </ArticleWrapper>
    </HomeMainWrapper>
  );
}

export default Main;
