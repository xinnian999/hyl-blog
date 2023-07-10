import { r } from "@/utils";
import styled from "styled-components";

export const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  background: ${({ theme }) =>
    theme.scrollTop > 200
      ? "linear-gradient(208deg,#4584ff 0,#4584ff 11%,#ff7676 100%)"
      : "transparent"};
  height: ${({ theme }) => (theme.scrollTop > 200 ? r`50px` : r`60px`)};
  line-height: ${({ theme }) => (theme.scrollTop > 200 ? r`50px` : r`60px`)};
  z-index: 11;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: 0.5s all;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);

  display: flex;
  padding: 0 30px;

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
