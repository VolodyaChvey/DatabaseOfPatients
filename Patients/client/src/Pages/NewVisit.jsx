import { useActionData, useLoaderData, useNavigate } from "react-router-dom";
import Get from "../Controllers/Get";
import TwoButtons from "../Components/TwoButtons";
import PatientToString from "../Preparators/PatientToString";
import VisitForm from "../Components/NewVisit/VisitForm";
import Post from "../Controllers/Post";
import TimeoutText from "../Components/AddPatient/TimeoutText";
import { useEffect } from "react";

function NewVisit() {
  const patient = useLoaderData();
  const navigate = useNavigate();
  const data = useActionData();
  const end = data?.visit ? true : false;
  
  useEffect(() => {
    if (end) {
      let timeout = setTimeout(navigate, 3000, -1);
      return () => clearTimeout(timeout);
    }
  });
  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      <h3 className="mb-3">{PatientToString(patient)}</h3>
      {data?.message && <TimeoutText text={data.message} />}
      <VisitForm
        action={"/visits/patientId/" + patient.id}
        patientId={patient.id}
      />
    </>
  );
}

async function getPatientById(id) {
  try {
    return await Get({ path: `/patients/${id}` });
  } catch (e) {}
}
async function visitLoader({ params }) {
  const patient = await getPatientById(params.id);
  return patient;
}
async function createVisit(visit) {
  try {
    return await Post({ path: "/visits", body: visit });
  } catch (e) {}
}

async function newVisitAction({ request }) {
  const formData = await request.formData();
  if (!formData.get("created")) {
    return {
      message: 'Поле "Дата" должно быть заполнено',
    };
  }
  const formVisit = {
    patientId: formData.get("patientID"),
    created: formData.get("created"),
    text: formData.get("text"),
  };
  const newVisit = await createVisit(formVisit);
  return {
    visit: { ...newVisit },
    message: "Визит сохранён",
  };
}

export { NewVisit, visitLoader, newVisitAction };
