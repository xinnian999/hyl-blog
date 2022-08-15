import { Spin } from "antd";
import "./style.scss";

interface Props {
  size?: any;
  tip?: string;
}

const Loading = ({ size, tip }: Props) => {
  return (
    <div className="loading">
      <Spin className="loading-spin" size={size} tip={tip} />
    </div>
  );
};

Loading.defaultProps = {
  size: "default",
  tip: "玩命加载中...",
};

export default Loading;
