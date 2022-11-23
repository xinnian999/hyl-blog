import { Skeleton } from "antd";
import { useRequest } from "@/hooks";
import { globalConfig } from "@/utils";
import "./style.scss";

export default function Works() {
  const [data] = useRequest("/works/query", { mockLoadingCount: 4 });

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
          key={name}
        >
          <Skeleton loading={loading} key={id} active>
            <div className="title">{name}</div>
            <hr />
            <div className="autograph">{autograph}</div>
          </Skeleton>
        </div>
      );
    }
  );

  return <div className="Works">{renderItem}</div>;
}
