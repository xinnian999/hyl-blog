import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import Weather from "./Weather";
import MoreItems from "../Header/MoreItems";

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
        <MoreItems />
      </div>
    </HeaderWrapper>
  );
}

export default Header;
