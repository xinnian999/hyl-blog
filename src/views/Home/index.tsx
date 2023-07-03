import { Plate } from "@/components";
import { Notice, HomeMain } from "./styled";
import BannerText from "./BannerText";
import Marquee from "react-fast-marquee";
import Main from "./Main";
import Side from "./Side";
import { useGetData } from "@/hooks";

function Home() {
  const [data] = useGetData("/mood/query");

  return (
    <Plate bannerText={<BannerText />}>
      <HomeMain>
        <Main />
        <Side />
      </HomeMain>
    </Plate>
  );
}

export default Home;
