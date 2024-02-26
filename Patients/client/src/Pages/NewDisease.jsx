import { useLoaderData, useNavigate } from "react-router-dom";
import TextDiagnosis from "../Components/TextDiagnosis";
import TabsDiseases from "../Components/TabsDiseases";
import { useState } from "react";
import { emptyDiagnosis } from "../data";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";
import Get from "../Controllers/Get";
import Post from "../Controllers/Post";
import { Row } from "react-bootstrap";
import { DiseaseContext } from "../context";
import TwoButtons from "../Components/TwoButtons";
import PatientToString from "../Preparators/PatientToString";

function NewDisease() {
  const { diseases, patient } = useLoaderData();
  const [diagnosis, setDiagnosis] = useState({ ...emptyDiagnosis });
  const [isActive, setIsActive] = useState(true);
  const [danger, setDanger] = useState("");
  const navigate = useNavigate();

  function onApply({ pattern, name }) {
    if (!pattern) {
      return;
    }

    if (name === "mainDisease") {
      setDiagnosis({ ...diagnosis, [name]: pattern });
      checkMain(true);
    } else {
      if (!Object.keys(diagnosis.mainDisease).length === 0) {
        checkMain(false);
        return;
      }
      if (!diagnosis[name].includes(pattern)) {
        diagnosis[name].push(pattern);
        setDiagnosis({ ...diagnosis, [name]: diagnosis[name] });
      }
    }

    setIsActive(false);
  }

  function checkMain(bool) {
    if (Object.keys(diagnosis.mainDisease).length > 0 || bool) {
      setDanger("");
    } else {
      setDanger("Заполните основное заболевание");
    }
  }
  async function onSave() {
    await createDiagnosis(diagnosis);
    onClean();
    navigate("/patients/" + patient.id);
  }
  function onClean() {
    diagnosis.mainDisease = {};
    diagnosis.properties.length = 0;
    diagnosis.complications.length = 0;
    setDiagnosis({ ...diagnosis });
    setIsActive(true);
  }
  return (
    <>
      {" "}
      <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      <h3 className="mb-3">{PatientToString(patient)}</h3>
      <TextDiagnosis
        diagnosis={DiagnosisToStringInLine(diagnosis)}
        onClickSave={onSave}
        onClickClean={onClean}
        isActive={isActive}
      />
      <Row className="mb-3 text-center">
        <h3>{danger}</h3>
      </Row>
      <DiseaseContext.Provider value={onApply}>
        <TabsDiseases diseases={diseases} />
      </DiseaseContext.Provider>
    </>
  );

  async function createDiagnosis(diagnosis) {
    try {
      const response = await Post({
        path: "/diagnoses",
        body: { ...diagnosis, patientId: patient.id },
      });
      return response;
    } catch (e) {}
  }
}
async function getDiseases() {
  try {
    return await Get({ path: "/diseases" });
  } catch (e) {
    return {
      mainDisease: [
        { id: 1, name: "ИБС" },
        { id: 2, name: "ХРБС" },
      ],
      properties: [
        { id: 1, name: "МА" },
        { id: 2, name: "ФП" },
      ],
      complications: [
        { id: 1, name: "Н1" },
        { id: 2, name: "Н2" },
      ],
    };
  }
}
async function getPatientById(id) {
  try {
    return await Get({ path: `/patients/${id}` });
  } catch (e) {}
}

async function diseasesLoader({ params }) {
  const diseases = await getDiseases();
  const patient = await getPatientById(params.id);
  return { diseases, patient };
}

export { NewDisease, diseasesLoader };
