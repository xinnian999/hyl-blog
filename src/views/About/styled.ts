import { Plate } from "@/components";
import styled from "styled-components";

export const AboutWrapper = styled(Plate.Main)`
  padding: 15px;
  a {
    color: var(--ant-primary-color);
  }
  .updateLog {
    .content {
      margin: 20px 0 0 10px;
      white-space: pre-wrap;
    }
    height: 300px;
  }

  .myContact {
    font-size: 18px;
    margin-left: 5px;
  }
  .gitee {
    color: rgb(199, 42, 42);
  }
  .juejin {
    height: 18px;
    position: relative;
    top: -2px;
    margin-left: 15px;
  }

  .other {
    display: flex;
    .ant-card {
      flex: 1;
      margin: 0 30px;
      img {
        width: 50%;
        margin: 0 auto;
        display: block;
      }
    }
    @media screen and (max-width: 500px) {
      display: block;
      .ant-card {
        margin-bottom: 20px;
      }
    }
  }
`;