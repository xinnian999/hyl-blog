import styled from "styled-components";

export const ArticleDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Main = styled.div`
  border-radius: 10px;
  padding: 10px 20px;
  width: 75%;
  background-color: #fff;
`;

export const Toolbar = styled.div`
  width: 23%;
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
  padding: 15px;
  font-size: 15px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 25px;
  .catalogue {
    font-size: 18px;
  }
  .ant-divider-horizontal {
    margin: 10px auto;
  }
`;
