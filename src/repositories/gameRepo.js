import maps from "./maps";

const allMaps = JSON.parse(localStorage.getItem("maps"))

const gameRepo = {
  
  loadMapsToStorage(){
    if (!localStorage.getItem("maps")){
      localStorage.setItem("maps", JSON.stringify(maps))
    }
  },


  getAllMaps() {
    return allMaps
  },

  getMapById(id) {
    console.log(allMaps)
    return allMaps.filter((map) => map._id === id)[0]

  },

  SaveMapToDb(mapObject) {
    const newMaps = [...allMaps, mapObject]
    localStorage.setItem("maps", JSON.stringify(newMaps))
  },


  
};

export default gameRepo;
