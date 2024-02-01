export default function DiagnosisToStringInLine(diagnosis) {
  let mainString = "";
  let propertyString = "";
  let complicationString = "";
  if (Object.keys(diagnosis.mainDisease).length > 0) {
    mainString = diagnosis.mainDisease.name;
  }
  for (let key in diagnosis.properties) {
    propertyString = propertyString + " " + diagnosis.properties[key].name;
  }
  for (let element of diagnosis.complications) {
    complicationString = complicationString + " " + element.name;
  }
  return mainString + " " + propertyString + " " + complicationString;
}
