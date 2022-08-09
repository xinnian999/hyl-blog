import { Anchor, Divider, Space, Drawer } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { TimeBar, PageCenter } from "@/components";
import { useParams } from "react-router-dom";
import { request } from "@/utils";
import { useSetState, useMount, useWindowSize } from "@/hooks";
import { Comment, Loading } from "@/components";
import Markdown from "./Markdown";
import { useRef } from "react";
import "./style.scss";
import selectText from "./selectText";

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
    },
    setState,
    getState,
  ] = useSetState<State>({
    content: "",
    title: "",
    creatTime: "",
    comments: [],
    anchorList: [],
    visits: 0,
    updateTime: "",
    targetOffset: undefined,
    drawerVisible: false,
  });

  const params = useParams();
  const mdRef = useRef(null);
  const size = useWindowSize();

  useMount(() => {
    request
      .get("/article/queryDetail", { params: { id: params.id } })
      .then((res: any) => {
        setState(res.data[0]);
        document.title = `心 念 · ${res.data[0].title}`;

        // 生成锚点
        getState(() => {
          let anchorList = Array.from(
            //@ts-ignore
            mdRef.current.children[0].querySelectorAll("h2,h3")
          );
          setState({ anchorList, targetOffset: window.innerHeight / 4 });
        });
      });
  });

  const renderAnchor = () => {
    return (
      <Anchor
        className="anchorList"
        targetOffset={targetOffset}
        // onChange={(currentActiveLink) => selectText(currentActiveLink)}
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
            <small>更新于 {updateTime}</small>
          </Space>
        </Divider>
        {content ? <Markdown content={content} ref={mdRef} /> : <Loading />}

        {/* 锚点 */}
        {size.width > 800 ? (
          <div className="Anchor">{renderAnchor()}</div>
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
        <Comment articleId={params.id} title="评论区" btnName="提交评论" />
      </div>
    </PageCenter>
  );
}
export default ArticleDetail;
