import "./style.scss";

function Footer() {
  return (
    <footer>
      <span className="AllRights">
        ©2021-2022 by <a href="https://motion.ant.design">心 念</a> All Rights
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
      </a>
    </footer>
  );
}

export default Footer;
