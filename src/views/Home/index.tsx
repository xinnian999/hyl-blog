import Banner from "./Banner";
import Article from "./Article";
import SentenceContent from "./SentenceContent";
import Footer from "./Footer";
import Progress from "./Progress";
import "./style.scss";

export default function Home() {
  return (
    <div id="home">
      <Banner />
      <Article />

      {/* <BtnContent /> */}
      <SentenceContent />
      <Progress />
      <Footer />
    </div>
  );
}
