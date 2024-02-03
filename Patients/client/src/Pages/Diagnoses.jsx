import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TableDiagnoses from "../Components/TableDiagnoses";
import TextInput from "../Components/TextInput";
import Get from "../Controllers/Get";
import Delete from "../Controllers/Delete";
import {demoDiagnoses} from "../data"

function Diagnoses() {
  const { diagnoses } = useLoaderData();
  const [valueInput, setValueInput] = useState("");

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }
  async function onClick(id) {
    await Delete({ path: "/diagnoses/" + id });
  }

  function showDiseases(diagnoses) {
    console.log(diagnoses);
    return diagnoses
      .filter((d) => {
        return d.mainDisease.name.toLowerCase().includes(valueInput);
      })
      .slice(0, 9);
  }
  console.log(diagnoses);
  return (
    <>
      <TextInput
        text={"Поиск заболевания"}
        value={valueInput}
        onChange={onHandleChange}
      />
      <h2 className="m-3">Список заболеваний</h2>
      <TableDiagnoses diagnoses={diagnoses}  onClick={onClick}/>
    </>
  );
}

async function getDiagnoses() {
  try {
    return await Get({ path: "/diagnoses" });
  } catch (e) {
    return demoDiagnoses
  }
}

async function diagnosesLoader() {
  const diagnoses = await getDiagnoses();
  if (!diagnoses.length) {
    /* throw  ({ message: 'Not Found!', reason: "Wrong url" }, { status: 404 })*/
  }
  return { diagnoses };
}

export { Diagnoses, diagnosesLoader };
