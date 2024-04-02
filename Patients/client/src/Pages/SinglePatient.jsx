import { useLoaderData, useNavigate } from "react-router-dom";
import Get from "../Controllers/Get";
import Put from "../Controllers/Put";
import TabsSinglePatient from "../Components/SinglePatient/TabsSinglePatient";
import { PatientContext } from "../context";
import { useState } from "react";
import HeaderSingle from "../Components/HeaderSingle";
import TextText from "../Components/TextText";
import OneButton from "../Components/OneButton";
import TwoButtons from "../Components/TwoButtons";

function SinglePatient() {
  const [patient, setPatient] = useState(useLoaderData());
  const navigate = useNavigate();
  const registration = patient.registration;

  async function onEdit({ name, val }) {
    const responce = await editPatient({ ...patient, [name]: val });
    setPatient(responce);
  }
  async function onEditDiagnosis(diagnosis) {
    const responce = await editDiagnosis(diagnosis);
    setPatient({ ...patient, diagnosis: responce });
  }

  return (
    <>
      <HeaderSingle patient={patient} />
      {registration ? (
        <TextText
          k={"Дата постановки на учёт"}
          v={new Date(patient.registration).toLocaleDateString()}
        />
      ) : (
        <OneButton
          onClick={() => navigate("/patients/registration/" + patient.id)}
          label={"Поставить на учёт"}
        />
      )}
      <TwoButtons
        oneLabel={"Удалить"}
        oneOnClick={() => navigate(`/patients/${patient.id}/delete`)}
      />
      <PatientContext.Provider value={[patient, onEdit, onEditDiagnosis]}>
        <TabsSinglePatient />
      </PatientContext.Provider>
    </>
  );
  async function editPatient(body) {
    return await Put({
      path: "/patients/" + patient.id,
      body: body,
    });
  }
  async function editDiagnosis(body) {
    return await Put({
      path: "/diagnoses/" + patient.diagnosis.id,
      body: body,
    });
  }
}

async function getPatientById(id) {
  return await Get({ path: `/patients/${id}` });
}

async function patientLoader({ params }) {
  return await getPatientById(params.id);
}

export { SinglePatient, patientLoader };
