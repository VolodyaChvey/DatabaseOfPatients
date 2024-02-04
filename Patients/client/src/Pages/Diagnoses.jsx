import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TableDiagnoses from "../Components/TableDiagnoses";
import TextInput from "../Components/TextInput";
import Get from "../Controllers/Get";
//import Delete from "../Controllers/Delete";
import { demoDiagnoses } from "../data";

function Diagnoses() {
  const { diagnoses } = useLoaderData();
  const [valueInput, setValueInput] = useState("");
  const [cotout, setCotout] = useState(false);

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }
  async function onClick(id) {
    setCotout(true)
  }
  function TextForTable() {
    if (cotout) {
      return diagnoses.map((d) => d.mainDisease.name);
    }
  }

  function showDiseases() {
    return diagnoses
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
  async function getPatientsByMainDisease({name}){
const resp = await Get({path:""})
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
  const diagnoses = await getDiagnoses();
  if (!diagnoses.length) {
    /* throw  ({ message: 'Not Found!', reason: "Wrong url" }, { status: 404 })*/
  }
  return { diagnoses };
}

export { Diagnoses, diagnosesLoader };
