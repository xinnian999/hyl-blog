import { Divider, Space, Drawer } from "antd";
import { Anchor } from "@arco-design/web-react";
import { MenuFoldOutlined } from "@ant-design/icons";
import { TimeBar, PageCenter } from "@/components";
import { useParams } from "react-router-dom";
import { useScroll } from "ahooks";
import { UnorderedListOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { request, Time } from "@/utils";
import { useSetState, useMount, useWindowSize, useRequest } from "@/hooks";
import { Comment, Loading } from "@/components";
import Markdown from "./Markdown";
import { useRef } from "react";
import "./style.scss";

interface State {
  content: string;
  title: string;
  creatTime: string;
  updateTime: string;
  comments: any;
  anchorList: any;
  visits: number;
  targetOffset: any;
  drawerVisible: boolean;
  category: string;
  aboutArticle: any[];
}

function ArticleDetail() {
  const [
    {
      content,
      title,
      creatTime,
      visits,
      updateTime,
      anchorList,
      targetOffset,
      drawerVisible,
      aboutArticle,
    },
    setState,
  ] = useSetState<State>({
    content: "",
    title: "",
    creatTime: "",
    comments: [],
    anchorList: [],
    visits: 0,
    updateTime: "",
    category: "",
    targetOffset: undefined,
    drawerVisible: false,
    aboutArticle: [],
  });

  const params = useParams();
  const mdRef = useRef(null);
  const toolbarRef: any = useRef(null);
  const size = useWindowSize();

  const scrollNum = useScroll(document.querySelector("#container"));

  const [, , runGetAbout] = useRequest("/article/query", {
    method: "get",
    manual: true,
    progress: false,
  });

  useMount(() => {
    request
      .get("/article/queryDetail", { params: { id: params.id } })
      .then((res: any) => {
        setState(res.data[0]);
        document.title = `心 念 · ${res.data[0].title}`;

        // 生成锚点
        setTimeout(() => {
          let anchorList = Array.from(
            //@ts-ignore
            mdRef.current.children[0].querySelectorAll("h2,h3")
          );
          setState({ anchorList, targetOffset: window.innerHeight / 4 });
        });

        //查询相关文章
        runGetAbout({
          params: {
            pageNum: 1,
            pageSize: 5,
            filters: { publish: 1, category: res.data[0].category },
            orderBys: "topping desc,id desc",
          },
        }).then((res) => {
          setState({ aboutArticle: res.data });
        });
      });

    setTimeout(() => {
      request.put("/article/visit", { id: params.id });
    }, 3000);
  });

  const renderAnchor = () => {
    return (
      <Anchor
        className="anchorList"
        boundary={targetOffset}
        lineless
        affix={false}
      >
        {anchorList.map((item: { id: string; localName: string }) => {
          const { id, localName } = item;

          return (
            <Anchor.Link
              key={id}
              href={`#${id}`}
              title={id}
              className={localName === "h2" ? "oneAnchor" : "twoAnchor"}
            />
          );
        })}
      </Anchor>
    );
  };

  const showDrawer = () => {
    setState({ drawerVisible: true });
  };

  const onClose = () => {
    setState({ drawerVisible: false });
  };

  return (
    <PageCenter id="ArticleDetail">
      <div className="ArticleDetail">
        {/* 内容 */}
        <div className="time">
          <TimeBar time={creatTime} />
        </div>
        <div className="title">
          <span>{title}</span>
        </div>
        <Divider className="article-info">
          <Space size={25}>
            <small>作者：心念 </small>
            <small>阅读量：{visits}</small>
            <small>更新于 {new Time(updateTime).getStandardTime()}</small>
          </Space>
        </Divider>
        {content ? <Markdown content={content} ref={mdRef} /> : <Loading />}

        <Comment articleId={params.id} title="评论区" btnName="提交评论" />
      </div>

      {size.width > 800 ? (
        <div className="ArticleDetail-toolbar" ref={toolbarRef}>
          <div
            className={
              scrollNum && scrollNum.top > 200
                ? "ArticleDetail-toolbar-fixed"
                : ""
            }
          >
            <div
              className="ArticleDetail-toolbar-item"
              style={{ width: toolbarRef.current?.clientWidth }}
            >
              <div className="catalogue">
                <UnorderedListOutlined /> 本章目录
              </div>
              <Divider></Divider>
              <div className="Anchor">{renderAnchor()}</div>
            </div>

            <div
              className="ArticleDetail-toolbar-item"
              style={{ width: toolbarRef.current?.clientWidth }}
            >
              <div className="catalogue">
                <CheckSquareOutlined /> 相关阅读
              </div>
              <Divider></Divider>
              {aboutArticle.map(({ title, visits, comments, id }) => (
                <div className="aboutArticle-item" key={title}>
                  <div
                    className="aboutArticle-item-title"
                    onClick={() => window.open(`/article/${id}`, "_self")}
                  >
                    {title}
                  </div>
                  <div className="aboutArticle-item-info">
                    {comments}评论 | {visits}阅读
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="anchorFlag" onClick={showDrawer}>
          <MenuFoldOutlined />
        </div>
      )}

      <Drawer
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        width="60%"
      >
        <div className="anchorDrawer">{renderAnchor()}</div>
      </Drawer>
    </PageCenter>
  );
}
export default ArticleDetail;
