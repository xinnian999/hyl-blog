import styled from "styled-components";
import { useMount, useRedux } from "@/hooks";
import bubbles from "./bubbles";
import { useRef } from "react";
import BannerText from "./BannerText";

interface WrapperProps {
  dark: boolean;
}

const Wrapper = styled.div<WrapperProps>`
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
  const {
    store: {
      setStore: { dark },
    },
  } = useRedux();

  const canvasRef = useRef(null);

  useMount(() => {
    const timer = bubbles(canvasRef.current);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Wrapper dark={dark}>
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
