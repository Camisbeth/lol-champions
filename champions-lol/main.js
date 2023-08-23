// HAGO EL PEDIDO DEL INGRESO DE NOMBRE DE NUESTRO CAMPEON PARA BUSCAR LA INFORMACION DEL MISMO Y PODER COMPARARLO.

function logKey(e) {
  if (e.key == "Enter") {
    const DATA_CHAMP = e.target.value;

    const NORMALIZED_CHAMP = DATA_CHAMP.toLocaleLowerCase().replace(" ", "");

    searchChampion(NORMALIZED_CHAMP);

    e.target.value = "";
  }
}

const input = document.getElementById("input");
input.addEventListener("keydown", (e) => logKey(e));

// LLAMO AL BOTON Y CREO LA FUNCION DE ELIMINAR INFORMACION DEL LOCAL STORAGE
function eliminateLS() {
  localStorage.clear();
}

const BUTTON_LS = document.getElementById("button");
BUTTON_LS.addEventListener("click", eliminateLS);

// PREGUNTO SI EXISTE EL CAMPEON EN NUESTRA "BASE DE DATOS"
function searchChampion(nameChamp) {
  if (nameChamp in champs) {
    const CHAMP = champs[nameChamp];

    getChampLocalStorage(CHAMP);

    showChampion();
  } else {
    alert("No se encontró el campeón! :(");
  }
}

// GUARDAMOS AL CAMPEON EN LOCAL STORAGE PARA GENERAR UN POTENCIAL "HISTORIAL DE BUSQUEDA", LO RECORREMOS Y MOSTRAMOS LOS DOS ULTIMOS:
function getChampLocalStorage(champ) {
  const existingChamps = JSON.parse(localStorage.getItem("champs")) || [];
  existingChamps.push(champ);
  localStorage.setItem("champs", JSON.stringify(existingChamps));
}

// RECORRO EL ARRAY PARA TRAER LAS ETIQUETAS DE SU ESPECIALIDAD
function getTags(tagsList) {
  return tagsList.join(" ");
}

// MUESTRO EN PANTALLA A LOS DOS CAMPEONES SELECCIONADOS PARA PODER COMPARARLOS
function showChampion() {
  const SECTION_CARD = document.getElementById("sectionCard");
  const CHAMP = JSON.parse(localStorage.getItem("champs"));

  SECTION_CARD.innerHTML = "";

  CHAMP.forEach((CHAMP) => {
    if (CHAMP.name) {
      const CHAMP_NAME = document.createElement("p");
      CHAMP_NAME.innerHTML = CHAMP.name;
      SECTION_CARD.appendChild(CHAMP_NAME);
    }

    if (CHAMP.title) {
      const CHAMP_TITLE = document.createElement("p");
      CHAMP_TITLE.innerHTML = CHAMP.title;
      SECTION_CARD.appendChild(CHAMP_TITLE);
    }

    if (CHAMP.blurb) {
      const CHAMP_BLURB = document.createElement("p");
      CHAMP_BLURB.innerHTML = CHAMP.blurb;
      SECTION_CARD.appendChild(CHAMP_BLURB);
    }

    if (CHAMP.tags && Array.isArray(CHAMP.tags)) {
      const CHAMP_TAGS = document.createElement("p");

      // EN ESTA PARTE HAGO UNA PEQUEÑA BÚSQUEDA Y FILTRADO EN EL ARRAY DE TAGS, PARA "PINTAR" DE UN COLOR AZUL A LOS CAMPEONES MAGOS. ESTO LO PIENSO ESCALAR, EVENTUALMENTE, CUANDO TRABAJE CON LA API.

      // BUSCO LA COINCIDENCIA DEL TAG CON MAGO:
      const TAG_EXISTS = CHAMP.tags.some((tag) =>
        tag.toLocaleLowerCase().includes("mage")
      );

      // SI ALGUNO DE LOS TAGS COINCIDE, APLICO EL COLOR AZUL AL TAG:
      const COLOR_STYLE = TAG_EXISTS ? "color: blue" : "";

      CHAMP_TAGS.style = COLOR_STYLE;
      CHAMP_TAGS.innerHTML = getTags(CHAMP.tags);
      SECTION_CARD.appendChild(CHAMP_TAGS);
    }
  });
}
