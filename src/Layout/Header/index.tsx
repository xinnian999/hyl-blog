import { useLocation, useNavigate } from "react-router-dom";
import { useScroll } from "@/hooks";
import { router } from "@/config";
import Login from "./Login";
import NavItem from "./NavLink";
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
        <ul id="nav">
          {router
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
