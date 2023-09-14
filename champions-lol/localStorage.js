// GUARDAMOS AL CAMPEON BUSCADO EN LOCAL STORAGE
export function getChampLocalStorage(champ) {
  const existingChamps = getExistingChamps();

  existingChamps.push(champ);

  localStorage.setItem("champs", JSON.stringify(existingChamps));
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
}
