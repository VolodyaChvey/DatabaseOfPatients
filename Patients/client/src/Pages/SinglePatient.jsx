import { useLoaderData, useNavigate } from "react-router-dom";
import TwoButtons from "../Components/TwoButtons";
import TextText from "../Components/TextText";
import { translation } from "../data";
import Get from "../Controllers/Get";
import DropdownButtons from "../Components/DropdownButtons";

function SinglePatient() {
  const { patient } = useLoaderData();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={goBack} />
      {Object.entries(patient)
        .filter(([k, v]) => k !== "id")
        .map(([k, v]) => (
          <TextText key={k} k={translation[k]} v={v} />
        ))}
      <TwoButtons
        oneLabel={"Удалить"}
        oneOnClick={() => navigate(`/patients/${patient.id}/delete`)}
        twoLabel={"Корректировать"}
        twoOnClick={() => navigate(`/patients/${patient.id}/edit`)}
      />
      <DropdownButtons id={patient.id} />
    </>
  );
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
  const patient = await getPatientById(id);
  return { patient, id };
}

export { SinglePatient, patientLoader };
