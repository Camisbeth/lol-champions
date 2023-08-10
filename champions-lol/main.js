// HAGO EL PEDIDO DEL INGRESO DE NOMBRE DE NUESTRO CAMPEON PARA BUSCAR LA INFORMACION DEL MISMO Y PODER COMPARARLO
const DATA_FIRST_CHAMPS = prompt("Ingrese nombre para comparar campeones:");

const DATA_SECOND_CHAMPS = prompt("Ingrese nombre para comparar campeones:");

// NORMALIZO LA ENTRADA DE DATOS PARA QUE PUEDA ENCONTRARLOS DENTRO DEL ARRAY.
const NORMALIZED_FIRST_NAME = DATA_FIRST_CHAMPS.toLocaleLowerCase().replace(
  " ",
  ""
);
const NORMALIZED_SECOND_NAME = DATA_SECOND_CHAMPS.toLocaleLowerCase().replace(
  " ",
  ""
);

// PREGUNTAMOS SI EXISTE EL CAMPEON EN NUESTRA "BASE DE DATOS"
function searchChampion(nameChamp) {
  if (nameChamp in champs) {
    const CHAMP = champs[nameChamp];
    showChampion(CHAMP);
  } else {
    alert("No se encontró el campeón! :(");
  }
}

// RECORRO EL ARRAY PARA TRAER LAS ETIQUETAS DE SU ESPECIALIDAD
function getTags(tagsList) {
  return tagsList.join(" ");
}

// MUESTRO EN PANTALLA A LOS DOS CAMPEONES SELECCIONADOS PARA PODER COMPARARLOS
function showChampion(champ) {
  const SECTION_CARD = document.getElementById("sectionCard");

  if (champ.name) {
    const CHAMP_NAME = document.createElement("p");
    CHAMP_NAME.innerHTML = champ.name;
    SECTION_CARD.appendChild(CHAMP_NAME);
  }

  if (champ.title) {
    const CHAMP_TITLE = document.createElement("p");
    CHAMP_TITLE.innerHTML = champ.title;
    SECTION_CARD.appendChild(CHAMP_TITLE);
  }

  if (champ.blurb) {
    const CHAMP_BLURB = document.createElement("p");
    CHAMP_BLURB.innerHTML = champ.blurb;
    SECTION_CARD.appendChild(CHAMP_BLURB);
  }

  if (champ.tags && Array.isArray(champ.tags)) {
    const CHAMP_TAGS = document.createElement("p");

    // EN ESTA PARTE HAGO UNA PEQUEÑA BÚSQUEDA Y FILTRADO EN EL ARRAY DE TAGS, PARA "PINTAR" DE UN COLOR AZUL A LOS CAMPEONES MAGOS. ESTO LO PIENSO ESCALAR, EVENTUALMENTE, CUANDO TRABAJE CON LA API.

    // BUSCO LA COINCIDENCIA DEL TAG CON MAGO:
    const TAG_EXISTS = champ.tags.some((tag) =>
      tag.toLocaleLowerCase().includes("mage")
    );

    // SI ALGUNO DE LOS TAGS COINCIDE, APLICO EL COLOR AZUL AL TAG:
    const COLOR_STYLE = TAG_EXISTS ? "color: blue" : "";

    CHAMP_TAGS.style = COLOR_STYLE;
    CHAMP_TAGS.innerHTML = getTags(champ.tags);
    SECTION_CARD.appendChild(CHAMP_TAGS);
  }
}

searchChampion(NORMALIZED_FIRST_NAME);
searchChampion(NORMALIZED_SECOND_NAME);
