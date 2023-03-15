import { useLocation, useNavigate } from "react-router-dom";
import { useScroll } from "@/hooks";
import Login from "./Login";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const { top } = useScroll();

  const goHome = () => navigate("/home");

  return (
    <HeaderWrapper scrollTop={top} pathname={location.pathname}>
      <div className="main">
        <MobileNav />
        <Logo onClick={goHome}>{globalConfig.title}</Logo>
        <Nav />
        <Login />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
