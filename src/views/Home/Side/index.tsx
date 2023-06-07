import { Avatar, Affix } from "antd";
import {
  QqOutlined,
  WechatOutlined,
  GithubOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import { HomeSideWrapper } from "./styled";
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

function Side() {
  const [tag] = useGetData("/category/query", {
    data: { orderBys: "count desc" },
  });

  const [weather] = useGetData("/all/getWeather");

  return (
    <HomeSideWrapper>
      <div className="item">
        <div className="avatar">
          <Avatar size={100} src={require("@/assets/img/avatar/favicon.ico")} />
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

      <div className="item">
        <ul className="statistics">
          <li>
            <p>文章</p>
            <h3>56</h3>
          </li>
          <li>
            <p>作品</p>
            <h3>60</h3>
          </li>
          <li>
            <p>用户</p>
            <h3>25</h3>
          </li>
          <li>
            <p>总访问量</p>
            <h3>16855</h3>
          </li>
        </ul>
      </div>

      <div className="item">
        <ul className="date">
          <li>今日</li>
          <li>{time.parse(new Date(), "YYYY年MM月DD日")}</li>
          <li>{days[new Date().getDay()]}</li>

          {weather.length && (
            <li>
              {weather[0].province} {weather[0].temperature}°C{" "}
              {weather[0].weather}
            </li>
          )}
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
      </div>

      <Affix offsetTop={80}>
        <div className="item">
          <ul className="tags">
            {tag.map((item) => {
              return (
                <li className="tag">
                  {item.name} <span className="count">{item.count}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Affix>
    </HomeSideWrapper>
  );
}

export default Side;
