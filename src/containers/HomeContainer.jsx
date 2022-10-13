import { Link } from "react-router-dom";
import styled from "styled-components";
import gameTitle from "../static/gameTitle.png";
import startGame from "../static/playagame.png";
import createMap from "../static/createamap.png";
import { useEffect } from "react";
import gameRepo from "../repositories/gameRepo";


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

  useEffect(()=>{
    gameRepo.loadMapsToStorage()

  }, [])


  return (
    <HomeDiv>
      <h2>Welcome to </h2>
      <hr />
      <img src={gameTitle} alt="" style={{ marginLeft: "50px" }} />
      <hr />

      <ContentDiv>
        <Link to="/game" onClick={()=>setTimeout(function () {window.location.reload()},50)}>
          <img
            src={startGame}
            alt=""
            style={{
              marginLeft: "50px",
              backgroundColor: "rgb(20, 20, 20)",
              borderRadius: "20px",
            }}
          />
        </Link>
   
        <Link to="/levelmaker" onClick={()=>setTimeout(function () {window.location.reload()},50)}>
          <img
            src={createMap}
            alt=""
            style={{
              marginLeft: "50px",
              backgroundColor: "rgb(20, 20, 20)",
              borderRadius: "20px",
            }}
          />
        </Link>
      </ContentDiv>
    </HomeDiv>
  );
};
export default HomeContainer;
