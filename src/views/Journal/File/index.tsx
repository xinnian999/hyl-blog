import { Component } from "react";
import moment from "moment";
import { List, Typography, Divider } from "antd";
import { request, Time } from "@/utils";
import { withRouter, Title } from "@/components";
import "./style.scss";

interface isProps {
  navigate: any;
}
interface isState {
  count: any;
  data: any;
}
class Index extends Component<isProps, isState> {
  state = {
    count: 0,
    data: [],
  };

  diff: number = 0;

  componentDidMount() {
    request
      .get("/article/query", { params: { orderBys: "id desc" } })
      .then((res: any) => {
        const { data } = res;
        this.setState({ count: data.length, data });
        const startTime = data[0]?.createTime;
        const lastTime = data[data.length - 1]?.createTime;
        this.diff = Time.getDiffDay(startTime, lastTime);
      });
  }

  render() {
    const { count, data } = this.state;
    const { navigate } = this.props;

    return (
      <div id="file">
        <Title>
          居然用了
          {`${parseInt(this.diff / 365 + "")}年${parseInt(
            this.diff / 30 + ""
          )}个月`}
          才写了{count}篇文章
        </Title>
        <Divider orientation="left" className="year">
          2022
        </Divider>

        <List
          bordered
          dataSource={data}
          loading={!data.length}
          renderItem={(item: any) => (
            <div onClick={() => navigate(`/article/${item.id}`)}>
              <List.Item className="fileList">
                <Typography.Text mark>
                  [{moment(item.createTime).format("MM-DD")}]
                </Typography.Text>{" "}
                {item.title}
              </List.Item>
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(Index);
