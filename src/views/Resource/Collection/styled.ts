import { Plate } from "@/components";
import styled from "styled-components";

export const CollectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
  .cardContainer {
    padding: 20px;
    width: 23%;
    background-color: var(--highlight-background-color);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    margin: 0 10px 15px;
    cursor: pointer;

    .image {
      width: 100%;
      height: 160px;
      border: 1px solid #eee;
    }
    @media screen and (max-width: 800px) {
      width: 100%;
      .image {
        height: 100%;
      }
    }

    .title {
      overflow: hidden;
      height: 40px;
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      color: rgb(221, 49, 49);
    }

    .autograph {
      font-size: 13px;
      height: 40px;
      overflow: hidden;
    }
    .time {
      color: rgb(221, 49, 49);
      .iconAbove {
        font-size: 20px;
      }
      span {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    &:hover {
      box-shadow: 0 0 15px rgba(50, 250, 255, 0.75);
      opacity: 0.9;
    }
  }
`;
