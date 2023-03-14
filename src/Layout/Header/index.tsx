import { useLocation, useNavigate } from "react-router-dom";
import { useScroll } from "@/hooks";

import Login from "./Login";
import Nav from "./Nav";
import IphoneNav from "./IphoneNav";
import { HeaderWrapper } from "./styled";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const { top } = useScroll();

  return (
    <HeaderWrapper scrollTop={top} pathname={location.pathname}>
      <div className="center">
        <IphoneNav />

        <div id="logo" onClick={() => navigate("/home")}>
          <span>{globalConfig.title}</span>
        </div>
        <Nav />

        <div className="user">
          <Login />
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
