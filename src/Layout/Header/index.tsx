import { useLocation, useNavigate } from "react-router-dom";
import { useMount, useScroll } from "@/hooks";
import Login from "./Login";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { HeaderWrapper, Logo } from "./styled";
import { ajax } from "hyl-utils";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const { top } = useScroll();

  const goHome = () => navigate("/home");

  useMount(() => {
    ajax.get(
      "/weather/v3/weather/weatherInfo?key=1848b6f63d2bffe815674d808310bb54&city=110000"
    );
  });

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
