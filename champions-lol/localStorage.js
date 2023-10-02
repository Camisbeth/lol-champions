// GUARDAMOS AL CAMPEON BUSCADO EN LOCAL STORAGE
export function getChampLocalStorage(champ) {
  const existingChamps = getExistingChamps();

  existingChamps.push(champ);

  localStorage.setItem("champs", JSON.stringify(existingChamps));
}

export function getAllChampionsLocalStorage() {
  const champs = localStorage.getItem("api");

  if (champs) {
    return JSON.parse(champs);
  }

  return;
}

export function saveAllChampsData(data) {
  localStorage.setItem("api", JSON.stringify(data));
}

export function eliminateChampsFromLs() {
  localStorage.removeItem("champs");

  return Toastify({
    text: "Campeones eliminados correctamente",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #C89B3C, #785A28)",
    },
  }).showToast();
}

export function eliminateLS() {
  localStorage.clear();
}

// TRAIGO LA INFORMACIÓN DE LOS CAMPEONES GUARDADA EN LOCALSTORAGE
export function getExistingChamps() {
  const existingChamps = JSON.parse(localStorage.getItem("champs")) || [];

  return existingChamps;
}

// ELIMINO EL CAMPEON RECIBIDO POR PARÁMETRO DEL LOCAL STORAGE
export function removeChampFromLS(targetChamp) {
  const existingChamps = getExistingChamps();

  const filteredChamps = existingChamps.filter(
    (champ) => champ.name !== targetChamp.name
  );

  localStorage.setItem("champs", JSON.stringify(filteredChamps));

  return Toastify({
    text: `${targetChamp.name} eliminado correctamente`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #C89B3C, #785A28)",
    },
  }).showToast();
}
