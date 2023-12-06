import { Image as AntdImage } from "antd";
import LazyBox from "./LazyBox";

type LazyImageProps = {
  src: string;
};

const LazyImage: React.FC<LazyImageProps> = ({ src }) => (
  <LazyBox height="100%">
    <AntdImage src={src} alt="图片加载失败了😭" height="100%" width="100%" />
  </LazyBox>
);

export default LazyImage;
