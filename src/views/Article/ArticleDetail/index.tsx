import { useEffect, useMemo, useRef } from "react";
import { Divider, Space, Drawer, Skeleton, Anchor, Tag } from "antd";
import { Icon, Plate } from "@/components";
import { useParams } from "react-router-dom";
import { classnames, time } from "hyl-utils";
import {
  UnorderedListOutlined,
  CheckSquareOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { changeBlogTitle, request } from "@/utils";
import {
  useSetState,
  useWindowSize,
  useGetData,
  useMount,
  useScroll,
  useBoolean,
} from "@/hooks";
import { Comment, Markdown } from "@/components";
import "./style.scss";

interface State {
  content: string;
  title: string;
  createTime: string;
  updateTime: string;
  comments: any;
  anchorList: any;
  visits: number;
  targetOffset: any;
  category: string;
  aboutArticle: any[];
}

function ArticleDetail() {
  const [
    {
      content,
      title,
      createTime,
      visits,
      updateTime,
      anchorList,
      targetOffset,
      aboutArticle,
      category,
    },
    setState,
  ] = useSetState<State>({
    content: "",
    title: "这是一个文章的标题",
    createTime: time.parse(new Date()),
    comments: [],
    anchorList: [],
    visits: 0,
    updateTime: time.parse(new Date()),
    category: "",
    targetOffset: undefined,
    aboutArticle: [],
  });

  const params = useParams();
  const mdRef: any = useRef(null);
  const ArticleDetailRef: any = useRef(null);
  const toolbarRef: any = useRef(null);
  const size = useWindowSize();

  const scrollNum = useScroll();

  const [drawerVisible, setTrue, setFalse] = useBoolean(false);

  useGetData("/article/queryDetail", {
    data: { id: params.id },
    onSuccess: (res) => {
      const [data] = res.data;

      setState(data);
      // 设置页面标题
      changeBlogTitle("", data.title);
      // 文章阅读量+1
      setTimeout(() => {
        request.put("/article/visit", {
          id: params.id,
          updateTime: time.parse(data.updateTime),
        });
      }, 3000);
      //查询相关文章
      runGetAbout({
        data: {
          pageNum: 1,
          pageSize: 6,
          filters: { publish: 1, category: data.category },
          orderBys: "topping desc,id desc",
        },
      }).then((res) => {
        setState({
          aboutArticle: res.data.filter(
            (item) => item.id !== Number(params.id)
          ),
        });
      });
    },
  });

  const [, runGetAbout] = useGetData("/article/query", {
    manual: true,
    progress: false,
  });

  useEffect(() => {
    if (mdRef.current) {
      //生成锚点
      setState({
        anchorList: [...mdRef.current.children[0].querySelectorAll("h2,h3")],
        targetOffset: window.innerHeight / 4,
      });
    }
  }, [mdRef.current]);

  useMount(() => {
    window.addEventListener("scroll", () => {
      const anchorListEl = document.querySelector(
        ".ant-anchor-link-title-active"
      );
      anchorListEl?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  });

  const renderAnchor = useMemo(
    () => (
      <div
        className="ArticleDetail-toolbar-item"
        style={{ width: toolbarRef.current?.clientWidth }}
      >
        <div className="catalogue">
          <UnorderedListOutlined /> 本章目录
        </div>
        <Divider></Divider>
        <Anchor
          targetOffset={targetOffset}
          affix={false}
          className="anchorList"
          style={{ maxHeight: "30vh" }}
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
      </div>
    ),
    [anchorList]
  );

  const renderAboutArticle = useMemo(
    () => (
      <div
        className="ArticleDetail-toolbar-item  box-shadow"
        style={{ width: toolbarRef.current?.clientWidth }}
      >
        <div className="catalogue">
          <CheckSquareOutlined /> 相关阅读
        </div>
        <Divider></Divider>
        <div className="aboutArticle">
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
    ),
    [aboutArticle]
  );

  return (
    <>
      <Plate
        title={title}
        bg="bg7.jpg"
        autograph={
          <Space
            size={20}
            direction={size.width > 800 ? "horizontal" : "vertical"}
          >
            <span>
              {category.split(",").map((item: string) => (
                <Tag
                  icon={<Icon type="icon-biaoqian2" />}
                  color="pink"
                  key={item}
                >
                  {item}
                </Tag>
              ))}
            </span>
            <span>
              <Icon type="icon-fabu" /> 发布日期：
              {time.parse(createTime, "YYYY-MM-DD")}
            </span>
            <span>
              <Icon type="icon-banbengengxin" /> 更新日期：
              {time.parse(updateTime, "YYYY-MM-DD")}
            </span>
            <span>
              <Icon type="icon-word" /> 文章字数：
              {content.length > 1000
                ? `${~~(content.length / 100) / 10}k`
                : content.length}
            </span>
          </Space>
        }
      ></Plate>
      <div className="ArticleDetail center" ref={ArticleDetailRef}>
        <div className="detail box-shadow">
          <Skeleton loading={!content} paragraph={{ rows: 30 }}>
            <Markdown content={content} ref={mdRef} />
          </Skeleton>
          <Comment articleId={params.id} title="评论区" btnName="提交评论" />
        </div>

        {size.width > 800 ? (
          <div className="ArticleDetail-toolbar" ref={toolbarRef}>
            <div
              className={classnames({
                "ArticleDetail-toolbar-fixed":
                  scrollNum.top > 490 && "ArticleDetail-toolbar-fixed",
              })}
            >
              {renderAnchor}
              {renderAboutArticle}
            </div>
          </div>
        ) : (
          <div className="anchorFlag" onClick={setTrue}>
            <MenuFoldOutlined />
          </div>
        )}

        <Drawer
          placement="right"
          onClose={setFalse}
          open={drawerVisible}
          width="60%"
          getContainer={() => document.getElementById("main")!}
        >
          <div className="anchorDrawer">{renderAnchor}</div>
        </Drawer>
      </div>
    </>
  );
}
export default ArticleDetail;
