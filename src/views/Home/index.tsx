import { Plate } from "@/components";
import { Notice, HomeMain } from "./styled";
import BannerText from "./BannerText";
import Marquee from "react-fast-marquee";
import Main from "./Main";
import Side from "./Side";

function Home() {
  return (
    <Plate bannerText={<BannerText />}>
      <Notice
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            chatgpt暂时关闭，后续再重新开启
          </Marquee>
        }
        className="notice"
      />
      <HomeMain>
        <Main />
        <Side />
      </HomeMain>
    </Plate>
  );
}

export default Home;
