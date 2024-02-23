import { useLoaderData } from "react-router-dom";
import Get from "../Controllers/Get";
import Put from "../Controllers/Put";
import TabsSinglePatient from "../Components/SinglePatient/TabsSinglePatient";
import { PatientContext } from "../context";
import { useState } from "react";
import HeaderSingle from "../Components/SinglePatient/HeaderSingle";

function SinglePatient() {
  const [patient, setPatient] = useState(useLoaderData());

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
      <PatientContext.Provider value={[patient, onEdit, onEditDiagnosis]}>
        <HeaderSingle />
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
  return await getPatientById(params.id);
}

export { SinglePatient, patientLoader };
