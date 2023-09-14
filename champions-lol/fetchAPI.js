import { getChampLocalStorage, getExistingChamps } from "./localStorage.js";
import { showChampion } from "./DOM.js";

//PIDO LA INFORMACIÓN A LA API DE RIOT GAMES DE TODOS LOS CAMPEONES
async function champs() {
  try {
    const PROMISE = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/13.17.1/data/es_AR/champion.json"
    );
    const RESPONSE = await PROMISE.json();

    return RESPONSE.data;
  } catch (error) {
    console.log(error);

    return Toastify({
      text: "Hubo un error al buscar la información",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #C89B3C, #785A28)",
      },
    }).showToast();
  }
}

// BUSCO EN LA INFORMACIÓN DE LA API EL CAMPEÓN SOLICITADO
export async function searchChampion(nameChamp) {
  const CHAMPIONS = await champs();

  if (nameChamp in CHAMPIONS) {
    const CHAMP = CHAMPIONS[nameChamp];

    const existingChamps = getExistingChamps();

    const isAlreadyInLocalStorage = existingChamps.some((champ) => {
      return champ.name === CHAMP.name;
    });

    // SI YA EXISTE EN EL LOCAL STORAGE, MUESTRO UN MENSAJE DE ERROR
    if (isAlreadyInLocalStorage) {
      return Toastify({
        text: "El campeón ya está siendo comparado",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #C89B3C, #785A28)",
        },
      }).showToast();
    }

    getChampLocalStorage(CHAMP);

    return showChampion(CHAMP);
  } else {
    // SI EL CAMPEON NO SE ENCUENTRA EN EL LISTADO, MUESTRO UN MENSAJE DE ERROR
    return Toastify({
      text: "No se encontró al campeón",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #005A82, #0A323C)",
      },
    }).showToast();
  }
}
