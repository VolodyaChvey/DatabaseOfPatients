import TwoButtons from "../Components/TwoButtons";
//import { useState } from "react";
//import { emptyPatient } from "../data";
import CostomForm from "../Components/CostomForm";
import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import DropdownButtons from "../Components/DropdownButtons";

function AddPatient() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const data = useActionData();

 /* const [patient, setPatient] = useState({
    ...emptyPatient,
  });
  function onHandleChange(e) {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  }
  async function onSave() {
    try {
      // const res =
      await fetch(`http://localhost:8080/patients`, {
        method: "POST",
        body: JSON.stringify(patient),
      });
    } catch (e) {}
    console.log(patient);
  }*/
  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      {data?.message && <div style={{ color: "blue" }} className="text-center">{data.message}</div>}
      <CostomForm action={"/patients/new"} submitting={navigation.state === "submitting"} />
      <DropdownButtons/>
    </>
  );
}
async function createPatient(patient) {
  try {
    const res = await fetch(`http://localhost:8080/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    return res.json();
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
