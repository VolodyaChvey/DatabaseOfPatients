import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import TwoButtons from "../Components/TwoButtons";
import CostomForm from "../Components/CostomForm";

function EditPatient() {
  const { patient } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      {data?.message && (
        <div style={{ color: "blue" }} className="text-center">
          {data.message}
        </div>
      )}
      <CostomForm
        patient={patient}
        action={`/patients/${patient.id}/edit`}
        submitting={navigation.state === "submitting"}
      />
    </>
  );
}

async function updatePatient(patient) {
  try {
    const res = await fetch(`http://localhost:8080/patients/${patient.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    return res.json();
  } catch (e) {
    return patient;
  }
}

async function updatePatientAction({ request }) {
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
  const updatedPatient = await updatePatient(formPatient);

  return {
    message: `Данные пациента ${updatedPatient.lastName} успешно обновлены`,
  };
}

export { EditPatient, updatePatientAction };
