import { useRef } from "react";
import { Divider, Spin } from "antd";
import ReactScroll from "react-infinite-scroll-component";
import { useGetData } from "@/hooks";
import { Plate } from "@/components";
import ArticleCard from "./ArticleCard";
import { ArticleMain, ArticleContainer } from "./styled";

function Article() {
  const { current } = useRef({
    pageNum: 1,
    category: "all",
    total: 10,
  });

  const [articleData, runQueryArticle] = useGetData<articleItem>(
    "/article/query",
    {
      progress: false,
      data: {
        pageNum: current.pageNum,
        pageSize: 9,
        filters:
          current.category === "all"
            ? { publish: 1 }
            : { publish: 1, category: current.category },
        orderBys: "topping desc,id desc",
      },
      onSuccess(res) {
        current.total = res.total;
        current.pageNum++;
      },
    }
  );

  const reactScrollProps = {
    scrollThreshold: 0.98,
    dataLength: articleData.length,
    next: () => {
      runQueryArticle({
        cache: true,
      });
    },

    hasMore: articleData.length < current.total,
    loader: (
      <Divider plain className="article-footer">
        <Spin />
      </Divider>
    ),
    endMessage: (
      <Divider plain className="article-footer">
        没有更多文章了 ---- 🤐
      </Divider>
    ),
  };

  return (
    <Plate
      title="文章"
      autograph="人是要整活的——没活了，可不就是死了么 "
      bg="bg18.jpg"
    >
      <ArticleMain>
        <ReactScroll {...reactScrollProps}>
          <ArticleContainer>
            {articleData.map((item) => (
              <div className="item">
                <ArticleCard {...item} key={item.id} />
              </div>
            ))}
          </ArticleContainer>
        </ReactScroll>
      </ArticleMain>
    </Plate>
  );
}

export default Article;
