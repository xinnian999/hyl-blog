import { useLocation, useNavigate } from "react-router-dom";
import { useScroll } from "@/hooks";

import Login from "./Login";
import Nav from "./Nav";
import IphoneNav from "./IphoneNav";
import "./style.scss";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const { top } = useScroll();

  return (
    <header
      id={top > 1 ? "headerTop" : ""}
      style={{ display: location.pathname === "/home" ? "none" : "block" }}
    >
      <div className="center">
        <IphoneNav />

        <div id="logo" onClick={() => navigate("/home")}>
          <span>{globalConfig.title}</span>
        </div>

        <div className="user">
          <Login />
        </div>

        <Nav />
      </div>
    </header>
  );
}

export default Header;
