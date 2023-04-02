import { Icon } from "@/components";
import { List } from "antd";
import styled from "styled-components";

export const SearchWrapper = styled.div`
  margin: 0 20px;
  transition: 0.5s all;
  line-height: ${({ theme }) => (theme.scrollTop > 1 ? "55px" : "65px")};
  .icon {
    cursor: pointer;
    color: #fff;
    font-size: 20px;
    &:hover {
      color: var(--ant-primary-4);
    }
  }
`;

export const SearchFlag = styled(Icon)`
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  &:hover {
    color: var(--ant-primary-4);
  }
`;

export const SearchMain = styled.div`
  width: 650px;
  margin: 0 auto;
  .block {
    padding: 10px;
  }
  .hot {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    .hotItem {
      padding: 5px;
      background-color: var(--highlight-background-color);
      border-radius: 5px;
      margin: 0 10px 10px 0;
      &:last-child {
        margin-right: auto;
      }
    }
  }
`;

export const ListItem = styled(List.Item)`
  cursor: pointer;
  &:hover {
    background-color: var(--highlight-background-color);
  }
`;
