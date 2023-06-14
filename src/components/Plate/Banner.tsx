import { useMount, useRedux } from "@/hooks";
import { PlateBanner } from "./styled";
import bubbles from "./bubbles";
import { useRef, useState } from "react";

interface PlateProps extends DomProps {
  title?: string;
  autograph?: React.ReactNode;
  bg?: string;
  bannerText?: React.ReactNode;
}

function Banner(props: PlateProps) {
  const {
    title = "标题",
    bannerText = null,
    bg = "bg1.webp",
    autograph = "",
  } = props;

  const {
    store: {
      setStore: { dark },
    },
  } = useRedux();

  const canvasRef = useRef(null);

  const [animateId, setAnimateId] = useState(1);

  useMount(() => {
    bubbles(canvasRef.current, title);
    // const animate = () => {
    //   bubbles();
    //   requestAnimationFrame(animate);
    // };

    // return () => {
    //   cancelAnimationFrame(animateId);
    // };
  });

  return (
    <PlateBanner dark={dark} bg={bg}>
      <div className="bg">
        <canvas id="demo-canvas" ref={canvasRef} />
      </div>
      <div className="info">
        {bannerText || (
          <>
            <h2>{title}</h2>
            <div className="autograph">{autograph}</div>
          </>
        )}
      </div>
    </PlateBanner>
  );
}

export default Banner;
