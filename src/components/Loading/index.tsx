import "./style.scss";

interface Props {
  size?: any;
  tip?: string;
}

const Loading = ({ size, tip }: Props) => {
  return (
    <div id="Loading">
      <div id="content">
        <div className="outer"></div>
        <div className="inner"></div>
        <div>{tip}</div>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  size: "default",
  tip: "玩命加载中...",
};

export default Loading;
