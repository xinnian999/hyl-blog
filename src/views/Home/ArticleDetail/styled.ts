import { Plate } from "@/components";
import styled from "styled-components";

export const ArticleDetailMain = styled(Plate.Main)`
  padding: 10px 20px;
  width: 75%;
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
  .catalogue {
    font-size: 18px;
  }
  .ant-divider-horizontal {
    margin: 10px auto;
  }
`;
