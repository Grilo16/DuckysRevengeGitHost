import { useContext } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components";
import ducky from "../static/DuckyPlayer.png";
import wallSprite from "../static/wall2.png";
import enemySprite from "../static/enemy.png";

const MouseTileDiv = styled.div.attrs((props) => ({
  style: {
    top: props.mousePosition.y,
    left: props.mousePosition.x,
  },
}))`
  position: absolute;
`;
const MouseTile = () => {
  const { state, dispatch } = useContext(LevelMakerContext);

  const tileSize = 50;
  const tileType = state.selectedTile.tileType;

  return (
    <MouseTileDiv mousePosition={state.selectedTile.position}>
      {tileType === "player" ? (
        <img src={ducky} alt="" height={tileSize + 50} width={tileSize + 50} />
      ) : null}
      {tileType === "enemy" ? (
        <img
          src={enemySprite}
          alt=""
          height={tileSize + 20}
          width={tileSize + 35}
          style={{ position: "absolute", left: "-20px", top: "-10px" }}
        />
      ) : null}
      {tileType === "wall" ? (
        <img
          src={wallSprite}
          alt=""
          height={tileSize + 15}
          width={tileSize + 15}
          style={{ position: "absolute", left: "-10px", top: "-6px" }}
        />
      ) : null}
    </MouseTileDiv>
  );
};

export default MouseTile;
