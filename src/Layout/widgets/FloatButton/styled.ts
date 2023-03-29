import styled from "styled-components";
import { Space } from "antd";

type FloatButtonWrapperProps = { windowWidth: number };

export const FloatButtonWrapper = styled(Space)<FloatButtonWrapperProps>`
  position: fixed;
  right: ${(props) => (props.windowWidth > 800 ? "10px;" : "5px")};
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 0;
  background-color: var(--background-color);
  border-radius: 10px 0 0 10px;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
  z-index: 12;
  .item {
    width: 40px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: var(--highlight-background-color);
    }
  }
`;

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
