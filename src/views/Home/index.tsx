import Main from "./Main";
import Side from "./Side";
import styled from "styled-components";
import Banner from "./Banner";

const HomeMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

function Home() {
  return (
    <div id="home">
      <Banner />

      <HomeMain id="homeMain" className="center">
        <Main />
        <Side />
      </HomeMain>
    </div>
  );
}

export default Home;
