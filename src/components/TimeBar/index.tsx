import "./style.scss";

const TimeBar = ({ time }) => {
  const times = new Date(time);

  return (
    <div className="timeBar">
      <div className="day">{times.getDate()}</div>
      <span className="month">{times.getMonth() + 1}月</span>
      <span className="year">{times.getFullYear()}</span>
    </div>
  );
};

export default TimeBar;
