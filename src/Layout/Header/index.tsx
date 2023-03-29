import { useNavigate } from "react-router-dom";
import { useScroll, useWindowSize } from "@/hooks";
import Login from "./Login";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import Weather from "./Weather";

function Header() {
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  const { top } = useScroll();

  const goHome = () => navigate("/home");

  return (
    <HeaderWrapper scrollTop={top}>
      <div className="main">
        <MobileNav />
        <Logo onClick={goHome}>{globalConfig.title}</Logo>
        {windowSize.width > 800 && <Weather />}
        {windowSize.width > 800 && <Nav />}
        <Login />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
