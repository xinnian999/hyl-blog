import { Skeleton } from "antd";
import { useRequest } from "@/hooks";
import { batchCopyDom, globalConfig } from "@/utils";
import "./style.scss";

export default function Works() {
  const [data] = useRequest("/works/query");

  const renderItem = data
    .reverse()
    .map(({ name, picture, link, autograph }) => {
      return (
        <div
          className="item"
          style={{
            background: `url(${`${globalConfig.remoteStaticUrl}/image/${picture}`})`,
            backgroundSize: "cover",
          }}
          onClick={() => window.open(link)}
          key={name}
        >
          <div className="title">{name}</div>
          <hr />
          <div className="autograph">{autograph}</div>
        </div>
      );
    });

  const renderSkeleton = batchCopyDom(
    () => <Skeleton active paragraph={{ rows: 4 }} className="item" />,
    4
  );

  return (
    <div className="Works">{data.length ? renderItem : renderSkeleton}</div>
  );
}
