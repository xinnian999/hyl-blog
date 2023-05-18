import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks";
import Nav from "./PC/Nav";
import MobileNav from "./Moblie/MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import Weather from "./PC/Weather";
import MoreItems from "./PC/MoreItems";

function Header() {
  const navigate = useNavigate();

  const { width } = useWindowSize();

  const goHome = () => navigate("/home");

  return (
    <HeaderWrapper>
      <div className="main">
        {width < 800 && <MobileNav />}
        <Logo onClick={goHome}>{globalConfig.title}</Logo>
        {width > 800 && <Weather />}
        {width > 800 && <Nav />}
        <MoreItems />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
