import { Time } from "@/utils";
import "./style.scss";

interface isTime {
  time: string | object;
}

const TimeBar = ({ time }: isTime) => {
  const times = new Time(time || new Date());

  return (
    <div className="timeBar">
      <div className="day">{times.getDate()}</div>
      <span className="month">{times.getMonth() + 1}月</span>
      <span className="year">{times.getYear()}</span>
    </div>
  );
};

export default TimeBar;
