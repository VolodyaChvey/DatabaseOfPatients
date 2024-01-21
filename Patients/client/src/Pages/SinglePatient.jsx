import { Container } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import TwoButtons from "../Components/TwoButtons";
import TextText from "../Components/TextText";

function SinglePatient() {
  const { patient } = useLoaderData();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <>
      <Container>
        <TwoButtons oneLabel={"Go back"} oneOnClick={goBack} />
        {Object.entries(patient).map(([k, v]) => (
          <TextText key={k} k={k} v={v} />
        ))}
        <TwoButtons
          oneLabel={"Удалить"}
          oneOnClick
          twoLabel={"Корректировать"}
          twoOnClick={() =>
            navigate(`/patients/${patient.id}/edit`)}
        />
      </Container>
    </>
  );

}

async function getPatientById(id) {
  try {
    const res = await fetch(`http://localhost:8080/patients/${id}`);
    return res.json();
  } catch (e) {
    return {
      id: 101,
      lastName: "Иванов",
      firstName: "Иван",
      middleName: "Иванович",
      address: "Иванова 34",
    };
  }
}

async function patientLoader({ params }) {
  const id = params.id;
  const patient = await getPatientById(id);
  return { patient, id };
}

export { SinglePatient, patientLoader };
