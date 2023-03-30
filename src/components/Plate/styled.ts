import styled from "styled-components";
import { r } from "@/utils";
import { MenuOutlined } from "@ant-design/icons";

interface PlateBannerProps {
  bg: string;
  dark: boolean;
}

export const PlateBanner = styled.div<PlateBannerProps>`
  position: relative;
  height: ${r`600px`};
  .bg {
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: ${(props) => (props.dark ? "0.7" : "1")};
    background-image: ${(props) =>
      `url(${require(`@/assets/img/bg/${
        props.dark ? "bg8.jpg" : props.bg
      }`)})`};
  }
  .info {
    color: var(--plate-text-color);
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-70%);
    z-index: 9;
    h2 {
      font-weight: 500;
      font-size: ${r`40px`};
      margin-bottom: 20px;
      letter-spacing: 5px;
      text-shadow: 0px 0px 10px black;
    }
    .autograph {
      font-size: ${r`20px`};
      text-shadow: 0px 0px 10px black;
      &-cursor {
        animation: shanxian 2000ms infinite;
      }
      @keyframes shanxian {
        from {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
`;

export const PlateContent = styled.div`
  max-width: var(--heart-width);
  margin: 0 auto;
  position: relative;
  top: -50px;
  display: flex;
  @media screen and (max-width: 800px) {
    margin: 0 20px;
  }
`;

export const Main = styled.div`
  background-color: var(--background-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
  flex: 1;
`;

export const ToolbarWrapper = styled.div`
  width: 25%;
  margin-left: 25px;
  position: relative;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const ToolbarItem = styled.div`
  background-color: var(--background-color);
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

export const ToolbarFlag = styled(MenuOutlined)`
  position: fixed;
  right: 0;
  top: 30%;
  background-color: var(--highlight-background-color);
  box-shadow: var(--box-shadow);
  border: 1px solid #999;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  font-size: ${r`25px`};
  padding: 5px 10px;
  cursor: pointer;
  z-index: 999;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;
