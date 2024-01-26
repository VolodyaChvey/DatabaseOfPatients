import { useLoaderData } from "react-router-dom";
import TextDiagnosis from "../Components/TextDiagnosis";
import TabsDiseases from "../Components/TabsDiseases";
import { useState } from "react";

function NewDisease() {
  const { diseases } = useLoaderData();
  const [diagnosis, setDiagnosis] = useState("");

  function onPrepareDiagnosis({params, name}) {
    let regexp = /\s./;
    if (!regexp.test(params)) {
      params = " " + params;
    }
    setDiagnosis(diagnosis + "$" + params);
   console.log(name)
  /*  if (diagnosis) {
      count = diagnosis.match(/\$/g).length;
    }*/
  }

  function showDiagnosis() {
    return diagnosis.replace(/\$/g, "");
  }

  return (
    <>
      <TextDiagnosis diagnosis={showDiagnosis()} />
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
