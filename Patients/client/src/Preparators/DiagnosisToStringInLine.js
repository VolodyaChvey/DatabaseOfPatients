export default function DiagnosisToStringInLine(diagnosis){
    let propertyString = "";
    let complicationString = "";
    for (let key in diagnosis.properties) {
      propertyString = propertyString + " " + diagnosis.properties[key];
    }
    for (let element of diagnosis.complications) {
      complicationString = complicationString + " " + element;
    }
    return diagnosis.main + " "
      + propertyString + " "
      + complicationString
}