import { Component } from "react";
import { time } from "hyl-utils";
import { List, Typography, Divider } from "antd";
import { request } from "@/utils";
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

  diff = { year: 0, month: 0 };

  componentDidMount() {
    request
      .get("/article/query", { params: { orderBys: "id desc" } })
      .then((res: any) => {
        const { data } = res;
        this.setState({ count: data.length, data });
        const startTime = data[data.length - 1]?.createTime;
        this.diff = time.duration(startTime, new Date().toUTCString());
      });
  }

  render() {
    const { count, data } = this.state;
    const { navigate } = this.props;

    return (
      <div id="file">
        <Title>
          居然用了
          {this.diff.year}年零{this.diff.month}个月 才写了{count}篇文章
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
                  [{time.parse(item.createTime, "MM-DD")}]
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
