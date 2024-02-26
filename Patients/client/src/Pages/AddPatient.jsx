import TwoButtons from "../Components/TwoButtons";
import CostomForm from "../Components/CostomForm";
import { useActionData, useNavigate } from "react-router-dom";
import DropdownButtons from "../Components/DropdownButtons";
import Post from "../Controllers/Post";
import HeaderSingle from "../Components/HeaderSingle";
import TabsAddPatient from "../Components/AddPatient/TabsAddPatient";

function AddPatient() {
  const navigate = useNavigate();
  const data = useActionData();

  return (
    <>
      {data ? (
        data?.patient && <HeaderSingle patient={data.patient} />
      ) : (
        <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      )}
      {data?.message && (
        <>
          <div style={{ color: "blue" }} className="text-center">
            {data.message}
          </div>
        </>
      )}
      {data ? data?.patient && <TabsAddPatient /> : <CostomForm action={"/patients/new"} />}
      {data?.patient && <DropdownButtons id={data.patient.id} />}
    </>
  );
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
