import { useRedux } from "@/hooks";
import "./style.scss";

function Banner(props: BannerProps) {
  const { title = "标题", autograph = "", bg = "bg1.webp" } = props;

  const { store } = useRedux();

  return (
    <div className="plate-banner">
      <div className="plate-banner-info">
        <h2>{title}</h2>
        <div className="plate-banner-info-autograph">{autograph} </div>
      </div>
      <div
        className="plate-banner-bg"
        style={{
          opacity: store.dark ? "0.7" : "1",
          backgroundImage: `url(${require(`@/assets/img/bg/${
            store.dark ? "bg8.jpg" : bg
          }`)})`,
        }}
      ></div>
    </div>
  );
}

export default Banner;
