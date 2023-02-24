import { useNavigate } from "react-router-dom";
import menus from "@/router";
import Login from "./Login";
import "./style.scss";
import NavItem from "./NavLink";

function Header({ style }) {
  const navigate = useNavigate();

  const goHome = () => navigate("/home");

  return (
    <header style={style}>
      <div className="center">
        <div id="logo" onClick={goHome}>
          <span>心念の空间站</span>
        </div>

        <div className="user">
          <Login />
        </div>
        <ul id="nav">
          {menus
            .filter((item) => item.title)
            .map((item: any) => (
              <NavItem key={item.title} {...item} />
            ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
