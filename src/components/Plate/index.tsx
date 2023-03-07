import { classnames } from "hyl-utils";
import { useRedux } from "@/hooks";
import "./style.scss";
import Banner from "./Banner";
import Toolbar from "./Toolbar";

function Plate({ children, ...props }: PlateProps) {
  return (
    <>
      <Banner {...props} />

      <div className="plate-content">{children}</div>
    </>
  );
}

const Main = ({ children }) => {
  const { store } = useRedux();
  return (
    <div className={classnames("main", { "box-shadow": !store.dark })}>
      {children}
    </div>
  );
};

const List = ({ children }) => {
  return <div className="list">{children}</div>;
};

Plate.Main = Main;
Plate.List = List;
Plate.Toolbar = Toolbar;

export default Plate;
