import {
  eliminateChampsFromLs,
  getExistingChamps,
  removeChampFromLS,
} from "./localStorage.js";
import { champs, searchChampion } from "./fetchAPI.js";
import { normalizeString } from "./utilities.js";

// TRANSFORMO ETIQUETAS A UN STRING
export function getTags(tagsList) {
  return tagsList.join(" ");
}

// RENDERIZO EL CAMPEON
export function showChampion(champion) {
  const SECTION_MAIN = document.getElementById("sectionCard");

  const SECTION_CARD = document.createElement("section");
  SECTION_CARD.innerHTML = "";
  SECTION_CARD.className = "card";
  SECTION_MAIN.appendChild(SECTION_CARD);

  const CARD_CONTENT = document.createElement("section");
  CARD_CONTENT.className = "cardContent";
  SECTION_CARD.appendChild(CARD_CONTENT);

  const DIV_CONTENT = document.createElement("div");
  DIV_CONTENT.className =
    "absolute bottom-1 left-[5px] p-3 w-[calc(100%-10px)] bg-gradient-to-t from-bgDivCard bg-opacity-90 flex flex-col gap-[2px]";

  if (champion.image.sprite) {
    const CHAMP_IMG = document.createElement("img");
    CHAMP_IMG.className = "object-contain";
    CHAMP_IMG.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_0.jpg`;
    CARD_CONTENT.appendChild(CHAMP_IMG);
  }

  if (champion.name) {
    const CHAMP_NAME = document.createElement("p");
    CHAMP_NAME.className = "text-button font-bold";
    CHAMP_NAME.innerHTML = champion.name;
    DIV_CONTENT.appendChild(CHAMP_NAME);
  }

  if (champion.title) {
    const CHAMP_TITLE = document.createElement("p");
    CHAMP_TITLE.className = "text-colorTextCard";
    CHAMP_TITLE.innerHTML = champion.title;
    DIV_CONTENT.appendChild(CHAMP_TITLE);
  }

  if (champion.info.attack) {
    const SECTION_ATTACK = document.createElement("section");
    const CHAMP_ATTACK = document.createElement("p");
    const IMG_ATTACK = document.createElement("img");

    SECTION_ATTACK.className = "flex flex-row gap-2 text-colorTextCard";
    IMG_ATTACK.src = "./public/espada.png";
    CHAMP_ATTACK.innerHTML = champion.info.attack;
    SECTION_ATTACK.appendChild(IMG_ATTACK);
    SECTION_ATTACK.appendChild(CHAMP_ATTACK);
    DIV_CONTENT.appendChild(SECTION_ATTACK);
  }

  if (champion.info.defense) {
    const SECTION_DEFENSE = document.createElement("section");
    const CHAMP_DEFENSE = document.createElement("p");
    const IMG_DEFENSE = document.createElement("img");

    SECTION_DEFENSE.className = "flex flex-row gap-2 text-colorTextCard";
    IMG_DEFENSE.src = "./public/blindaje.png";
    CHAMP_DEFENSE.innerHTML = champion.info.defense;
    SECTION_DEFENSE.appendChild(IMG_DEFENSE);
    SECTION_DEFENSE.appendChild(CHAMP_DEFENSE);
    DIV_CONTENT.appendChild(SECTION_DEFENSE);
  }

  if (champion.info.difficulty) {
    const SECTION_DIFFICULTY = document.createElement("section");
    const CHAMP_DIFFICULTY = document.createElement("p");
    const IMG_DIFFICULTY = document.createElement("img");

    SECTION_DIFFICULTY.className = "flex flex-row gap-2 text-colorTextCard";
    IMG_DIFFICULTY.src = "./public/flecha-hacia-arriba.png";
    CHAMP_DIFFICULTY.innerHTML = champion.info.difficulty;
    SECTION_DIFFICULTY.appendChild(IMG_DIFFICULTY);
    SECTION_DIFFICULTY.appendChild(CHAMP_DIFFICULTY);
    DIV_CONTENT.appendChild(SECTION_DIFFICULTY);
  }

  if (champion.info.magic) {
    const SECTION_MAGIC = document.createElement("section");
    const CHAMP_MAGIC = document.createElement("p");
    const IMG_MAGIC = document.createElement("img");

    SECTION_MAGIC.className = "flex flex-row gap-2 text-colorTextCard";
    IMG_MAGIC.src = "./public/encendiendo.png";
    CHAMP_MAGIC.innerHTML = champion.info.magic;
    SECTION_MAGIC.appendChild(IMG_MAGIC);
    SECTION_MAGIC.appendChild(CHAMP_MAGIC);
    DIV_CONTENT.appendChild(SECTION_MAGIC);
  }

  if (champion.tags && Array.isArray(champion.tags)) {
    const CHAMP_TAGS = document.createElement("p");

    CHAMP_TAGS.className = "text-tags";
    CHAMP_TAGS.innerHTML = getTags(champion.tags);
    DIV_CONTENT.appendChild(CHAMP_TAGS);
  }

  const DELETE_CHAMP = document.createElement("button");
  DELETE_CHAMP.className = "text-textButtonEliminate pt-1 hover:text-button";
  DELETE_CHAMP.innerHTML = "ELIMINAR";
  DELETE_CHAMP.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.parentNode.remove();
    removeChampFromLS(champion);
  });

  DIV_CONTENT.appendChild(DELETE_CHAMP);
  CARD_CONTENT.appendChild(DIV_CONTENT);
}

// ELIMINA TODOS LOS CAMPEONES RENDERIZADOS
function deleteAllChampions() {
  const SECTION_MAIN = document.getElementById("sectionCard");

  while (SECTION_MAIN.firstChild) {
    SECTION_MAIN.removeChild(SECTION_MAIN.firstChild);
  }
}

export async function createSuggestion(partialName) {
  const champions = await champs();
  const normalizedPartialName = normalizeString(partialName);

  const names = Object.keys(champions);

  const filteredChamps = names.filter((name) => {
    return name.toLowerCase().includes(normalizedPartialName);
  });

  if (filteredChamps.length > 5) {
    filteredChamps.splice(5, filteredChamps.length - 5);
  }
  const suggestions = document.getElementById("suggestions");

  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.lastChild);
  }

  if (!partialName) {
    return;
  }

  filteredChamps.forEach((champ) => {
    const suggestion = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("p");

    img.alt = champ;
    img.src = `https://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${champ}.png`;

    suggestion.className =
      "text-colorTextCard w-1/4 pl-2 suggestion flex flex-row gap-2 w-full";

    name.innerHTML = champ;

    suggestion.addEventListener("click", (e) => {
      const input = document.getElementById("input");
      searchChampion(champions[champ].name);
      input.value = "";
      e.target.parentNode.innerHTML = "";
    });

    suggestion.appendChild(img);
    suggestion.appendChild(name);
    suggestions.appendChild(suggestion);
  });
}

const BUTTON_LS = document.getElementById("button");
BUTTON_LS.addEventListener("click", () => {
  // LIMPIO EL LOCALSTORAGE Y EL RENDERIZADO
  eliminateChampsFromLs();
  deleteAllChampions();
});

// AL CARGAR SE RENDERIZAN LOS CAMPEONES QUE ESTAN EN LOCAL STORAGE
window.onload = () => {
  const existingChamps = getExistingChamps();

  existingChamps.forEach((champ) => {
    showChampion(champ);
  });
};
