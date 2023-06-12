import styled from "styled-components";
import { r } from "@/utils";
import { MenuOutlined } from "@ant-design/icons";
import TweenOne from "rc-tween-one";

interface PlateBannerProps {
  bg: string;
  dark: boolean;
}

export const PlateBanner = styled.div<PlateBannerProps>`
  position: relative;
  height: 100vh;
  .bg {
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: ${(props) => (props.dark ? "0.7" : "1")};
    background-image: ${(props) =>
      `url(${require(`@/assets/img/bg/${
        props.dark ? "bg8.jpg" : "bg24.jpg"
      }`)})`};
    background-attachment: fixed;
  }
  .info {
    color: var(--plate-text-color);
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    h2 {
      font-weight: 500;
      font-size: ${r`50px`};
      margin-bottom: 20px;
      letter-spacing: 5px;
      /* text-shadow: 0px 0px 10px black; */
      color: #eee;
      text-shadow: 3px 3px 0 var(--ant-primary-8);
    }
    .autograph {
      font-size: 22px;
    }
  }
`;

export const PlateContent = styled.div`
  max-width: var(--heart-width);
  margin: 0 auto;
  position: relative;
  top: 50px;
  /* display: flex; */
  padding-bottom: 100px;
  @media screen and (max-width: 800px) {
    margin: 0 20px;
  }
`;

export const Main = styled.div`
  background-color: var(--background-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
  /* flex: 1; */
`;

export const ToolbarWrapper = styled.div`
  width: 25%;
  margin-left: 25px;
  position: relative;
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
`;

export const DownIcon = styled(TweenOne)`
  bottom: 20px;
  font-size: 24px;
  position: absolute;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  left: 50%;
  margin-left: -27px;
  path {
    font-weight: bold;
  }
  &:hover {
    background-color: var(--ant-primary-color);
  }
`;
