import { useRequest } from "@/hooks";
import { Card } from "@/components";
import { globalConfig } from "@/utils";
import "./style.scss";

export default function Collection() {
  const [data] = useRequest("/collection/query");

  const renderItem = data.map(
    ({ title, picture, link, autograph, creatTime }) => {
      return (
        <Card
          picture={`${globalConfig.remoteStaticUrl}/image/${picture}`}
          title={title}
          autograph={autograph}
          onClick={() => window.open(link)}
          createTime={creatTime}
          key={title}
        ></Card>
      );
    }
  );

  return <div className="Collection">{renderItem}</div>;
}
