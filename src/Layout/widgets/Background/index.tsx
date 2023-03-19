import { useRedux } from "@/hooks";
import { useEffect } from "react";
import PmRibbon from "pm-ribbon";
import starBg from "./starBg";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  background-color: #eaeaea;
  background-size: cover;

  canvas {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: baseline;
    position: absolute;
    z-index: -1;
  }
`;

function Lantern() {
  const { store } = useRedux();

  useEffect(() => {
    const body = document.querySelector("body")!;
    if (store.dark) {
      body.id = "dark";
      starBg(store.theme.bg);
    } else {
      body.id = "light";

      const bg: any = document.querySelector("#canvasBg")!;
      bg.style.display = "none";
    }
  }, [store.dark]);

  return (
    <BackgroundWrapper id="background">
      <canvas id="canvasBg"></canvas>
      {!store.dark && <PmRibbon clickChangeDom={document} />}
    </BackgroundWrapper>
  );
}

export default Lantern;
