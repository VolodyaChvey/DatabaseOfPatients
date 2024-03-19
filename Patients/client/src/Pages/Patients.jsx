import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router";
import { useNavigate} from "react-router-dom";
import TablePatients from "../Components/TablePatients";
import TextInput from "../Components/TextInput";
import TwoButtons from "../Components/TwoButtons";
import Get from "../Controllers/Get";

function Patients() {
  const { patients } = useLoaderData();
  const [valueInput, setValueInput] = useState("");
  const navigate = useNavigate();

  function onHandleChange(e) {
    setValueInput(e.target.value);
  }

  function showPatients() {
    return patients
      .filter((p) => {
        return p.lastName.toLowerCase().includes(valueInput);
      })
      .slice(0, 9);
  }
  return (
    <>
      <TextInput
        text={"Поиск пациента"}
        value={valueInput}
        onChange={onHandleChange}
      />
      <h2 className="m-3">Список пациентов</h2>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={patients}>
          <TablePatients patients={showPatients()} />
        </Await>
      </Suspense>
      <TwoButtons
        oneLabel={"Новый пациент"}
        oneOnClick={() => navigate("/patients/new")}
      />
    </>
  );
}

async function getPatients() {
    return await Get({ path: "/patients" });
}

async function patientsLoader() {
  const patients = await getPatients();
  return { patients };
}

export { Patients, patientsLoader };
