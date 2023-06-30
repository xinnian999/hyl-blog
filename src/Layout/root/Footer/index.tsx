import { useLocation } from "react-router-dom";
import { FooterLogo, FooterWrapper, Info, QrCode } from "./styled";
import { Tag } from "antd";
import { useState } from "react";
import { useGetData, useMount } from "@/hooks";
import { time } from "hyl-utils";

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
      () =>
        setOnTime(time.duration("2022/6/1 10:00", new Date().toUTCString())),
      1000
    );

    return () => clearInterval(t);
  });

  return (
    <FooterWrapper pathname={pathname}>
      <div className="main">
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
            <Tag>{counts.find((item) => item.key === "visits")?.count}</Tag>
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
      </div>
    </FooterWrapper>
  );
}

export default Footer;
