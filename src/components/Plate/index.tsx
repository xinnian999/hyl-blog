import { useMount, useRedux } from "@/hooks";
import Toolbar from "./Toolbar";
import { PlateBanner, PlateContent, Main } from "./styled";
import textCustom from "./textCustom";

interface PlateProps extends DomProps {
  title: string;
  autograph?: React.ReactNode;
  bg?: string;
}

function Plate(props: PlateProps) {
  const { title = "标题", autograph = "", bg = "bg1.webp", children } = props;

  const {
    store: {
      setStore: { dark },
    },
  } = useRedux();

  useMount(() => {
    textCustom();
  });

  return (
    <>
      <PlateBanner dark={dark} bg={bg}>
        <div className="bg"></div>
        <div className="info">
          <h2>{title}</h2>
          <div className="autograph">
            {typeof autograph === "string" ? (
              <>
                <span className="autograph-text">{autograph}</span>
                <span className="autograph-cursor">__</span>
              </>
            ) : (
              autograph
            )}
          </div>
        </div>
      </PlateBanner>

      <PlateContent>{children}</PlateContent>
    </>
  );
}

Plate.Main = Main;
Plate.Toolbar = Toolbar;

export default Plate;
