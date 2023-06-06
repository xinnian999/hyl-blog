import { r } from "@/utils";
import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.scrollTop > 200 ? "#2f4154" : "transparent"};
  height: ${({ theme }) => (theme.scrollTop > 200 ? r`50px` : r`60px`)};
  line-height: ${({ theme }) => (theme.scrollTop > 200 ? r`50px` : r`60px`)};
  z-index: 11;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: 0.5s all;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  a {
    color: #fff;
    &:hover {
      background-color: var(--ant-primary-color);
    }
  }

  .main {
    max-width: var(--heart-width);
    margin: 0 auto;
    display: flex;
  }

  .active {
    background-color: var(--ant-primary-color);
  }
`;

export const Logo = styled.span`
  font-family: "汉仪霹雳体简";
  font-size: ${r`30px`};
  cursor: pointer;
  color: #fff;
  @media screen and (max-width: 800px) {
    margin: 0 auto;
  }
`;

export const NavWrapper = styled.ul`
  display: inline-flex;
  margin-left: auto;

  .navItem {
    position: relative;
    margin-right: 10px;
    &-main {
      /* display: block; */
      padding: 5px;
      border-radius: 10px;
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
  }

  .twoNavItem {
    a {
      display: block;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const UserWrapper = styled.div`
  margin-left: 15px;
`;

export const UserInfoWrapper = styled.ul`
  padding: 15px 0;
  li {
    line-height: 30px;
    color: #fff;
  }
`;
