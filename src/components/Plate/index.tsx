import { useRedux } from "@/hooks";
import Toolbar from "./Toolbar";
import { PlateBanner, PlateContent, Main } from "./styled";

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

      <PlateContent>{children}</PlateContent>
    </div>
  );
}

Plate.Main = Main;
Plate.Toolbar = Toolbar;

export default Plate;
