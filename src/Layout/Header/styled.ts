import { adaptation } from "@/utils";
import styled from "styled-components";

export const HeaderWrapper = styled.header<{
  pathname: string;
  scrollTop: number;
}>`
  position: fixed;
  width: 100%;
  background-color: ${({ scrollTop }) =>
    scrollTop > 1 ? "#2f4154" : "transparent"};
  z-index: 10;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  line-height: ${({ scrollTop }) => (scrollTop > 1 ? "50px" : "60px")};
  height: ${({ scrollTop }) => (scrollTop > 1 ? "50px" : "60px")};
  backdrop-filter: blur(3px);
  transition: 0.5s all;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  display: ${({ pathname }) => (pathname === "/home" ? "none" : "block")};
  a {
    color: #fff;
    &:hover {
      color: var(--ant-primary-4);
    }
  }

  .center {
    max-width: var(--heart-width);
    margin: 0 auto;

    #logo {
      font-family: "汉仪霹雳体简";
      font-size: 30px;
      cursor: pointer;
      display: inline-block;
      float: left;
      color: #fff;
      @media screen and (max-width: 800px) {
        margin: 0 auto;
        float: none;
      }
    }

    .user {
      display: inline-block;
      float: right;
      @media screen and (max-width: 800px) {
        margin-right: 20px;
      }
    }

    .active {
      color: #6bc30d;
      color: var(--ant-primary-color);
    }
  }
`;

adaptation(HeaderWrapper);
