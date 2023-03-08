import Banner from "./Banner";
import HotArticle from "./HotArticle";
import SentenceContent from "./SentenceContent";
import HomeFooter from "./HomeFooter";
import Progress from "./Progress";
import "./style.scss";

export default function Home() {
  return (
    <div id="home">
      <Banner />
      <HotArticle />
      <SentenceContent />
      <Progress />
      <HomeFooter />
    </div>
  );
}
