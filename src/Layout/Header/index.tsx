import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks";
import Login from "./Login";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import Weather from "./Weather";
import Search from "./Search";

function Header() {
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  const goHome = () => navigate("/home");

  return (
    <HeaderWrapper>
      <div className="main">
        {windowSize.width < 800 && <MobileNav />}
        <Logo onClick={goHome}>{globalConfig.title}</Logo>
        {windowSize.width > 800 && <Weather />}
        {windowSize.width > 800 && <Nav />}
        {windowSize.width > 800 && <Search />}
        <Login />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
