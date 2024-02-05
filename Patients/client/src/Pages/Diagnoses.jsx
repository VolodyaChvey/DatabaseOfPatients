import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TableDiagnoses from "../Components/TableDiagnoses";
import TextInput from "../Components/TextInput";
import Get from "../Controllers/Get";
import { demoDiagnoses, demoDiagnoses1 } from "../data";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";

function Diagnoses() {
  const { disease } = useLoaderData();
  const [valueInput, setValueInput] = useState("");
  const [diagnoses, setDiagnoses] = useState([]);

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }
  async function onClick(name) {
    const response = await getPatientsByMainDisease(name)
    setDiagnoses(response)
  }


  function showDiseases() {
    if (diagnoses.length > 0) {
      return diagnoses.map(d => DiagnosisToStringInLine(d))
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
        text={"Поиск заболевания"}
        value={valueInput}
        onChange={onHandleChange}
      />
      <h3 className="m-3">Список заболеваний</h3>
      <TableDiagnoses arrText={showDiseases()} onClick={onClick} />
    </>
  );
  async function getPatientsByMainDisease(name) {
    try { return await Get({ path: "/diagnoses/mainDiseaseName/" + name }) }
    catch (e) {
      return demoDiagnoses1;
    }
  }
}

async function getDiagnoses() {
  try {
    return await Get({ path: "/diseases/main" });

  } catch (e) {
    return demoDiagnoses;
  }
}

async function diagnosesLoader() {
  const disease = await getDiagnoses();
  if (!disease.length) {
    /* throw  ({ message: 'Not Found!', reason: "Wrong url" }, { status: 404 })*/
  }
  return { disease };
}

export { Diagnoses, diagnosesLoader };