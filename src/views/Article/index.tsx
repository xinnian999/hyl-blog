import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Space, Skeleton } from "antd";
import ReactScroll from "react-infinite-scroll-component";
import classnames from "classnames";
import { useScroll } from "ahooks";
import { useSetState } from "@/hooks";
import { PageCenter } from "@/components";
import { request, batchCopyDom } from "@/utils";
import { useRequest } from "@/hooks";
import Search from "./Search";
import ArticleCard from "./ArticleCard";
import "./style.scss";

interface State {
  articleData: any[];
  pageNum: number;
  count: number;
  category: any;
  fixedCateGory: boolean;
}

function Article() {
  const [{ articleData, count, category, fixedCateGory }, setState, getState] =
    useSetState<State>({
      articleData: [],
      fixedCateGory: false,
      pageNum: 1,
      count: 10,
      category: "全部",
    });

  const [hotArticleData] = useRequest("/article/query", {
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 5,
      filters: { publish: 1 },
      orderBys: "visits desc",
    },
  });

  const [categoryData, setCategoryData] = useRequest("/category/query", {
    method: "get",
    onSuccess: (res: any) => {
      setCategoryData([{ name: "全部" }, ...res.data]);
    },
  });

  const ref = useRef(null) as any;

  const scrollNum = useScroll(document.querySelector("#container"));

  const history = useNavigate();

  const queryArticle = () =>
    getState(({ category, pageNum, articleData }: any) => {
      request
        .get("/article/query", {
          params: {
            pageNum,
            pageSize: 5,
            filters:
              category === "全部" ? { publish: 1 } : { publish: 1, category },
            orderBys: "topping desc,id desc",
          },
        })
        .then((res) => {
          setState({
            articleData: [...articleData, ...res.data],
            count: res.total,
          });
        });
      setState({ pageNum: pageNum + 1 });
    });

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

  const renderCategory = categoryData.map(({ name }: any) => {
    return (
      <li
        key={name}
        onClick={() => {
          window.scrollTo(0, 0);
          setState({
            category: name,
            articleData: [],
            pageNum: 1,
          });
          queryArticle();
        }}
        className={category === name ? "categoryActive" : ""}
      >
        <div>{name} </div>
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

  const categoryStyle = { width: ref.current?.clientWidth };

  const categoryClass = classnames("article-toolbar ", {
    "category-fixed": fixedCateGory,
    animate__fadeInDownBig: fixedCateGory,
    animate__animated: fixedCateGory,
  });

  const giveData = (data: any) => setState({ articleData: data, count: -1 });

  return (
    <PageCenter>
      <div id="hall-main">
        <div className="article-list">
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
