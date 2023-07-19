import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import User from "./User";
import Search from "./Search";

function Header() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <HeaderWrapper>
      <Logo onClick={goHome}>{globalConfig.title}</Logo>
      <Search />
      <Nav />
      <User />
    </HeaderWrapper>
  );
}

export default Header;
