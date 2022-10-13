import { useContext, useEffect } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components";
import ducky from "../static/DuckyPlayer.png";
import wallSprite from "../static/wall2.png";
import enemySprite from "../static/enemy.png";

let EnemyDiv = styled.div.attrs((props) => ({
  style: {
    left: props.enemy.position.x,
    top: props.enemy.position.y,
    height: 50,
    width: 50,
  },
}))`
  position: absolute;
`;

let WallDiv = styled.div.attrs((props) => ({
  style: {
    left: props.wall.position.x,
    top: props.wall.position.y,
    height: 50,
    width: 50,
  },
}))`
  position: absolute;
`;

let CharacterDiv = styled.div.attrs((props) => ({
  style: {
    left: props.position.x,
    top: props.position.y,
    height: 100,
    width: 100,
  },
}))`
  position: absolute;
`;

const MapCreator = () => {
  const unitSize = 50;

  const { state, dispatch } = useContext(LevelMakerContext);


  const enemies = state.mapData.enemies.map((enemy) => {
    return (
      <EnemyDiv key={enemy._id} enemy={enemy}>
        <img
          src={enemySprite}
          alt=""
          height={unitSize + 20}
          width={unitSize + 35}
          style={{ position: "absolute", left: "-20px", top: "-10px" }}
        />
      </EnemyDiv>
    );
  });

  const walls = state.mapData.walls.map((wall) => {
    return (
      <WallDiv key={wall._id} wall={wall}>
        <img
          src={wallSprite}
          alt=""
          height={unitSize + 15}
          width={unitSize + 15}
          style={{ position: "absolute", left: "-10px", top: "-6px" }}
        />
      </WallDiv>
    );
  });

  return (
    <>
      {state.mapData.enemies.length ? enemies : null}
      {state.mapData.walls.length ? walls : null}
      {state.mapData.player.length ? (
        <CharacterDiv position={state.mapData.player[0].position}>
          {" "}
          <img src={ducky} alt="" height={100} width={100} />{" "}
        </CharacterDiv>
      ) : null}
    </>
  );
};

export default MapCreator;
