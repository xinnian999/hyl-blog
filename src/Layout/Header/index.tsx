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
      <div id="center">
        <div id="logo" onClick={goHome}>
          <span>心念の空间站</span>
        </div>

        <div className="user">
          <Login />
        </div>
        <ul id="nav">
          {menus.map((item: any) => (
            <NavItem {...item} />
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
