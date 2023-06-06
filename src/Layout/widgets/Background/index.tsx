import { useRedux } from "@/hooks";
import { useEffect } from "react";
import starBg from "./starBg";
import styled from "styled-components";

export const BackgroundWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  background-color: #eaeaea;
  /* background-size: cover; */
  background-image: url(${require("@/assets/img/bg/bg0.webp")});

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
  const {
    store: {
      setStore: { dark, theme },
    },
  } = useRedux();

  useEffect(() => {
    const body = document.querySelector("body")!;
    if (dark) {
      body.id = "dark";
      starBg(theme.bg);
    } else {
      body.id = "light";

      const bg: any = document.querySelector("#canvasBg")!;
      bg.style.display = "none";
    }
  }, [dark]);

  return (
    <BackgroundWrapper id="background">
      <canvas id="canvasBg"></canvas>
      {/* {!dark && <PmRibbon clickChangeDom={document} />} */}
    </BackgroundWrapper>
  );
}

export default Lantern;
