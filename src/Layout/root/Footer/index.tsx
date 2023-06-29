import { useLocation } from "react-router-dom";
import { FooterWrapper, Info } from "./styled";

function Footer() {
  const { pathname } = useLocation();

  return (
    <FooterWrapper pathname={pathname}>
      {/* <span className="AllRights">
        ©2021-2023 by <a href="https://motion.ant.design">心 念</a> All Rights
        Reserved
      </span>
      <a
        className="beianNumber"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13028102000185"
      >
        <img src={require("@/assets/img/备案图标.png")} />
        冀公网安备 13028102000185号
      </a>
      <a href="https://beian.miit.gov.cn/" className="icp">
        京ICP备2021033841号-2
      </a> */}
      <div className="main">
        <Info>
          <h2>{globalConfig.title}</h2>
          <div className="shortName">constantly thinking of</div>
          <div className="introduce">
            心念个人站点，记录生活的瞬间，分享学习的心得以及日常工作学习中遇到的问题和处理的方法。以网站建设、Linux、网站优化、程序代码、读书笔记、博客心得、心情随笔、佳文分享、个人兴趣爱好内容为主。
          </div>
        </Info>
      </div>
    </FooterWrapper>
  );
}

export default Footer;
