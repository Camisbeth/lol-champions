import { searchChampion } from "./fetchAPI.js";
import { createSuggestion } from "./DOM.js";
import { normalizeChamp } from "./utilities.js";

// NORMALIZO Y COMIENZO LA BUSQUEDA Y RENDERIZADO DEL CAMPEON SOLICITADO
async function logKey(e) {
  const DATA_CHAMP = e.target.value;

  await createSuggestion(e.target.value);

  if (DATA_CHAMP.length === 0) return;

  const NORMALIZED_CHAMP = normalizeChamp(DATA_CHAMP);

  if (e.key == "Enter") {
    searchChampion(NORMALIZED_CHAMP);
    e.target.value = "";

    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";
  }
}

const input = document.getElementById("input");
input.addEventListener("keyup", (e) => logKey(e));
