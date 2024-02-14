import { useLoaderData, useNavigate } from "react-router-dom";
import TwoButtons from "../Components/TwoButtons";
import TextText from "../Components/TextText";
import { translation } from "../data";
import Get from "../Controllers/Get";
import Put from "../Controllers/Put";
import DropdownButtons from "../Components/DropdownButtons";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";
import TabsSinglePatient from "../Components/SinglePatient/TabsSinglePatient";
import { PatientContext } from "../context";
import { useState } from "react";

function SinglePatient() {
  const { pat } = useLoaderData();
  const [patient, setPatient] = useState(pat);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  async function onEdit({ name, val }) {
    const responce = await editPatient({ ...patient, [name]: val });
    setPatient(responce);
  }
  async function onEditDiagnosis(diagnosis) {
    const responce = await editDiagnosis(diagnosis)
    setPatient({ ...patient, diagnosis: responce })
  }

  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={goBack} />
      {Object.entries(patient)
        .filter(([k, v]) => k !== "id")
        .filter(([k, v]) => k !== "diagnosis")
        .map(([k, v]) => (
          <TextText key={k} k={translation[k]} v={v} />
        ))}
      <TextText k={"Диагноз"} v={DiagnosisToStringInLine(patient.diagnosis)} />
      <TwoButtons
        oneLabel={"Удалить"}
        oneOnClick={() => navigate(`/patients/${patient.id}/delete`)}
        twoLabel={"Корректировать"}
        twoOnClick={() => navigate(`/patients/${patient.id}/edit`)}
      />
      <DropdownButtons id={patient.id} />
      <PatientContext.Provider value={[patient, onEdit, onEditDiagnosis]}>
        <TabsSinglePatient />
      </PatientContext.Provider>
    </>
  );
  async function editPatient(body) {
    return await Put({
      path: "/patients/" + patient.id,
      body: body
    });
  }
  async function editDiagnosis(body) {
    return await Put({
      path: "/diagnoses/" + patient.diagnosis.id,
      body: body
    });
  }
}

async function getPatientById(id) {
  try {
    return await Get({ path: `/patients/${id}` });
  } catch (e) {
    return {
      id: 101,
      lastName: "Иванов",
      firstName: "Иван",
      middleName: "Иванович",
      address: "Иванова 34",
      diagnosis: "",
    };
  }
}

async function patientLoader({ params }) {
  const id = params.id;
  const pat = await getPatientById(id);
  return { pat, id };
}

export { SinglePatient, patientLoader };
