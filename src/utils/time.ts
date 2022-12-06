import moment from "moment";

type time = moment.MomentInput;

class Time {
  static getStandardTime(time: time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
  }

  static getYMDTime(time: time) {
    return moment(time).format("YYYY年MM月DD日");
  }

  static getYearMonth(time: time) {
    return moment(time).format("MM-DD");
  }

  static getDiffDay(start, last) {
    const diffDay =
      (Date.parse(start) - Date.parse(last)) / (1000 * 60 * 60 * 24);

    return parseInt(diffDay.toString());
  }

  static getDuration(startTime: number) {
    const times = moment.duration(Date.now() - startTime);
    const strTime = ` ${times.years()} 年 ${times.months()} 个月 ${times.days()} 天 ${times.hours()} 小时 ${times.minutes()} 分种 ${times.seconds()} 秒 `;
    return strTime;
  }
}

export default Time;
