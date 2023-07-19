import { Skeleton } from "antd";
import { useGetData } from "@/hooks";
import { Plate } from "@/components";
import { WorkWrapper } from "./styled";

type Data = {
  name: string;
  picture: string;
  link: string;
  autograph: string;
  loading: boolean;
  id: number;
};

export default function Works() {
  const [data] = useGetData<Data>("/works/query", { mockLoadingCount: 4 });

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
    <Plate title="个人作品" bg="bg15.jpg">
      <WorkWrapper>{renderItem}</WorkWrapper>
    </Plate>
  );
}
