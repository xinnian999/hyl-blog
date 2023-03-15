import styled from "styled-components";
import { adaptation } from "@/utils";

interface PlateBannerProps {
  bg: string;
  dark: boolean;
}

export const PlateBanner = styled.div<PlateBannerProps>`
  position: relative;
  height: 600px;
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
      font-size: 40px;
      margin-bottom: 20px;
      letter-spacing: 5px;
      text-shadow: 0px 0px 10px black;
    }
    .autograph {
      font-size: 20px;
      text-shadow: 0px 0px 10px black;
      padding: 0 20px;
    }
  }
`;

export const PlateContent = styled.div`
  max-width: var(--heart-width);
  margin: 0 auto;
  position: relative;
  top: -50px;
  padding-bottom: 50px;
  display: flex;
  @media screen and (max-width: 800px) {
    margin: 0 20px;
  }

  .plate-main {
    background-color: var(--background-color);
    border-radius: 15px;
    box-shadow: var(--box-shadow);
    flex: 1;
  }
  .plate-list {
    width: calc(75% - 25px);
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }

  .plate-toolbar {
    width: 25%;
    margin-left: 25px;
    position: relative;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
`;

export const ToolbarFlag = styled.div`
  position: fixed;
  right: 0;
  top: 30%;
  background-color: var(--highlight-background-color);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  font-size: 25px;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 999;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

adaptation(PlateBanner);
// adaptation(PlateBannerInfo);
// adaptation(ToolbarFlag);
