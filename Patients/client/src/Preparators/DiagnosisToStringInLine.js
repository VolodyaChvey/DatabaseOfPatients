export default function DiagnosisToStringInLine(diagnosis) {
  let propertyString = "";
  let complicationString = "";
  for (let key in diagnosis.properties) {
    propertyString = propertyString + " " + diagnosis.properties[key].name;
  }
  for (let element of diagnosis.complications) {
    complicationString = complicationString + " " + element.name;
  }
  return (diagnosis.main.name + " " + propertyString + " " + complicationString) ? ""
    : diagnosis.main.name + " " + propertyString + " " + complicationString
}