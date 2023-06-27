import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import User from "./User";

function Header() {
  const navigate = useNavigate();

  const { width } = useWindowSize();

  const goHome = () => navigate("/");

  return (
    <HeaderWrapper>
      {width < 800 && <MobileNav />}
      <Logo onClick={goHome}>{globalConfig.title}</Logo>
      {width > 800 && <Nav />}
      <User />
    </HeaderWrapper>
  );
}

export default Header;
