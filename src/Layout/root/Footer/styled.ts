import styled from "styled-components";

export const FooterWrapper = styled.footer<{ pathname: string }>`
  padding: 20px 0;
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
  }
`;

export const Info = styled.div`
  width: 25%;
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
