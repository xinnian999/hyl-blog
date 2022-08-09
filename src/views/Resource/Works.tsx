import { useRequest } from "@/hooks";
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
            background: `url(${picture})`,
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

  return <div className="Works">{renderItem}</div>;
}
