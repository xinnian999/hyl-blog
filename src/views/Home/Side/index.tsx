import { Avatar, Affix, Tooltip } from "antd";
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { HomeSideWrapper, LinkImage, SideItem } from "./styled";
import { useGetData } from "@/hooks";
import { time } from "hyl-utils";

const days = [
  "星期天",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

const myLinks = [
  {
    icon: <QqOutlined />,
    tip: <LinkImage src={require("@/assets/img/about/qqQrCode.png")} />,
  },
  {
    icon: <WechatOutlined />,
    tip: <LinkImage src={require("@/assets/img/about/weixin.jpg")} />,
  },
  {
    icon: <GithubOutlined />,
    tip: "https://github.com/xinnian999",
    onClick: () => window.open("https://github.com/xinnian999"),
  },
  {
    icon: <WeiboOutlined />,
    tip: "https://weibo.com/mind251314",
    onClick: () => window.open("https://weibo.com/mind251314"),
  },
];

function Side() {
  const [tag] = useGetData("/category/query", {
    data: { orderBys: "count desc" },
  });

  const [weather] = useGetData("/all/getWeather");

  const [counts] = useGetData("/all/counts");

  return (
    <HomeSideWrapper>
      <SideItem>
        <div className="avatar">
          <Avatar size={100} src={require("@/assets/img/avatar/favicon.ico")} />
        </div>
        <div className="self">
          <p>下午好，我是心念</p>
          <p>一个99后前端工程师</p>
          <p>欢迎来到我的个人博客</p>
        </div>

        <ul className="links">
          {myLinks.map(({ icon, tip, onClick }) => (
            <li onClick={onClick}>
              <Tooltip overlay={tip}>
                <div>{icon}</div>
              </Tooltip>
            </li>
          ))}
        </ul>
      </SideItem>

      <SideItem>
        <ul className="statistics">
          {counts.map((item) => (
            <li>
              <p>{item.name}</p>
              <h3>{item.count}</h3>
            </li>
          ))}
        </ul>
      </SideItem>

      <SideItem>
        <ul className="date">
          <li>今日</li>
          <li>{time.parse(new Date(), "YYYY年MM月DD日")}</li>
          <li>{days[new Date().getDay()]}</li>

          {weather.length ? (
            <li>
              {weather[0].province} {weather[0].temperature}°C{" "}
              {weather[0].weather}
            </li>
          ) : null}
        </ul>
        <img
          className="gif"
          src={require("@/assets/img/601d53f2cab22185a59b3fc9707b79e9.gif")}
        />

        <p className="lastWeek">
          {new Date().getDay() !== 6 && new Date().getDay() !== 0
            ? `再坚持${5 - new Date().getDay()}天就到周末啦！`
            : "周末啦嗨起来(｡･∀･)ﾉﾞ"}
        </p>
      </SideItem>

      <Affix offsetTop={80}>
        <SideItem>
          <ul className="tags">
            {tag.map((item) => {
              return (
                <li className="tag" key={item.name}>
                  {item.name} <span className="count">{item.count}</span>
                </li>
              );
            })}
          </ul>
        </SideItem>
      </Affix>
    </HomeSideWrapper>
  );
}

export default Side;
