import { List } from "antd";
import styled from "styled-components";

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
