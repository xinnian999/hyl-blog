import styled from "styled-components";
import { adaptation } from "@/utils";

export const PlateBanner = adaptation(styled.div`
  position: relative;
  height: 600px;
`);

export const PlateBannerBg = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
`;

export const PlateBannerInfo = adaptation(styled.div`
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
`);
