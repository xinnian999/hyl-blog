import { useMount, useRedux } from "@/hooks";
import Toolbar from "./Toolbar";
import { PlateBanner, PlateContent, Main } from "./styled";
import bubbles from "./bubbles";

interface PlateProps extends DomProps {
  title?: string;
  autograph?: React.ReactNode;
  bg?: string;
  bannerText?: React.ReactNode;
}

function Plate(props: PlateProps) {
  const {
    title = "标题",
    bannerText = null,
    bg = "bg1.webp",
    children,
    autograph,
  } = props;

  const {
    store: {
      setStore: { dark },
    },
  } = useRedux();

  useMount(() => {
    // bubbles();
  });

  return (
    <>
      <PlateBanner dark={dark} bg={bg}>
        <div className="bg">
          <canvas id="demo-canvas" />
        </div>
        <div className="info">
          {bannerText || (
            <>
              <h2>{title}</h2>
              <div className="autograph">{autograph}</div>
            </>
          )}
        </div>
      </PlateBanner>

      <PlateContent>{children}</PlateContent>
    </>
  );
}

Plate.Main = Main;
Plate.Toolbar = Toolbar;

export default Plate;
