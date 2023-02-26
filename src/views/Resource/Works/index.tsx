import { Skeleton } from "antd";
import { useGetData } from "@/hooks";
import "./style.scss";
import { Plate } from "@/components";

export default function Works() {
  const [data] = useGetData("/works/query", { mockLoadingCount: 4 });

  const renderItem = data.map(
    ({ name, picture, link, autograph, loading, id }) => {
      return (
        <div
          className="item"
          style={{
            backgroundImage: `url(${`${globalConfig.remoteStaticUrl}/image/${picture}`})`,
            backgroundSize: "cover",
          }}
          onClick={() => window.open(link)}
          key={id}
        >
          <Skeleton loading={loading} active>
            <div className="title">{name}</div>
            <hr />
            <div className="autograph">{autograph}</div>
          </Skeleton>
        </div>
      );
    }
  );

  return (
    <Plate
      title="个人作品"
      autograph="你知道太阳为什么是太阳吗？因为它从不在乎别人的目光"
      bg="bg15.jpg"
    >
      <div className="Works">{renderItem}</div>
    </Plate>
  );
}
