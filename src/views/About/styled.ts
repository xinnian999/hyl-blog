import { Plate } from "@/components";
import styled from "styled-components";
import { r } from "@/utils";

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

export const Info = styled.div`
  padding: ${r`30px`};
  background-color: var(--highlight-background-color);
  line-height: ${r`35px`};
  overflow: auto;
`;

export const Section = styled.span`
  display: block;
  text-indent: 2em;
`;

export const Title = styled.h2`
  margin: ${r`15px`} 0;
  padding-left: ${r`20px`};
  border-left: 5px solid var(--ant-primary-color);
  font-weight: 700;
`;
