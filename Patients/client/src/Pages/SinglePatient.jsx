import { useLoaderData } from "react-router-dom";
import Get from "../Controllers/Get";
import Put from "../Controllers/Put";
import TabsSinglePatient from "../Components/SinglePatient/TabsSinglePatient";
import { PatientContext } from "../context";
import { useState } from "react";
import HeaderSingle from "../Components/HeaderSingle";

function SinglePatient() {
  const [patient, setPatient] = useState(useLoaderData());

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
