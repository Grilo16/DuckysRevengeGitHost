import { useContext } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components";

let TileSelectDiv = styled.div`
  margin-top: 20px;
  margin-left: 2%;
`;

const Tile = ({ type, img }) => {
  const { dispatch } = useContext(LevelMakerContext);

  const tileSize = ((window.innerWidth/100 * 5) + (window.innerHeight/100 * 5)/2) -20 ;

  return (
    <>
      <TileSelectDiv
        onClick={() => {
          dispatch({ type: "SelectTileType", tileType: type });
        }}
      >
        <img
          src={img}
          alt=""
          height={tileSize}
          width={tileSize}
          style={{ margin: "0px" }}
        />
      </TileSelectDiv>
    </>
  );
};

export default Tile;
