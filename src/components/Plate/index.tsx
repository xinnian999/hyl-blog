import Banner from "./Banner";
import Toolbar from "./Toolbar";
import Main from "./Main";
import "./style.scss";

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

Plate.Main = Main;
Plate.List = ({ children }) => <div className="list">{children}</div>;
Plate.Toolbar = Toolbar;

export default Plate;
