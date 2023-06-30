import styled from "styled-components";

export const FooterWrapper = styled.footer<{ pathname: string }>`
  padding: 30px 0;
  width: 100%;
  background-color: #fff;
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

  .main {
    width: var(--heart-width);
    margin: 0 auto;
    display: flex;
  }
`;

export const FooterLogo = styled.div`
  width: 300px;
  margin-right: 30px;
  h2 {
    font-family: "汉仪霹雳体简";
    color: #555;
  }

  .shortName {
    margin-top: 5px;
  }
  .introduce {
    margin-top: 20px;
    font-size: 12px;
  }
`;

export const Info = styled.ul`
  font-size: 13px;
  vertical-align: bottom;
  li {
    margin-top: 10px;
    /* text-align: center; */
  }
`;

export const QrCode = styled.ul`
  margin-left: auto;
  display: flex;
  li {
    margin-right: 20px;

    img {
      width: 100px;
      height: 100px;
    }
    text-align: center;
  }
`;
