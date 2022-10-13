import { useContext } from "react";
import { AppContext } from "../containers/GameContainer";
import styled from "styled-components";
import wallSprite from "../static/wall2.png";

let WallDiv = styled.div.attrs((props) => ({
  style: {
    left: props.position.x,
    top: props.position.y,
    height: props.dimensions.height,
    width: props.dimensions.width,
  },
}))`
  position: absolute;
`;

const Walls = ({ wall }) => {
  const { unitSize } = useContext(AppContext);

  return (
    <WallDiv position={wall.position} dimensions={unitSize}>
      <img
        src={wallSprite}
        alt=""
        height={unitSize.height + 15}
        width={unitSize.width + 15}
        style={{ position: "absolute", left: "-10px", top: "-6px" }}
      />
    </WallDiv>
  );
};

export default Walls;
