import { useEffect, useRef } from "react";
import { Image as AntdImage, Spin } from "antd";
import { useBoolean, useScroll } from "@/hooks";
import "./style.scss";

function Image({ src }) {
  const ref: any = useRef(null);
  const [flag, on] = useBoolean(false);
  const scroll = useScroll();

  const visible = () => {
    const viewHeight = document.documentElement.clientHeight;
    let rect = ref.current.getBoundingClientRect();

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
        <Spin className="img-loading" />
      )}
    </div>
  );
}

export default Image;
