import Banner from "./Banner";
import Article from "./Article";
import SentenceContent from "./SentenceContent";
import BtnContent from "./BtnContent";
import Footer from "./Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Banner />
      <Article />
      <BtnContent />
      <SentenceContent />
      <Footer />
    </div>
  );
}
