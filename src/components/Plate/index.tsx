import { useRedux } from "@/hooks";
import Toolbar from "./Toolbar";
import Main from "./Main";
import "./style.scss";

interface PlateProps extends DomProps {
  title: string;
  autograph?: React.ReactNode;
  bg?: string;
}

function Plate(props: PlateProps) {
  const {
    title = "标题",
    autograph = "",
    bg = "bg1.webp",
    children,
    id,
    className,
  } = props;

  const { store } = useRedux();

  return (
    <div id={id} className={className}>
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

      <div className="plate-content">{children}</div>
    </div>
  );
}

Plate.Main = Main;
Plate.List = (props: DomProps) => <div className="list">{props.children}</div>;
Plate.Toolbar = Toolbar;

export default Plate;
