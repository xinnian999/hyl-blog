import { useEffect, useRef } from "react";
import { Image as AntdImage } from "antd";
import { useBoolean, useScroll } from "@/hooks";
import styled from "styled-components";

const LazyImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  .img-loading {
    margin: auto;
  }
`;

type ImageProps = {
  src: string;
};

const Image: React.FC<ImageProps> = ({ src }) => {
  const ref: any = useRef(null);
  const [visible, on] = useBoolean(false);
  const scroll = useScroll();

  const compute = () => {
    const viewHeight = document.documentElement.clientHeight;
    let rect = ref.current.getBoundingClientRect();

    if (rect.top <= viewHeight && rect.top > -rect.height) {
      on();
    }
  };

  useEffect(compute, [scroll]);

  return (
    <LazyImageWrapper ref={ref}>
      {visible && (
        <AntdImage
          src={src}
          alt="图片加载失败了...网有点卡..."
          height="100%"
          width="100%"
        />
      )}
    </LazyImageWrapper>
  );
};

export default Image;
