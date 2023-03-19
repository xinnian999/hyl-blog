import { useMemo, useRef } from "react";
import { Divider, Space, Skeleton, Spin } from "antd";
import { classnames } from "hyl-utils";
import ReactScroll from "react-infinite-scroll-component";
import { useGetData } from "@/hooks";
import { Plate } from "@/components";
import { batchCopyDom } from "@/utils";
import Search from "./Search/index";
import ArticleCard from "./ArticleCard";
import { ArticleMain, ArticleSkeleton, ArticleCategory } from "./styled";

function Article() {
  const { current } = useRef({
    pageNum: 1,
    category: "all",
    total: 10,
  });

  const [categoryData] = useGetData<categoryItem>("/category/query", {
    data: {},
  });

  const [articleData, runQueryArticle, setArticleData] =
    useGetData<articleItem>("/article/query", {
      progress: false,
      data: {
        pageNum: current.pageNum,
        pageSize: 5,
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
    });

  const articleList = useMemo(() => {
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

    if (articleData.length) {
      return (
        <ReactScroll {...reactScrollProps}>
          <Space size={25} direction="vertical" style={{ width: "100%" }}>
            {articleData.map((item) => (
              <ArticleCard {...item} key={item.id} />
            ))}
          </Space>
        </ReactScroll>
      );
    }

    return (
      <Space style={{ width: "100%" }} direction="vertical" size={20}>
        {batchCopyDom(
          () => (
            <ArticleSkeleton>
              <Skeleton.Image active className="image" />
              <Skeleton paragraph={{ rows: 5 }} active round />
            </ArticleSkeleton>
          ),
          3
        )}
      </Space>
    );
  }, [articleData]);

  const categoryClick = (name) => {
    window.scrollTo(0, 450);
    current.category = name;
    current.pageNum = 1;
    setArticleData([]);

    runQueryArticle({
      data: {
        pageNum: 1,
        pageSize: 5,
        filters:
          current.category === "all"
            ? { publish: 1 }
            : { publish: 1, category: name },
        orderBys: "topping desc,id desc",
      },
    });
  };

  return (
    <Plate
      title="文章"
      autograph="人是要整活的——没活了，可不就是死了么 "
      bg="bg18.jpg"
    >
      <ArticleMain>{articleList}</ArticleMain>
      <Plate.Toolbar>
        <ArticleCategory>
          <div className="search">
            <Search
              giveData={(data: articleItem[]) => {
                setArticleData(data);
                current.total = -1;
              }}
            />
          </div>
          <ul className="categoryList">
            {[{ name: "all", id: 0 }, ...categoryData].map(({ name }) => (
              <li
                key={name}
                onClick={() => categoryClick(name)}
                className={classnames({
                  active: current.category === name,
                })}
              >
                {name === "all" ? "全部" : name}
              </li>
            ))}
          </ul>
        </ArticleCategory>
      </Plate.Toolbar>
    </Plate>
  );
}

export default Article;
