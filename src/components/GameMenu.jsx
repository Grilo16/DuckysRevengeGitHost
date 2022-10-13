import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../containers/GameContainer";
import gameRepo from "../repositories/gameRepo";
import createMap from "../static/createamap.png";
import homeLogo from "../static/home.png";

const GameMenuDiv = styled.div.attrs((props) => ({
  style: {
    top: props.position.y - 150,
    left: props.position.x - 150,
  },
}))`
  position: absolute;
  background-color: rgb(120, 110, 190);
  height: 300px;
  width: 420px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 50px;
`;

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2vh;
  margin-left: 2vh;
`;

const GameMenu = ({ myRef, executeScroll }) => {
  const { state, dispatch } = useContext(AppContext);

  const maps = state.mapList.map((mapObj) => {
    return (
      <option key={mapObj._id} value={mapObj._id}>
        {mapObj.name}
      </option>
    );
  });

  const handleMapSelection = (e) => {
    e.preventDefault();
    const newMap = gameRepo.getMapById(state.nextMapId)
    dispatch({ type: "LoadMap", res : newMap })
    setTimeout(function () {
      executeScroll(myRef);
    }, 50);
    dispatch({ type: "ToggleGameMenu" });
  };

  return (
    <GameMenuDiv position={state.playerPosition}>
      <h1>Change Map</h1>
      <form>
        <select
          onChange={(e) =>
            dispatch({ type: "PreLoadNextMap", map: e.target.value })
          }
          name=""
          id=""
        >
          <option value=""></option>
          {maps.length ? maps : null}
        </select>
      </form>
      <p
        onClick={handleMapSelection}
        style={{
          backgroundColor: "rgb(100,0,255)",
          width: "25%",
          marginLeft: "37.5%",
          borderRadius: "10px",
        }}
      >
        Load Map
      </p>
      <hr />
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
          <a href="/levelmaker">
            <img
              src={createMap}
              height={120}
              style={{
                backgroundColor: "rgb(20, 20, 20)",
                borderRadius: "20px",
              }}
            />
          </a>
        </div>
      </ContentDiv>
    </GameMenuDiv>
  );
};

export default GameMenu;
