import { Plate } from "@/components";
import styled from "styled-components";

export const DemoMain = styled(Plate.Main)`
  text-align: center;
`;

export const VideoButton = styled.button`
  margin: 0 auto;
  border-radius: 56px;
  overflow: hidden;
  position: relative;
  video {
    width: 300px;
    height: 100px;
    object-fit: cover;
    filter: blur(2px) saturate(0.6) brightness(1.1);
  }

  .text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    color: rgba(0, 0, 0, 0.7);
    font-size: 35px;
    width: 300px;
    font-weight: bold;
    text-shadow: 0px -1px 0px rgba(255, 255, 255, 0.5),
      0px 1px 0px rgba(255, 255, 255, 0.5);
  }

  &:hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;
