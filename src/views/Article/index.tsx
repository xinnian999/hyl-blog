import { useRef } from "react";
import { Divider, Space, Skeleton, Spin } from "antd";
import { classnames } from "hyl-utils";
import ReactScroll from "react-infinite-scroll-component";
import { useWindowSize, useGetData, useScroll } from "@/hooks";
import { Plate, Drawer } from "@/components";
import { batchCopyDom } from "@/utils";
import Search from "./Search";
import ArticleCard from "./ArticleCard";
import "./style.scss";

function Article() {
  const toobarRef = useRef(null) as any;

  const { current } = useRef({
    pageNum: 1,
    category: "all",
    total: 10,
  });

  const scrollNum = useScroll()!;

  const size = useWindowSize();

  const [categoryData] = useGetData("/category/query", {
    mockLoadingCount: 7,
    data: {},
  });

  const [articleData, runQueryArticle, setArticleData] = useGetData(
    "/article/query",
    {
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
    }
  );

  const categoryClick = (name) => {
    window.scrollTo(0, 500);
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

  const Toolbar = (
    <div className="article-toolbar-container box-shadow" ref={toobarRef}>
      <div
        className={classnames("article-toolbar ", {
          "category-fixed": scrollNum?.top > 490,
        })}
        style={{ width: toobarRef.current?.clientWidth }}
      >
        <div className="article-toolbar-search">
          <Search
            giveData={(data: any) => {
              setArticleData(data);
              current.total = -1;
            }}
          />
        </div>
        <ul className="article-toolbar-category">
          {[{ name: "all" }, ...categoryData].map(
            ({ name, loading, id }: any) => {
              if (loading)
                return (
                  <Skeleton.Input
                    key={id}
                    className="article-toolbar-category-item"
                    active
                  />
                );
              return (
                <li
                  key={name}
                  onClick={() => categoryClick(name)}
                  className={classnames("article-toolbar-category-item", {
                    categoryActive: current.category === name,
                  })}
                >
                  <div>{name === "all" ? "全部" : name} </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <Plate
        title="文章"
        autograph="人是要整活的——没活了，可不就是死了么？"
        bg="bg18.jpg"
      />
      <div id="article" className="center">
        <div className="article-list">
          {articleData.length ? (
            <ReactScroll
              scrollThreshold={0.95}
              dataLength={articleData.length}
              next={() =>
                runQueryArticle({
                  cache: true,
                })
              }
              hasMore={articleData.length < current.total}
              loader={
                <Divider plain className="article-footer">
                  <Spin />
                </Divider>
              }
              endMessage={
                <Divider plain className="article-footer">
                  没有更多文章了 ---- 🤐
                </Divider>
              }
            >
              <Space direction="vertical" className="listStyle">
                {articleData.map((item: any) => (
                  <span key={item.title}>
                    <ArticleCard data={item} />
                  </span>
                ))}
              </Space>
            </ReactScroll>
          ) : (
            <Space direction="vertical" className="skeleton" size={20}>
              {batchCopyDom(
                () => (
                  <div className="skeletonItem">
                    <Skeleton.Button active className="skeletonItem-image" />
                    <Skeleton
                      paragraph={{ rows: 5 }}
                      active
                      round
                      className=""
                    />
                  </div>
                ),
                5
              )}
            </Space>
          )}
        </div>

        {size.width > 800 ? (
          Toolbar
        ) : (
          <Drawer className="toolbarFlag box-shadow" placement="right">
            {Toolbar}
          </Drawer>
        )}
      </div>
    </>
  );
}

export default Article;
