import { useRedux } from "@/hooks";
import { Progress as AntdProgress } from "antd";
import "./style.scss";

export default function Progress() {
  const {
    store: {
      globalStore: { theme },
    },
  } = useRedux();

  return (
    <div className="progress-container">
      <div className="progress">
        <div className="item">
          <div>今日已经度过了{new Date().getHours()}个小时</div>
          <div className="gress">
            <AntdProgress
              percent={parseInt((new Date().getHours() / 24) * 100 + "")}
              strokeColor={theme.color}
            />
          </div>
        </div>
        <div className="item">
          <div>本周已经度过了{new Date().getDay()}天</div>
          <div className="gress">
            <AntdProgress
              percent={parseInt((new Date().getDay() / 7) * 100 + "")}
              strokeColor={theme.color}
            />
          </div>
        </div>
        <div className="item">
          <div>本月已经度过了{new Date().getDate()}天</div>
          <div className="gress">
            <AntdProgress
              percent={parseInt((new Date().getDate() / 30) * 100 + "")}
              strokeColor={theme.color}
            />
          </div>
        </div>
        <div className="item">
          <div>今年已经度过了{new Date().getMonth() + 1}个月</div>
          <div className="gress">
            <AntdProgress
              percent={parseInt(((new Date().getMonth() + 1) / 12) * 100 + "")}
              strokeColor={theme.color}
            />
          </div>
        </div>

        <h3>希望各位召唤师在生活中，也能打出线上一样的压制力</h3>
      </div>
    </div>
  );
}
