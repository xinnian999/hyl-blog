import React, { Component } from "react";
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
  data2021: [];
  data2022: [];
}
class Index extends Component<isProps, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
      data2021: [],
      data2022: [],
    };
  }

  componentDidMount() {
    request.get("/article/query").then((res: any) => {
      const { data } = res;
      const data2021 = data.filter(
        (item: any) => new Time(item.creatTime).getYear() === 2021
      );
      const data2022 = data.filter(
        (item: any) => new Time(item.creatTime).getYear() === 2022
      );
      this.setState({ count: data.length, data2021, data2022 });
    });
  }

  render() {
    const { count, data2021, data2022 } = this.state;
    const { navigate } = this.props;
    return (
      <div id="file">
        <Title>居然用了两年时间才写了{count}篇文章</Title>
        <Divider orientation="left" className="year">
          2022
        </Divider>

        <List
          bordered
          dataSource={data2022}
          loading={!data2022.length}
          renderItem={(item: any) => (
            <div onClick={() => navigate(`/article/${item.id}`)}>
              <List.Item className="fileList">
                <Typography.Text mark>
                  [{moment(item.creatTime).format("MM-DD")}]
                </Typography.Text>{" "}
                {item.title}
              </List.Item>
            </div>
          )}
        />

        <Divider orientation="left" className="year">
          2021
        </Divider>

        <List
          bordered
          dataSource={data2021}
          loading={!data2021.length}
          renderItem={(item: any) => (
            <div onClick={() => navigate(`/article/${item.id}`)}>
              <List.Item className="fileList">
                <Typography.Text mark>
                  [{moment(item.creatTime).format("MM-DD")}]
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
