import moment from "moment";

interface isTime {
  getStandardTime(): string;
}

class Time implements isTime {
  time: any;
  constructor(time: number | string | object) {
    this.time = time;
  }

  static getDiff(start,last){
    const diffDay = parseInt( (Date.parse(start)-Date.parse(last))/(1000*60*60*24))

    return `${diffDay/365}年 ${diffDay/30}个月`
  }

  getStandardTime() {
    return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
  }

  getDate() {
    return moment(this.time).date();
  }

  getMonth() {
    return moment(this.time).month();
  }

  getYear() {
    return moment(this.time).year();
  }

  getYMDTime() {
    return moment(this.time).format("YYYY年MM月DD日");
  }

  getDuration() {
    const times = moment.duration(Date.now() - this.time);
    const strTime = ` ${times.years()} 年 ${times.months()} 个月 ${times.days()} 天 ${times.hours()} 小时 ${times.minutes()} 分种 ${times.seconds()} 秒 `;
    return strTime;
  }
}

export default Time;
