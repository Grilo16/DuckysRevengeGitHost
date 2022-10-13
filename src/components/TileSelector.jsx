import { useContext, useEffect } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components";
import Tile from "./Tile";
import ducky from "../static/DuckyPlayer.png";
import wallSprite from "../static/wall2.png";
import enemySprite from "../static/enemy.png";
import playGame from "../static/playagame.png";
import homeLogo from "../static/home.png";

const TileSelectorDiv = styled.div.attrs((props) => ({
  style: {
    left: props.position.x - 150,
    top: props.position.y - 200,
  },
}))`
  position: absolute;
  background-color: rgb(120, 110, 190);
  height: 420px;
  width: 300px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 50px;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 4vh;
`;

const TileSelector = () => {
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
      <TileSelectorDiv position={state.tileSelectorPosition}>
        <form>
          <label htmlFor="map-name">Name your map!</label>
          <br />
          <input
            onChange={handleInput}
            type="text"
            id="map-name"
            value={state.mapData.name ? state.mapData.name : " "}
          />
          <br />
          <button onClick={checkValidMap}>Save map</button>
        </form>
        {unitTypes}
        <ContentDiv>
          <div>
            <a href="/">
              <img
                src={homeLogo}
                height={120}
                width={120}
                style={{
                  backgroundColor: "rgb(20, 20, 20)",
                  borderRadius: "20px",
                }}
              />
            </a>
          </div>

          <div>
            <a href="/game">
              <img
                src={playGame}
                height={120}
                style={{
                  backgroundColor: "rgb(20, 20, 20)",
                  borderRadius: "20px",
                }}
              />
            </a>
          </div>
        </ContentDiv>
      </TileSelectorDiv>
    </>
  );
};

export default TileSelector;
