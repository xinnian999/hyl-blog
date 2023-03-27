import styled from "styled-components";

const TimeBarWarpper = styled.div`
  padding: 5px 20px 0;
  top: 0;
  .day {
    font-size: 40px;
    font-weight: bold;
    color: var(--ant-primary-color);
    text-align: center;
    line-height: 40px;
  }
  .month,
  .year {
    color: #989997;
    font-size: 16px;
  }
  .month {
    margin-right: 10px;
  }
`;

const TimeBar = ({ time }) => {
  const times = new Date(time);

  return (
    <TimeBarWarpper>
      <div className="day">{times.getDate()}</div>
      <span className="month">{times.getMonth() + 1}月</span>
      <span className="year">{times.getFullYear()}</span>
    </TimeBarWarpper>
  );
};

export default TimeBar;
