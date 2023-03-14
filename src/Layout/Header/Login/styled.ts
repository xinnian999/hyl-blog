import styled from "styled-components";

export const ToolLoginBar = styled.div`
  padding: 0 20px;
  text-align: center;
  .qqLogin {
    cursor: pointer;
    margin-right: 15px;
  }
  .wxLogin {
    cursor: pointer;
  }
`;

export const WxLoginWrapper = styled.div`
  .wxQrCode {
    img {
      width: 200px;
      height: 200px;
      display: block;
      margin: 0 auto;
      margin-top: 15px;
    }
  }

  .wxHeader {
    margin: 20px 0;
    .wxHeader-back {
      font-size: 20px;
    }
    h2 {
      display: inline-block;
      margin-left: 10px;
      color: #555;
    }
  }
`;
