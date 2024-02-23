import TwoButtons from "../Components/TwoButtons";
import CostomForm from "../Components/CostomForm";
import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import DropdownButtons from "../Components/DropdownButtons";
import Post from "../Controllers/Post";

function AddPatient() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      {data?.message && <div style={{ color: "blue" }} className="text-center">{data.message}</div>}
      <CostomForm action={"/patients/new"} submitting={navigation.state === "submitting"} />
      
      <DropdownButtons />
    </>
  );
}
async function createPatient(patient) {
  try {
    return await Post({path:"/patients",body:patient});
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
    message: `Данные пациента ${newPatient.lastName} успешно сохранены`,
  };
}

export { AddPatient, newPatientAction };
