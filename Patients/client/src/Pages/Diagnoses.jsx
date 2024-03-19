import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TableDiagnoses from "../Components/TableDiagnoses";
import TextInput from "../Components/TextInput";
import Get from "../Controllers/Get";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";

function Diagnoses() {
  const { disease } = useLoaderData();
  const [valueInput, setValueInput] = useState("");
  const [diagnoses, setDiagnoses] = useState([]);

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }
  async function onClick(name) {
    const response = await getDiagnosesByMainDisease(name);
    setDiagnoses(response);
  }
  function showLabel() {
    let label = "";
    if (diagnoses.length > 0) {
      label += "диагнозов";
    } else {
      label += "болезней";
    }
    return label;
  }

  function showDiseases() {
    if (diagnoses.length > 0) {
      return diagnoses.map((d) => DiagnosisToStringInLine(d));
    }
    return disease
      .filter((d) => {
        return d.name.toLowerCase().includes(valueInput);
      })
      .map((d) => d.name)
      .slice(0, 9);
  }
  return (
    <>
      <TextInput
        text={"Поиск " + showLabel()}
        value={valueInput}
        onChange={onHandleChange}
      />
      <h3 className="m-3">{"Список " + showLabel()}</h3>
      <TableDiagnoses arrText={showDiseases()} onClick={onClick} />
    </>
  );
  async function getDiagnosesByMainDisease(name) {
    return await Get({ path: "/diagnoses/mainDiseaseName/" + name });
  }
}

async function getDiagnoses() {
  return await Get({ path: "/diseases/mainDiseases" });
}

async function diagnosesLoader() {
  const disease = await getDiagnoses();
  return { disease };
}

export { Diagnoses, diagnosesLoader };
