import { time } from "hyl-utils";
import { List, Typography, Divider } from "antd";
import { Title, Plate } from "@/components";
import "./style.scss";
import { useGetData } from "@/hooks";
import { useNavigate } from "react-router-dom";

type Data = {
  createTime: string;
};

function File() {
  const navigate = useNavigate();

  const [data] = useGetData<Data>("/article/query");

  const diff = time.duration(data[data.length - 1]?.createTime);

  const yearKeys: any = [
    ...new Set(
      data.map((item: any) =>
        new Date(item.createTime).getFullYear().toString()
      )
    ),
  ];

  const datasource = yearKeys.map((item) => {
    const obj: any = { year: item, list: [] };
    data.forEach((v: any) => {
      if (v.createTime.includes(item)) {
        obj.list.push(v);
      }
    });

    return obj;
  });

  return (
    <Plate title="归档" autograph="穷且益坚，不坠青云之志。">
      <div id="file">
        <Title>
          居然用了
          {diff.year}年零{diff.month}个月 才写了{data.length}
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
    </Plate>
  );
}

export default File;
