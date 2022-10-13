import { useContext, useEffect, useState } from "react";
import { AppContext } from "../containers/GameContainer";
import styled from "styled-components";
import projectileSprite from "../static/projectile-black-hole.png";

let ProjectileDiv = styled.div.attrs((props) => ({
  style: {
    left: props.startPos.x,
    top: props.startPos.y,
    height: props.projectileSize.height,
    width: props.projectileSize.width,
  },
}))`
  position: absolute;
  background-color: rgb(0, 255, 255);
`;

const Projectile = ({ projectile }) => {
  const { projectileSize, state, dispatch } = useContext(AppContext);
  const [position, setPosition] = useState(projectile.position);

  const moveProjectile = () => {
    let direction = projectile.direction;

    if (direction === "right") {
      setPosition((position) => {
        return { ...position, x: (position.x += 5) };
      });
    } else if (direction === "left") {
      setPosition((position) => {
        return { ...position, x: (position.x -= 5) };
      });
    } else if (direction === "up") {
      setPosition((position) => {
        return { ...position, y: (position.y -= 5) };
      });
    } else if (direction === "down") {
      setPosition((position) => {
        return { ...position, y: (position.y += 5) };
      });
    }
    dispatch({
      type: "CheckHit",
      position: position,
      id: projectile.id,
      direction: projectile.direction,
    });
  };

  useEffect(() => {
    setTimeout(function () {
      dispatch({ type: "ClearLastProjectile", id: projectile.id });
    }, 2000);

    let moveInterval;
    moveInterval = setInterval(moveProjectile, 10);

    return () => {
      clearInterval(moveInterval);
    };
  }, [position]);

  return (
    <>
      <ProjectileDiv projectileSize={projectileSize} startPos={position}>
        <h3>Pew PEW</h3>
        <img
          src={projectileSprite}
          alt=""
          height={25}
          width={25}
          style={{ position: "absolute", left: "-10px", top: "-6px" }}
        />
      </ProjectileDiv>
    </>
  );
};

export default Projectile;
