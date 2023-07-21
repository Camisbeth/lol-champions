const DATA_CHAMPS = prompt(
  "LOL Champions! \nIngrese nombre para conocer sus habilidades:"
);

const NORMALIZED_NAME = DATA_CHAMPS.toLocaleLowerCase().replace(" ", "");

if (NORMALIZED_NAME in champs) {
  const CHAMP = champs[NORMALIZED_NAME];
  alert(
    `${CHAMP.name} \n${CHAMP.title} \n${CHAMP.blurb} \n${getTags(CHAMP.tags)}`
  );
} else {
  alert("No se encontró el campeón! :(");
}

function getTags(tagsList) {
  let tags = "";

  for (let i = 0; i < tagsList.length; i++) {
    tags += tagsList[i] + " ";
  }

  return tags;
}
