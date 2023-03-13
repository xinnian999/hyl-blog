import styled from "styled-components";
import { adaptation } from "@/utils";

export const PlateBanner = styled.div`
  position: relative;
  height: 600px;
`;

export const PlateBannerBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
`;

export const PlateBannerInfo = styled.div`
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
`;

export const PlateContent = styled.div`
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
adaptation(PlateBannerInfo);
adaptation(ToolbarFlag);
