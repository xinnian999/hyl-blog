import styled from "styled-components";
import { Space } from "antd";

export const FloatButtonWrapper = styled(Space)`
  position: fixed;
  /* right: ${({ theme }) => (theme.isMoblie ? 0 : "10px")}; */
  right: 0;
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
