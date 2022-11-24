import { useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Divider, Space, Skeleton } from "antd";
import { Drawer } from "@arco-design/web-react";
import ReactScroll from "react-infinite-scroll-component";
import classnames from "classnames";
import { useBoolean, useScroll } from "ahooks";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useSetState, useWindowSize, useRequest } from "@/hooks";
import { PageCenter } from "@/components";
import { batchCopyDom } from "@/utils";
import Search from "./Search";
import ArticleCard from "./ArticleCard";
import "./style.scss";

interface State {
  pageNum: number;
  total: number;
  category: any;
  fixedCateGory: boolean;
}

let pageNum = 1;
let category = "all";

function Article() {
  const history = useNavigate();

  const [params] = useSearchParams();

  const toobarRef = useRef(null) as any;

  const scrollNum = useScroll();

  const size = useWindowSize();

  const [drawerVisible, { setTrue, setFalse }] = useBoolean(false);

  const [{ total, ...state }, setState] = useSetState<State>({
    fixedCateGory: false,
    pageNum: 1,
    total: 10,
    category: params.get("category"),
  });

  const [articleData, runQueryArticle, setArticleData] = useRequest(
    "/article/query",
    {
      params: {
        pageNum,
        pageSize: 5,
        filters: category === "all" ? { publish: 1 } : { publish: 1, category },
        orderBys: "topping desc,id desc",
      },
      progress: false,
      onSuccess(res) {
        setState({
          total: res.total,
        });
        pageNum = pageNum + 1;
      },
    }
  );

  const [hotArticleData] = useRequest("/article/query", {
    progress: false,
    params: {
      pageNum: 1,
      pageSize: 5,
      filters: { publish: 1 },
      orderBys: "visits desc",
    },
  });

  const [categoryData] = useRequest("/category/query", {
    method: "get",
  });

  const queryArticle = (cache) => {
    console.log(articleData.length, total);

    runQueryArticle({
      cache,
      params: {
        pageNum,
        pageSize: 5,
        filters: category === "all" ? { publish: 1 } : { publish: 1, category },
        orderBys: "topping desc,id desc",
      },
    });
  };

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
        () => (
          <div className="skeletonItem">
            <Skeleton.Image active className="skeletonItem-image" />
            <Skeleton paragraph={{ rows: 5 }} active round className="" />
          </div>
        ),
        3
      )}
    </Space>
  );

  const fixedCateGory = scrollNum && scrollNum.top > 780;

  const Toolbar = (
    <div className="article-toolbar-container" ref={toobarRef}>
      <div
        className={classnames("article-toolbar ", {
          "category-fixed": fixedCateGory,
          animate__fadeInDownBig: fixedCateGory,
          animate__animated: fixedCateGory,
        })}
        style={{ width: toobarRef.current?.clientWidth }}
      >
        <div className="article-toolbar-search">
          <Search
            giveData={(data: any) => {
              setArticleData(data);
              setState({ total: -1 });
            }}
          />
        </div>
        <ul className="article-toolbar-category">
          {[{ name: "all" }, ...categoryData].map(({ name }: any) => {
            return (
              <li
                key={name}
                onClick={() => {
                  window.scrollTo(0, 0);
                  history(`/article?category=${name}`);
                  // setArticleData([]);

                  category = name;
                  pageNum = 1;

                  queryArticle(false);
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
  );

  return (
    <PageCenter>
      <div id="hall-main">
        <div className="article-list">
          <ReactScroll
            dataLength={articleData.length}
            next={() => queryArticle(true)}
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
        {size.width > 800 ? (
          Toolbar
        ) : (
          <div className="toolbarFlag" onClick={setTrue}>
            <MenuFoldOutlined />
          </div>
        )}

        <Drawer
          placement="right"
          onCancel={setFalse}
          visible={drawerVisible}
          width="60%"
          footer={null}
          title={null}
          className="drawer-toolbar"
          unmountOnExit
        >
          {Toolbar}
        </Drawer>
      </div>
    </PageCenter>
  );
}

export default Article;
