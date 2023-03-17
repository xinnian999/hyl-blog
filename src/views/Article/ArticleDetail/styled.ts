import styled from "styled-components";

export const ArticleDetailMain = styled.div`
  background-color: var(--background-color);
  padding: 10px 20px;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
`;

export const AboutArticle = styled.div`
  max-height: 30vh;
  overflow: auto;

  .item {
    margin-bottom: 10px;
    &-title {
      cursor: pointer;
      &:hover {
        color: var(--ant-primary-color);
      }
    }
    &-info {
      color: #909090;
    }
  }
`;

export const ToolItem = styled.div`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 15px;
  box-shadow: var(--box-shadow);
  .catalogue {
    font-size: 18px;
  }
  .ant-divider-horizontal {
    margin: 10px auto;
  }
`;
