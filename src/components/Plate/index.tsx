import { PlateContent, Main } from "./styled";
import Banner from "./Banner";

interface PlateProps extends DomProps {
  title?: string;
  autograph?: React.ReactNode;
  bg?: string;
  bannerText?: React.ReactNode;
}

function Plate(props: PlateProps) {
  return (
    <>
      <Banner {...props}></Banner>

      <PlateContent>{props.children}</PlateContent>
    </>
  );
}

Plate.Main = Main;

export default Plate;
