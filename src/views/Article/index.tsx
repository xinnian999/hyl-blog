import { useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Divider, Space, Skeleton, Drawer } from "antd";
import ReactScroll from "react-infinite-scroll-component";
import { MenuFoldOutlined } from "@ant-design/icons";
import {
  useWindowSize,
  useGetData,
  useMount,
  useRedux,
  useBoolean,
  useScroll,
} from "@/hooks";
import { Plate } from "@/components";
import { batchCopyDom, request } from "@/utils";
import Search from "./Search";
import ArticleCard from "./ArticleCard";
import "./style.scss";
import { classnames } from "hyl-utils";

function Article() {
  const history = useNavigate();

  const { dispatchAll } = useRedux();

  const [params] = useSearchParams();

  const toobarRef = useRef(null) as any;

  const { current } = useRef({
    pageNum: 1,
    category: params.get("category"),
    total: 10,
  });

  const scrollNum = useScroll()!;

  const size = useWindowSize();

  const [drawerVisible, on, off] = useBoolean(false);

  useMount(() => {
    if (params.get("getUserInfo")) {
      request.get("/qq/getLoginStatus").then((res: any) => {
        dispatchAll([
          {
            type: "CHANGE_LOGIN_STATE",
            payload: true,
          },
          {
            type: "CHANGE_USER_INFO",
            payload: res,
          },
          { type: "CHANGE_LOGIN_MODAL", payload: false },
        ]);
      });
    }
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

  const [categoryData] = useGetData("/category/query", {
    mockLoadingCount: 7,
    data: {},
  });

  const paragraph = (
    <Space direction="vertical" className="skeleton" size={20}>
      {batchCopyDom(
        () => (
          <div className="skeletonItem">
            <Skeleton.Button active className="skeletonItem-image" />
            <Skeleton paragraph={{ rows: 5 }} active round className="" />
          </div>
        ),
        5
      )}
    </Space>
  );

  const Toolbar = (
    <div className="article-toolbar-container box-shadow" ref={toobarRef}>
      <div
        className={classnames("article-toolbar ", {
          "category-fixed": scrollNum?.top > 390,
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
                  onClick={() => {
                    window.scrollTo(780, 0);
                    history(`/article?category=${name}`);
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
                  }}
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
        bg="bg7.jpg"
      />
      <div id="article" className="center">
        <div className="article-list">
          {articleData.length ? (
            <ReactScroll
              scrollThreshold={0.65}
              dataLength={articleData.length}
              next={() =>
                runQueryArticle({
                  cache: true,
                })
              }
              hasMore={articleData.length < current.total}
              loader={paragraph}
              endMessage={
                <Divider plain className="article-footer">
                  <span className="shadowText">没有更多文章了</span> ---- 🤐
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
            paragraph
          )}
        </div>

        {size.width > 800 ? (
          Toolbar
        ) : (
          <div className="toolbarFlag box-shadow" onClick={on}>
            <MenuFoldOutlined />
          </div>
        )}

        <Drawer
          placement="right"
          onClose={off}
          open={drawerVisible}
          width="60%"
          footer={null}
          title={null}
          destroyOnClose
          getContainer={() => document.getElementById("main")!}
        >
          {Toolbar}
        </Drawer>
      </div>
    </>
  );
}

export default Article;
