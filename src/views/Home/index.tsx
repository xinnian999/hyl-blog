import Banner from "./Banner";
import HotArticle from "./HotArticle";
import SentenceContent from "./SentenceContent";
import Footer from "./Footer";
import Progress from "./Progress";
import "./style.scss";

export default function Home() {
  return (
    <div id="home">
      <Banner />
      <HotArticle />
      <SentenceContent />
      <Progress />
      <Footer />
    </div>
  );
}
