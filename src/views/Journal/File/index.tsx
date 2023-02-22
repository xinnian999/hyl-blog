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
  data: any[];
}
class Index extends Component<isProps, isState> {
  state = {
    data: [],
  };

  diff = { year: 0, month: 0 };

  componentDidMount() {
    request.get("/article/query", { orderBys: "id desc" }).then((res: any) => {
      const { data } = res;
      this.setState({ data });
      const startTime = data[data.length - 1]?.createTime;
      this.diff = time.duration(startTime);
    });
  }

  render() {
    const { data } = this.state;
    const { navigate } = this.props;

    let datasource = [];

    let yearKeys: any = [
      ...new Set(
        data.map((item: any) =>
          new Date(item.createTime).getFullYear().toString()
        )
      ),
    ];

    datasource = yearKeys.map((item) => {
      const obj: any = { year: item, list: [] };
      data.forEach((v: any) => {
        if (v.createTime.includes(item)) {
          obj.list.push(v);
        }
      });

      return obj;
    });

    return (
      <div id="file">
        <Title>
          居然用了
          {this.diff.year}年零{this.diff.month}个月 才写了{data.length}
          篇文章
        </Title>
        {datasource.map(({ year, list }) => {
          return (
            <>
              <Divider orientation="left" className="year">
                {year}
              </Divider>

              <List
                bordered
                dataSource={list}
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
            </>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Index);
