import { useEffect, useRef } from "react";
import { Image as AntdImage } from "antd";
import altImg from "@/assets/img/wallpaper3.jpg";
import { useBoolean, useScroll } from "@/hooks";

function Image({ src }) {
  const ref: any = useRef(null);
  const [flag, on] = useBoolean(false);
  const scroll = useScroll();

  const visible = () => {
    const viewHeight = document.documentElement.clientHeight;
    let rect = ref.current.getBoundingClientRect();
    console.log(rect, viewHeight);

    if (rect.top <= viewHeight && rect.top > -rect.height) {
      on();
    }
  };

  useEffect(visible, [scroll]);

  return (
    <div id="Image" ref={ref}>
      {flag ? (
        <AntdImage
          src={src}
          alt="图片加载失败了...网有点卡..."
          height="100%"
          width="100%"
        />
      ) : (
        <AntdImage src={altImg} height="100%" width="100%" />
      )}
    </div>
  );
}

export default Image;
