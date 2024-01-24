import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TableDiseases from "../Components/TableDiseases";
import TextInput from "../Components/TextInput";

function Diseases() {
  const { diseases } = useLoaderData();
  const [valueInput, setValueInput] = useState("");

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }

  function showDiseases(diseases) {
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

async function getDiseases() {
  try {
    const response = await fetch(`http://localhost:8080/diseases`);
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

async function diseasesLoader() {
  const diseases = await getDiseases();
  if (!diseases.length) {
    /* throw  ({ message: 'Not Found!', reason: "Wrong url" }, { status: 404 })*/
  }
  return { diseases };
}

export { Diseases, diseasesLoader };
