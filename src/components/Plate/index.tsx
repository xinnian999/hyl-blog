import { classnames } from "hyl-utils";
import { useRedux } from "@/hooks";
import "./style.scss";
import Banner from "./Banner";
import Toolbar from "./Toolbar";

function Plate({ children, id, ...props }: PlateProps) {
  return (
    <>
      <Banner {...props} />
      <div className="plate-content" id={id}>
        {children}
      </div>
    </>
  );
}

const Main = ({ children, id }) => {
  const { store } = useRedux();
  return (
    <div id={id} className={classnames("main", { "box-shadow": !store.dark })}>
      {children}
    </div>
  );
};

Plate.Main = Main;
Plate.List = ({ children }) => <div className="list">{children}</div>;
Plate.Toolbar = Toolbar;

export default Plate;
