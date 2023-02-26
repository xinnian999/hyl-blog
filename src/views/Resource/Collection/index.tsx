import { Skeleton } from "antd";
import { InsertRowAboveOutlined } from "@ant-design/icons";
import { time } from "hyl-utils";
import { useGetData } from "@/hooks";
import { Image, Plate } from "@/components";
import "./style.scss";

export default function Collection() {
  const [data] = useGetData("/collection/query", { mockLoadingCount: 4 });

  const renderItem = data.map(
    ({ picture, title, autograph, createTime, loading, link, id }) => {
      return (
        <div
          className="cardContainer"
          onClick={() => window.open(link)}
          key={id}
        >
          <Skeleton loading={loading}>
            <div className="image">
              <Image src={`${globalConfig.remoteStaticUrl}/image/${picture}`} />
            </div>

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

  return (
    <Plate
      title="珍藏"
      autograph="I like you,but just like you.我喜欢你，仅仅如此，喜欢而已"
    >
      <div className="Collection">{renderItem}</div>
    </Plate>
  );
}
