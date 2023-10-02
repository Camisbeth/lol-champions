export function normalizeChamp(champ) {
  const WITHOUT_SPACES = champ.toLocaleLowerCase().replace(" ", "");
  const NORMALIZED_CHAMP =
    WITHOUT_SPACES[0].toUpperCase() + WITHOUT_SPACES.slice(1);

  return NORMALIZED_CHAMP;
}

export function normalizeString(string) {
  const NORMALIZED_STRING = string.toLocaleLowerCase().replace(" ", "");

  return NORMALIZED_STRING;
}
