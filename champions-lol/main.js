import { searchChampion } from "./fetchAPI.js";

// NORMALIZO Y COMIENZO LA BUSQUEDA Y RENDERIZADO DEL CAMPEON SOLICITADO
function logKey(e) {
  if (e.key == "Enter") {
    const DATA_CHAMP = e.target.value;

    const WITHOUT_SPACES = DATA_CHAMP.toLocaleLowerCase().replace(" ", "");
    const NORMALIZED_CHAMP =
      WITHOUT_SPACES[0].toUpperCase() + WITHOUT_SPACES.slice(1);

    searchChampion(NORMALIZED_CHAMP);

    e.target.value = "";
  }
}

const input = document.getElementById("input");
input.addEventListener("keydown", (e) => logKey(e));
