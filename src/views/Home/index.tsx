import { useRef } from "react";
import { Avatar, Button, Divider, Spin } from "antd";
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { useBoolean, useGetData } from "@/hooks";
import { Plate } from "@/components";
import ArticleCard from "./ArticleCard";
import {
  AlertBanner,
  ArticleContainer,
  HomeMain,
  HomeSide,
  HomeWrapper,
} from "./styled";
import BannerText from "./BannerText";
import Marquee from "react-fast-marquee";

function Article() {
  const { current } = useRef({
    pageNum: 1,
    category: "all",
    total: 10,
  });

  const [loading, on, off] = useBoolean();

  const [articleData, runQueryArticle] = useGetData<articleItem>(
    "/article/query",
    {
      progress: false,
      data: {
        pageNum: current.pageNum,
        pageSize: 9,
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

  return (
    <Plate bannerText={<BannerText />}>
      <AlertBanner
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            chatgpt暂时关闭，后续再重新开启
          </Marquee>
        }
      />
      <HomeWrapper>
        <HomeMain>
          <ArticleContainer className="ArticleContainer">
            {articleData.map((item) => (
              <div className="item">
                <ArticleCard {...item} key={item.id} />
              </div>
            ))}
            <Divider plain className="article-footer">
              {loading ? <Spin /> : <Button>点击加载更多</Button>}
            </Divider>
          </ArticleContainer>
        </HomeMain>
        <HomeSide>
          <div className="item">
            <div className="avatar">
              <Avatar
                size={100}
                src={require("@/assets/img/avatar/favicon.ico")}
              />
            </div>
            <div className="self">
              <p>下午好，我是心念</p>
              <p>一个99后前端工程师</p>
              <p>欢迎来到我的个人博客</p>
            </div>

            <ul className="links">
              <li>
                <QqOutlined />
              </li>
              <li>
                <WechatOutlined />
              </li>
              <li>
                <GithubOutlined />
              </li>
              <li>
                <WeiboOutlined />
              </li>
            </ul>
          </div>
        </HomeSide>
      </HomeWrapper>
    </Plate>
  );
}

export default Article;
