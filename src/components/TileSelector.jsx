import { useContext, useEffect } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components";
import Tile from "./Tile";
import ducky from "../static/DuckyPlayer.png";
import wallSprite from "../static/wall2.png";
import enemySprite from "../static/enemy.png";
import playGame from "../static/playagame.png";
import homeLogo from "../static/home.png";
import { Link } from "react-router-dom";

const TileSelectorDiv = styled.div.attrs(()=>({
  style: {
    top : window.innerHeight/6 

  }
}))`
  position: absolute;
  background-color: rgb(20, 20, 20);
  height: fit-content;
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  padding-bottom: 1%;
  border-radius: 15px;
  z-index: 3;
  margin-left: 0.3%
  `;
  
  
  const FormDiv = styled.div`
  position: fixed;
  margin-top: 2%;
  text-align: center;
  margin-left 13%;
  width: 70%;
  height: 100%;
  z-index: 2;

`;


const InstructionsDiv = styled.div`
  position: fixed;
  text-align: center;
  top : 90%;
  margin-left 42%;
  z-index: 1;
`


const TileSelector = ({myRef}) => {
  const { state, dispatch } = useContext(LevelMakerContext);


  const unitTypes = [
    { id: 0, type: "player", img: ducky },
    { id: 1, type: "enemy", img: enemySprite },
    { id: 2, type: "wall", img: wallSprite },
  ].map((type) => {
    return <Tile key={type.id} type={type.type} img={type.img}></Tile>;
  });

  const handleInput = (e) => {
    dispatch({ type: "GetMapName", mapName: e.target.value });
  };

  const checkValidMap = (e) => {
    e.preventDefault();
    if (state.mapData.player.length === 1 && state.mapData.name) {
      dispatch({ type: "SaveMapToDb" });
    }
    return;
  };

  return (
    <>
       <FormDiv>
        <form>
          
          <label htmlFor="map-name"><h2 style={{display: "inline"}}>Map name: </h2></label>
            <input
              onChange={handleInput}
              type="text"
              id="map-name"
              value={state.mapData.name ? state.mapData.name : " "}
              style={{width: "30%", display: "inline"}}
              />
            <button onClick={checkValidMap}>Save map</button>
              
            </form> 
        </FormDiv>
      <TileSelectorDiv>
           
           <div>
           
           <a href="https://grilo16.github.io/DuckysRevengeGitHost/">
               <img
             className="home-link"
             src={homeLogo}
             
             height={window.innerHeight/100 * 10}
             width={window.innerWidth/100 * 6.5}
             style={{
               backgroundColor: "rgb(20, 20, 20)",
               borderRadius: "15%",
              }}
              />
            </a>

            <hr />
          </div>

          <div>
          <Link to="/game" onClick={()=>setTimeout(function () {window.location.reload()},50)}>
              <img
                className="play-game-link"
                src={playGame}
                width={window.innerWidth/100 * 6.5}
                style={{
                  backgroundColor: "rgb(20, 20, 20)",
                  borderRadius: "15%",
                }}
                />
            </Link>
          <hr />
          </div>
        {unitTypes}
    </TileSelectorDiv>
    <InstructionsDiv>
      {state.selectedTile.tileType ? 
      <>
      <h2>Click on map to add selected object</h2>
      <p>or press space to clear selection</p>
      </>
      : <h2 style={{marginLeft: "50%", width: "100%"}}>Select an object </h2>
    }
      
    </InstructionsDiv>
    </>
  );
};

export default TileSelector;
