import styled from "styled-components";

const FooterWrapper = styled.footer`
  text-align: center;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #999;
  a {
    color: var(--ant-primary-color);
  }

  .AllRights {
    display: block;
  }

  .beianNumber {
    margin-right: 15px;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  @media screen and (max-width: 600px) {
    .icp,
    .beianNumber {
      display: block;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <span className="AllRights">
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
      </a>
    </FooterWrapper>
  );
}

export default Footer;
