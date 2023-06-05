import styled from "styled-components";

export const SetModalWrapper = styled.ul`
  position: relative;
  padding-top: 25px;
  li {
    margin-bottom: 15px;
    display: flex;
    h4 {
      flex: 0 0 25%;
      text-align: right;
    }
  }
  .themeItem {
    width: 50px;
    line-height: 50px;
    margin-right: 10px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  .tip {
    font-size: 12px;
    color: #999;
    margin-left: 5px;
  }

  .goAdmin {
    margin: 0 auto;
    margin-top: 20px;
  }
`;
