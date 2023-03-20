import { r } from "@/utils";
import styled from "styled-components";

type HeaderWrapperProps = {
  pathname: string;
  scrollTop: number;
};

export const HeaderWrapper = styled.header<HeaderWrapperProps>`
  position: fixed;
  width: 100%;
  background-color: ${(props) =>
    props.scrollTop > 1 ? "#2f4154" : "transparent"};
  line-height: ${(props) => (props.scrollTop > 1 ? r`50px` : r`60px`)};
  display: ${(props) => (props.pathname === "/home" ? "none" : "block")};
  z-index: 10;
  text-align: center;
  backdrop-filter: blur(3px);
  transition: 0.5s all;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  a {
    color: #fff;
    &:hover {
      color: var(--ant-primary-4);
    }
  }

  .main {
    max-width: var(--heart-width);
    margin: 0 auto;
    display: flex;
  }

  .active {
    color: var(--ant-primary-color);
  }
`;

export const Logo = styled.span`
  font-family: "汉仪霹雳体简";
  font-size: ${r`30px`};
  cursor: pointer;
  margin-right: auto;
  color: #fff;
  @media screen and (max-width: 800px) {
    margin: 0 auto;
    float: none;
  }
`;

export const NavWrapper = styled.ul`
  display: inline-flex;
  margin-right: 15px;
  @media screen and (max-width: 800px) {
    display: none;
  }

  .navItem {
    position: relative;

    &-main {
      display: block;
      padding: 0 10px;
      position: relative;
      font-size: 15px;
      font-weight: bold;
      text-align: center;

      .nav-title {
        padding: 0 5px;
      }

      .down {
        display: inline-block;
        transition: 0.5s transform;
      }
    }

    &:hover .down {
      transform: rotate(180deg);
    }

    &:hover .twoNav {
      opacity: 1;
      top: 50px;
      height: auto;
    }

    .twoNav {
      width: 100px;
      background-color: #2f4154;
      box-shadow: 0 4px 7px 0 rgb(0 0 0 / 50%);
      overflow: hidden;
      height: 0;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 60px;
      border-radius: 10px;
      transition: 0.5s opacity;

      li {
        padding: 0;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        a {
          display: block;
        }
      }
    }
  }
`;
