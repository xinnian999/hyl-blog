import { time } from "hyl-utils";
import { List, Typography, Divider } from "antd";
import { Title, Plate } from "@/components";
import "./style.scss";
import { useGetData } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import React from "react";

type Data = {
  createTime: string;
};

function File() {
  const navigate = useNavigate();

  const [data] = useGetData<Data>("/article/query");

  const diff = time.duration(data[data.length - 1]?.createTime);

  const datasource = useMemo(() => {
    const yearKeys: any = [
      ...new Set(
        data.map((item: any) =>
          new Date(item.createTime).getFullYear().toString()
        )
      ),
    ];

    return yearKeys.map((item) => {
      const obj: any = { year: item, list: [] };
      data.forEach((v: any) => {
        if (v.createTime.includes(item)) {
          obj.list.push(v);
        }
      });

      return obj;
    });
  }, [data]);

  return (
    <Plate title="归档" autograph="穷且益坚，不坠青云之志。">
      <Plate.Main id="file">
        <Title>
          居然用了
          {diff.year}年零{diff.month}个月 才写了{data.length}
          篇文章
        </Title>
        {datasource.map(({ year, list }) => {
          return (
            <React.Fragment key={year}>
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
            </React.Fragment>
          );
        })}
      </Plate.Main>
    </Plate>
  );
}

export default File;
