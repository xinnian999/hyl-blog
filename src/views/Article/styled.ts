import styled from "styled-components";

export const ArticleSkeleton = styled.div`
  display: flex;
  height: 220px;
  background-color: var(--background-color);
  padding: 15px;
  border-radius: 10px;
  .image {
    width: 250px !important;
    height: 100% !important;
    margin-right: 10px;
  }
`;

export const ArticleToolbar = styled.div`
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--background-color);

  .search {
    padding: 10px;
    background-color: gray;
  }

  .category {
    padding-top: 20px;
    border: 1px solid var(--border-color);
    &-item {
      position: relative;
      height: 40px;
      line-height: 39px;
      position: relative;
      z-index: 1;
      margin-bottom: 2px;
      padding: 0 20px;
      cursor: pointer;
      &:hover {
        background-color: var(--highlight-background-color);
      }
    }

    .categoryActive {
      background-color: var(--highlight-background-color);

      &::after {
        content: "";
        height: 100%;
        width: 5px;
        background-color: #555;
        position: absolute;
        right: -1px;
        top: 0;
      }
    }
  }
`;
