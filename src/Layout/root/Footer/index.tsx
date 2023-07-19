import { useLocation } from "react-router-dom";
import { Bottom, FooterLogo, FooterWrapper, Info, QrCode, Top } from "./styled";
import { Tag } from "antd";
import { useState } from "react";
import { useGetData, useMount } from "@/hooks";
import { time } from "hyl-utils";

const topData = [
  {
    title: "推荐",
    children: [
      {
        title: "博客魔改",
      },
      {
        title: "听听音乐",
      },
      {
        title: "玩个游戏",
      },
      {
        title: "个人笔记",
      },
    ],
  },
  {
    title: "生活",
    children: [
      {
        title: "日常哔哔",
      },
      {
        title: "视频剪辑",
      },
      {
        title: "年度影集",
      },
      {
        title: "音乐列表",
      },
    ],
  },
  {
    title: "网站",
    children: [
      {
        title: "留言信箱",
      },
      {
        title: "博客打赏",
      },
      {
        title: "博客统计",
      },
      {
        title: "更新日志",
      },
    ],
  },
  {
    title: "导航",
    children: [
      {
        title: "个人主页",
      },
      {
        title: "友情链接",
      },
      {
        title: "朋友圈",
      },
      {
        title: "个人作品",
      },
    ],
  },
  {
    title: "协议",
    children: [
      {
        title: "隐私协议",
      },
      {
        title: "版权协议",
      },
      {
        title: "说明",
      },
    ],
  },
];

function Footer() {
  const { pathname } = useLocation();

  const [counts] = useGetData("/all/counts");

  const [onTime, setOnTime] = useState({
    second: 0,
    minute: 0,
    hour: 0,
    day: 0,
    month: 0,
    year: 0,
  });

  useMount(() => {
    const t = setInterval(
      () => setOnTime(time.duration("2022/6/1 10:00")),
      1000
    );

    return () => clearInterval(t);
  });

  return (
    <FooterWrapper pathname={pathname} id="Footer" className="footer">
      <Top>
        {topData.map(({ title, children }) => {
          return (
            <li key={title}>
              <h3>{title}</h3>
              <ul>
                {children.map((item) => (
                  <li key={item.title}>
                    <span className="item">{item.title}</span>{" "}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </Top>
      <Bottom>
        <FooterLogo>
          <h2>{globalConfig.title}</h2>
          <div className="shortName">constantly thinking of</div>
          <div className="introduce">
            心念个人站点，记录生活的瞬间，分享学习的心得以及日常工作学习中遇到的问题和处理的方法。以网站建设、Linux、网站优化、程序代码、读书笔记、博客心得、心情随笔、佳文分享、个人兴趣爱好内容为主。
          </div>
        </FooterLogo>
        <Info>
          <li>
            总访问量：
            {counts.find((item) => item.key === "visits")?.count}
          </li>

          <li>
            ©2021-2023 by <a href="https://motion.ant.design">心念</a> All
            Rights Reserved
          </li>
          <li>
            <b>网站已勉强运行：</b>
            <Tag>{`${onTime.year}年 ${onTime.month}个月 ${onTime.day}天 ${onTime.hour}小时 ${onTime.minute}分钟 ${onTime.second}秒`}</Tag>
          </li>
          <li>
            <a
              className="beianNumber"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13028102000185"
            >
              <img src={require("@/assets/img/备案图标.png")} />
              冀公网安备 13028102000185号
            </a>
            <a href="https://beian.miit.gov.cn/" className="icp">
              京ICP备2021033841号-2
            </a>
          </li>
        </Info>
        <QrCode>
          <li>
            <img src={require("@/assets/img/about/qq.jpg")} />
            <p>QQ</p>
          </li>
          <li>
            <img src={require("@/assets/img/about/wei.jpg")} />
            <p>微信</p>
          </li>
        </QrCode>
      </Bottom>
    </FooterWrapper>
  );
}

export default Footer;
