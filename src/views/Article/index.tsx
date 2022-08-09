import { useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Space, Skeleton } from "antd";
import ReactScroll from "react-infinite-scroll-component";
import classnames from "classnames";
import { useScroll } from "ahooks";
import { useSetState } from "@/hooks";
import { PageCenter } from "@/components";
import { request } from "@/utils";
import { useRequest } from "@/hooks";
import ArticleCard from "./ArticleCard";
import "./style.scss";
import Search from "./Search";

interface State {
  articleData: any[];
  pageNum: number;
  count: number;
  categoryActive: any;
  fixedCateGory: boolean;
}

function Article() {
  const [hotArticleData] = useRequest("/article/queryHot");

  const [categoryData, setCategoryData] = useRequest("/category/query", {
    method: "get",
    onSuccess: (res: any) => {
      setCategoryData([{ name: "all" }, ...res.data]);
    },
  });

  const [
    { articleData, count, categoryActive, fixedCateGory },
    setState,
    getState,
  ] = useSetState<State>({
    articleData: [],
    fixedCateGory: false,
    pageNum: 1,
    count: 10,
    categoryActive: "all",
  });

  const ref = useRef(null) as any;

  const scrollNum = useScroll(document.querySelector("#container"));

  const history = useNavigate();

  const queryArticle = useCallback(
    () =>
      getState(({ categoryActive, pageNum, articleData }: any) => {
        request
          .get("/article/query", {
            params: {
              category: categoryActive,
              pageNum,
              pageSize: 5,
            },
          })
          .then((res: any) => {
            setState({
              articleData: [...articleData, ...res.data],
              count: res.total,
            });
          });
        setState({ pageNum: pageNum + 1 });
      }),
    []
  );

  useEffect(() => {
    queryArticle();
  }, []);

  useEffect(() => {
    if (scrollNum && scrollNum.top > 780) {
      setState({ fixedCateGory: true });
    } else {
      setState({ fixedCateGory: false });
    }
  }, [scrollNum]);

  const renderArticle = articleData.map((item: any) => (
    <span key={item.title}>
      <ArticleCard data={item} />
    </span>
  ));

  const renderCategory = categoryData.map(({ name, count }: any) => {
    return (
      <li
        key={name}
        onClick={() => {
          window.scrollTo(0, 0);
          setState({
            categoryActive: name,
            articleData: [],
            pageNum: 1,
          });
          queryArticle();
        }}
        className={categoryActive === name ? "categoryActive" : ""}
      >
        <div>{name === "all" ? `全部` : name} </div>
      </li>
    );
  });

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

  const paragraph = <Skeleton avatar paragraph={{ rows: 3 }} active />;

  const categoryStyle = { width: ref.current?.clientWidth };

  const categoryClass = classnames("article-toolbar ", {
    "category-fixed": fixedCateGory,
    animate__fadeInDownBig: fixedCateGory,
    animate__animated: fixedCateGory,
  });

  const giveData = (data: any) => setState({ articleData: data, count: 1 });

  return (
    <PageCenter>
      <div id="hall-main">
        <div className="article-list">
          {articleData.length ? (
            <ReactScroll
              dataLength={articleData.length}
              next={queryArticle}
              hasMore={articleData.length < count}
              loader={paragraph}
              endMessage={
                <Divider plain className="article-footer">
                  没有更多文章了 ---- 🤐{" "}
                </Divider>
              }
            >
              <Space direction="vertical" className="listStyle">
                {renderArticle}
              </Space>
            </ReactScroll>
          ) : (
            paragraph
          )}
        </div>

        <div className="article-toolbar-container" ref={ref}>
          <div className={categoryClass} style={categoryStyle}>
            <div className="article-toolbar-search">
              <Search giveData={giveData} />
            </div>
            <ul className="article-toolbar-category">{renderCategory}</ul>
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
