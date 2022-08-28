import { useEffect, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Divider, Space, Skeleton } from "antd";
import ReactScroll from "react-infinite-scroll-component";
import classnames from "classnames";
import { useScroll } from "ahooks";
import { useSetState } from "@/hooks";
import { PageCenter } from "@/components";
import { batchCopyDom } from "@/utils";
import { useRequest } from "@/hooks";
import Search from "./Search";
import ArticleCard from "./ArticleCard";
import "./style.scss";

interface State {
  articleData: any[];
  pageNum: number;
  total: number;
  category: any;
  fixedCateGory: boolean;
  hotArticleData: any[];
}

function Article() {
  const history = useNavigate();
  const [params] = useSearchParams();

  const [
    { articleData, total, category, fixedCateGory, hotArticleData },
    setState,
  ] = useSetState<State>({
    articleData: [],
    fixedCateGory: false,
    pageNum: 1,
    total: 10,
    category: params.get("category"),
    hotArticleData: [],
  });

  const [, , runQueryArticle] = useRequest("/article/query", {
    method: "get",
    manual: true,
    progress: false,
  });

  const [categoryData, setCategoryData] = useRequest("/category/query", {
    method: "get",
    progress: true,
    onSuccess: (res: any) => {
      setCategoryData([{ name: "all" }, ...res.data]);
    },
  });

  const ref = useRef(null) as any;

  const scrollNum = useScroll(document.querySelector("#container"));

  const queryArticle = () => {
    setState(({ category, pageNum, articleData }) => {
      runQueryArticle({
        params: {
          pageNum,
          pageSize: 5,
          filters:
            category === "all" ? { publish: 1 } : { publish: 1, category },
          orderBys: "topping desc,id desc",
        },
      }).then((res) => {
        setState({
          articleData: [...articleData, ...res.data],
          total: res.total,
          pageNum: pageNum + 1,
        });
      });
    });
  };

  useEffect(() => {
    queryArticle();
    runQueryArticle({
      params: {
        pageNum: 1,
        pageSize: 5,
        filters: { publish: 1 },
        orderBys: "visits desc",
      },
    }).then((res) => {
      setState({ hotArticleData: res.data });
    });
  }, []);

  useEffect(() => {
    if (scrollNum && scrollNum.top > 780) {
      setState({ fixedCateGory: true });
    } else {
      setState({ fixedCateGory: false });
    }
  }, [scrollNum]);

  const renderHotArticle = useMemo(
    () =>
      hotArticleData.map((item: { id: any; title: string }, index: number) => (
        <li
          className="hotArticle"
          onClick={() => history(`/article/${item.id}`)}
          key={item.title}
        >
          <div className={`index index${index + 1}`}>{index + 1}</div>
          <span>{item.title}</span>
        </li>
      )),
    [hotArticleData]
  );

  const paragraph = (
    <Space direction="vertical" className="skeleton" size={20}>
      {batchCopyDom(
        (key) => (
          <div className="skeletonItem" key={key}>
            <Skeleton.Image active className="skeletonItem-image" />
            <Skeleton paragraph={{ rows: 5 }} active round className="" />
          </div>
        ),
        3
      )}
    </Space>
  );

  return (
    <PageCenter>
      <div id="hall-main">
        <div className="article-list">
          <ReactScroll
            dataLength={articleData.length}
            next={queryArticle}
            hasMore={articleData.length < total}
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
        </div>

        <div className="article-toolbar-container" ref={ref}>
          <div
            className={classnames("article-toolbar ", {
              "category-fixed": fixedCateGory,
              animate__fadeInDownBig: fixedCateGory,
              animate__animated: fixedCateGory,
            })}
            style={{ width: ref.current?.clientWidth }}
          >
            <div className="article-toolbar-search">
              <Search
                giveData={(data: any) =>
                  setState({ articleData: data, total: -1 })
                }
              />
            </div>
            <ul className="article-toolbar-category">
              {categoryData.map(({ name }: any) => {
                return (
                  <li
                    key={name}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      history(`/article?category=${name}`);

                      setState({
                        category: name,
                        articleData: [],
                        pageNum: 1,
                      });
                      queryArticle();
                    }}
                    className={category === name ? "categoryActive" : ""}
                  >
                    <div>{name === "all" ? "全部" : name} </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {!fixedCateGory && (
            <ul className="article-toolbar-hot">
              <Divider>热门文章</Divider>
              {renderHotArticle}
            </ul>
          )}
        </div>
      </div>
    </PageCenter>
  );
}

export default Article;
