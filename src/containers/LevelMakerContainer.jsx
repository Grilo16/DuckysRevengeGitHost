import { createContext, useEffect, useReducer, useRef } from "react";
import MapCreator from "../components/MapCreator";
import MouseTile from "../components/MouseTile";
import TileSelector from "../components/TileSelector";
import gameRepo from "../repositories/gameRepo";
import gameForeground from "../static/GameForeground.png";


export const LevelMakerContext = createContext(null);

const reducer = (state, action) => {

  const checkValidUnitPosition = ()=>{
      if (
        state.selectedTile.position.x > window.innerWidth/100 * 7 &&
        state.selectedTile.position.x < window.innerWidth/100 * 93 &&
        state.selectedTile.position.y > window.innerHeight/100 * 9 &&
        state.selectedTile.position.y < window.innerHeight/100 * 90
      ) {
        return true
      }
      return false
  }

  switch (action.type) {
    case "TrackMousePosition":
      return {
        ...state,
        selectedTile: { ...state.selectedTile, position: action.position },
      };

    case "SelectTileType":
      return {
        ...state,
        selectedTile: { ...state.selectedTile, tileType: action.tileType },
      };

    case "ClearTileType":
      return {
        ...state,
        selectedTile: { ...state.selectedTile, tileType: null },
      };

    case "AddUnitToMap":
      const validPosition = checkValidUnitPosition()
      if (validPosition) {
        if (state.selectedTile.tileType === "enemy") {
          return {
            ...state,
            mapData: {
              ...state.mapData,
              enemies: [
                ...state.mapData.enemies,
                {
                  ...state.selectedTile,
                  _id: Math.floor(Math.random() * Date.now()),
                },
              ],
            },
          };
        } else if (state.selectedTile.tileType === "player") {
          return {
            ...state,
            mapData: {
              ...state.mapData,
              player: [
                {
                  ...state.selectedTile,
                  _id: Math.floor(Math.random() * Date.now()),
                },
              ],
            },
          };
        } else if (state.selectedTile.tileType === "wall") {
          return {
            ...state,
            mapData: {
              ...state.mapData,
              walls: [
                ...state.mapData.walls,
                {
                  ...state.selectedTile,
                  _id: Math.floor(Math.random() * Date.now()),
                },
              ],
            },
          };
        }
      }
      return state;

    case "GetMapName":
      return { ...state, mapData: { ...state.mapData, name: action.mapName } };

    case "SaveMapToDb":
      const id = String(Math.floor( Math.random() * Date.now()))
      gameRepo.SaveMapToDb({...state.mapData, _id: id });
      return {
        ...state,
        mapData: { name: null, enemies: [], walls: [], player: [] },
      };

    default:
      return state;
  }
};

const LevelMakerContainer = () => {
  const initialStates = {
    selectedTile: { tileType: null, position: {} },
    mapData: { name: null, enemies: [], walls: [], player: [] },
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  const myRef = useRef(null);
  const executeScroll = (myRef) =>
    myRef.current.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });


  const trackMouse = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const newPosition = { x: mouseX, y: mouseY };
    dispatch({ type: "TrackMousePosition", position: newPosition });
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    if (key === "Escape") {
      dispatch({ type: "ToggleTileSelector" });
    } else if (key === " ") {
      dispatch({ type: "ClearTileType" });
    }
  };

  const handleClick = () => {
    dispatch({ type: "AddUnitToMap" });
  };


  useEffect(() => {
    setTimeout(function () {
      document.addEventListener("mousemove", trackMouse);
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("click", handleClick);
      executeScroll(myRef)
    }, 500);
  }, []);


  return (
    <>
      <LevelMakerContext.Provider value={{ state, dispatch }}>
        <MapCreator />
        
        <img className="foreground" src={gameForeground} alt="" style={{zIndex: "1"}}/>
        <div ref={myRef} style={{position: "absolute", top: 0, left:0}}></div>
        {state.selectedTile.tileType ? <MouseTile /> : null}
        <TileSelector/>
      </LevelMakerContext.Provider>
    </>
  );
};

export default LevelMakerContainer;




