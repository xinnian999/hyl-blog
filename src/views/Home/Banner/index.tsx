import styled from "styled-components";
import { useMount } from "@/hooks";
import bubbles from "./bubbles";
import { useRef } from "react";
import BannerText from "./BannerText";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  .bg {
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${require(`@/assets/img/bg/bg24.jpg`)});
    background-attachment: fixed;
    canvas {
      backface-visibility: hidden;
    }
  }
  .info {
    color: var(--plate-text-color);
    text-align: center;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
  }
`;

function Banner() {
  const canvasRef = useRef(null);

  useMount(() => {
    const timer = bubbles(canvasRef.current);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Wrapper>
      <div className="bg">
        <canvas id="demo-canvas" ref={canvasRef} />
      </div>
      <div className="info">
        <BannerText />
      </div>
    </Wrapper>
  );
}

export default Banner;
