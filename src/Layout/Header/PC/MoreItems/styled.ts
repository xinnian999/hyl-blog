import { Icon } from "@/components";
import { Space } from "antd";
import styled from "styled-components";

export const MoreItemsWrapper = styled.div`
  display: flex;
  margin-left: 25px;
`;

export const MoreItemsGrid = styled.div`
  margin: 0 10px;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    height: 1.1em;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const IconFlag = styled(Icon)`
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  vertical-align: middle;
  padding: 0 5px;
  &:hover {
    color: var(--ant-primary-4);
  }
`;

export const UserWrapper = styled(Space)`
  color: #fff;
  line-height: 0;
  padding: 10px;
  display: block;
  width: 150px;
`;
