import TwoButtons from "../Components/TwoButtons";
import CostomForm from "../Components/AddPatient/CostomForm";
import { useActionData, useNavigate } from "react-router-dom";
import DropdownButtons from "../Components/AddPatient/DropdownButtons";
import Post from "../Controllers/Post";
import HeaderSingle from "../Components/HeaderSingle";
import TimeoutText from "../Components/AddPatient/TimeoutText";


function AddPatient() {
  const navigate = useNavigate();
  const data = useActionData();
  const showCostomForm = data ? Object.keys(data).includes("patient") : false

  return (<>
    {showCostomForm ?
      <>
        <HeaderSingle patient={data.patient} />
        <TimeoutText text={data.message} />
        <DropdownButtons id={data.patient.id} />
      </> :
      <>
        <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
        {data?.message && <TimeoutText text={data.message} />}
        <CostomForm action={"/patients/new"} />
      </>}
  </>);
}
async function createPatient(patient) {
  try {
    return await Post({ path: "/patients", body: patient });
  } catch (e) {
    return patient;
  }
}

async function newPatientAction({ request }) {
  const formData = await request.formData();
  if (!formData.get("lastName")) {
    return { message: 'Поле "Фамилия" должно быть заполненным' };
  }
  const formPatient = {
    id: formData.get("id"),
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    middleName: formData.get("middleName"),
    address: formData.get("address"),
  };

  const newPatient = await createPatient(formPatient);

  return {
    patient: { ...newPatient },
    message: `Данные пациента ${newPatient.lastName} успешно сохранены`,
  };
}

export { AddPatient, newPatientAction };
