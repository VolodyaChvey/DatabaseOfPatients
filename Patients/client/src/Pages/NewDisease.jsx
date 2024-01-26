import { useLoaderData } from "react-router-dom";
import TextDiagnosis from "../Components/TextDiagnosis";
import TabsDiseases from "../Components/TabsDiseases";
import { useState } from "react";
import { emptyDiagnosis } from "../data";

function NewDisease() {
  const { diseases } = useLoaderData();
  const [diagnosis, setDiagnosis] = useState(emptyDiagnosis);

  function onPrepareDiagnosis({ value, name }) {
    if (!value) { return }
    let addition = value ? value : "";
    if (name === "main") {
      setDiagnosis({ ...diagnosis, main: addition })
    } else {
      diagnosis[name].push(addition)
      setDiagnosis({ ...diagnosis, [name]: diagnosis[name] })
    }
  }

  function showDiagnosisInLine() {
    let propertyString = "";
    let complicationString = "";
    for (let key in diagnosis.property) {
      propertyString = propertyString + " " + diagnosis.property[key];
    }
    for (let key in diagnosis.complication) {
      complicationString = complicationString + " " + diagnosis.complication[key]
    }
    return diagnosis.main + " "
      + propertyString + " "
      + complicationString
  }

  return (
    <>
      <TextDiagnosis diagnosis={showDiagnosisInLine()} />
      <TabsDiseases diseases={diseases} onApply={onPrepareDiagnosis} />
    </>
  );
}

async function getDiseases() {
  try {
    const response = await fetch(`http://localhost:8080/diseases`);
    return response.json();
  } catch (e) {
    return {
      main: [{ name: "ИБС" }, { name: "ХРБС" }],
      property: [{ name: "МА" }, { name: "ФП" }],
      complication: [{ name: "Н1" }, { name: "Н2" }],
    };
  }
}

async function diseasesLoader() {
  const diseases = await getDiseases();
  return { diseases };
}

export { NewDisease, diseasesLoader };
