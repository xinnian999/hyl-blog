import { useRequest } from "@/hooks";
import { Card } from "@/components";
import "./style.scss";

export default function Collection() {
  const [data] = useRequest("/collection/query");

  const renderItem = data
    .reverse()
    .map(({ title, picture, link, autograph }) => {
      return (
        <Card
          picture={`https://cdn.hyl999.co/public/image/${picture}`}
          title={title}
          autograph={autograph}
          onClick={() => window.open(link)}
          key={title}
        ></Card>
      );
    });

  return <div className="Collection">{renderItem}</div>;
}
