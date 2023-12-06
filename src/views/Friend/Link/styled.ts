import { Plate } from "@/components";
import { r } from "@/utils";
import styled from "styled-components";

export const LinkWrapper = styled.div`
  position: relative;

  .explain {
    padding: 15px;
    border-radius: 15px;
    &-main {
      margin-left: 20px;

      .tags {
        margin-bottom: 30px;
      }

      .content {
        line-height: 25px;
        .mylink-info {
          background: var(--highlight-background-color);
          padding: 10px;
          font-weight: bold;
        }
      }
    }
  }

  .link-main {
    margin-top: 25px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .linkItem {
      width: calc(25% - 40px);
      background-color: var(--highlight-background-color);
      @media screen and (max-width: 800px) {
        width: calc(100% - 40px);
      }
      cursor: pointer;
      padding: 15px;
      margin: 20px;
      min-height: 150px;
      transition: 0.6s all;
      border-radius: 15px;
      .avatar {
        margin-right: 15px;
        margin-bottom: 10px;
      }

      span {
        font-size: 16px;
        font-weight: bold;
      }

      &:hover {
        box-shadow: 0 0 15px rgba(50, 250, 255, 0.95);
        opacity: 0.8;
      }

      &:last-child {
        margin-right: auto;
      }
    }
  }
`;

export const Title = styled.h2`
  margin: ${r`15px`} 0;
  padding-left: ${r`20px`};
  border-left: 5px solid var(--ant-primary-color);
  font-weight: 700;
`;
