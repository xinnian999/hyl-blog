import Banner from "./Banner";
import Article from "./Article";
import SentenceContent from "./SentenceContent";
import BtnContent from "./BtnContent";
import Footer from "./Footer";
import "./style.scss";

export default function Home() {
  return (
    <div id="home">
      <Banner />
      <Article />
      <BtnContent />
      <SentenceContent />
      <Footer />
    </div>
  );
}
