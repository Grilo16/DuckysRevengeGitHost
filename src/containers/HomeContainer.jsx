import styled from "styled-components";
import gameTitle from "../static/gameTitle.png";
import startGame from "../static/playagame.png";
import createMap from "../static/createamap.png";

const HomeDiv = styled.div`
  position: absolute;
  top: 50px;
  background-color: rgb(120, 110, 190);
  height: 90vh;
  width: 90%;
  margin-left: 5%;
  border-radius: 50px;
  text-align: center;
  padding-top: 1px;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20vh;
`;

const HomeContainer = () => {
  return (
    <HomeDiv>
      <h2>Welcome to </h2>
      <hr />
      <img src={gameTitle} alt="" style={{ marginLeft: "50px" }} />
      <hr />

      <ContentDiv>
        <a href="/game">
          <img
            src={startGame}
            alt=""
            style={{
              marginLeft: "50px",
              backgroundColor: "rgb(20, 20, 20)",
              borderRadius: "20px",
            }}
          />
        </a>

        <a href="/levelmaker">
          <img
            src={createMap}
            alt=""
            style={{
              marginLeft: "50px",
              backgroundColor: "rgb(20, 20, 20)",
              borderRadius: "20px",
            }}
          />
        </a>
      </ContentDiv>
    </HomeDiv>
  );
};
export default HomeContainer;
