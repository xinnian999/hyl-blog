import { Image, Skeleton } from "antd";
import { InsertRowAboveOutlined } from "@ant-design/icons";
import { time } from "hyl-utils";
import { useRequest } from "@/hooks";
import { globalConfig } from "@/utils";
import "./style.scss";

export default function Collection() {
  const [data] = useRequest("/collection/query", { mockLoadingCount: 4 });

  const renderItem = data.map(
    ({ picture, title, autograph, createTime, loading, link, id }) => {
      return (
        <div
          className="cardContainer"
          onClick={() => window.open(link)}
          key={id}
        >
          <Skeleton loading={loading}>
            <Image
              src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
              className="image"
            />
            <div className="title">{title}</div>
            <p className="autograph">{autograph}</p>
            <div className="time">
              <InsertRowAboveOutlined className="iconAbove" />
              <span>{time.parse(createTime, "YYYY-MM")}</span>
            </div>
          </Skeleton>
        </div>
      );
    }
  );

  return <div className="Collection">{renderItem}</div>;
}
