import { Image, Skeleton } from "antd";
import { InsertRowAboveOutlined } from "@ant-design/icons";
import { useRequest } from "@/hooks";
import { globalConfig, Time } from "@/utils";
import "./style.scss";

export default function Collection() {
  const [data] = useRequest("/collection/query", { mockLoadingCount: 4 });

  const renderItem = data.map(
    ({ picture, title, autograph, onClick, createTime, loading, id }) => {
      return (
        <div className="cardContainer" onClick={onClick} key={id}>
          <Skeleton loading={loading}>
            <Image
              src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
              className="image"
            />
            <div className="title">{title}</div>
            <p className="autograph">{autograph}</p>
            <div className="time">
              <InsertRowAboveOutlined className="iconAbove" />
              <span>{Time.getYearMonth(createTime)}</span>
            </div>
          </Skeleton>
        </div>
      );
    }
  );

  return <div className="Collection">{renderItem}</div>;
}
