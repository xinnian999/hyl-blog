import { useRedux } from "@/hooks";
import Toolbar from "./Toolbar";
import Main from "./Main";
import "./style.scss";
import { PlateBanner } from "./styled";

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
      <PlateBanner dark={store.dark} bg={bg}>
        <div className="bg"></div>
        <div className="info">
          <h2>{title}</h2>
          <div className="autograph">{autograph} </div>
        </div>
      </PlateBanner>

      <div className="plate-content">{children}</div>
    </div>
  );
}

Plate.Main = Main;
Plate.List = (props: DomProps) => (
  <div className="plate-list">{props.children}</div>
);
Plate.Toolbar = Toolbar;

export default Plate;
