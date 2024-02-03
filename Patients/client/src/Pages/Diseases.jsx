import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TableDiseases from "../Components/TableDiseases";
import TextInput from "../Components/TextInput";
import Get from "../Controllers/Get";

function Diseases() {
  const { diseases } = useLoaderData();
  const [valueInput, setValueInput] = useState("");

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }

  function showDiseases(diseases) {
    console.log(diseases)
    return diseases.filter((d) => {
      return d.name.toLowerCase().includes(valueInput)
    }).slice(0, 9);
  }
  return (
    <>
      <TextInput
        text={"Поиск заболевания"}
        value={valueInput}
        onChange={onHandleChange}
      />
      <h2 className="m-3">Список заболеваний</h2>
      <TableDiseases diseases={showDiseases(diseases)} />
    </>
  );
}

async function getDiagnoses() {
  try {
    const response = await Get({path:"/diagnoses"});
    return response.json();
  } catch (e) {
    return [
      {
        id: 101,
        name: "ИБС",
      },
      {
        id: 102,
        name: "ХРБС",
      },
    ];
  }
}

async function diagnosesLoader() {
  const diseases = await getDiagnoses();
  if (!diseases.length) {
    /* throw  ({ message: 'Not Found!', reason: "Wrong url" }, { status: 404 })*/
  }
  return { diseases };
}

export { Diseases, diagnosesLoader };
