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
import TextInput from "../Components/TextInput";

function NewDisease() {
  const { diseases, patient } = useLoaderData();
  const [diagnosis, setDiagnosis] = useState({ ...emptyDiagnosis });
  const [isActive, setIsActive] = useState(true);
  const [code, setCode] = useState();
  const [danger, setDanger] = useState("");
  const navigate = useNavigate();

  function onApply({ pattern, name }) {
    if (!pattern) {
      return;
    }

    if (name === "mainDisease") {
      setDiagnosis({ ...diagnosis, [name]: pattern, code: pattern.code });
      setCode(pattern.code);
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

  function onChange(e) {
    let value = e.target.value;
    setCode(value);
    setDiagnosis({ ...diagnosis, code: value });
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
    setCode("");
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
      <TextInput text={"Код МКБ: "} value={code} onChange={onChange} />
      <Row className="mb-3 text-center">
        <h3>{danger}</h3>
      </Row>
      <DiseaseContext.Provider value={onApply}>
        <TabsDiseases diseases={diseases} />
      </DiseaseContext.Provider>
    </>
  );

  async function createDiagnosis(diagnosis) {
    return await Post({
      path: "/diagnoses",
      body: { ...diagnosis, patientId: patient.id },
    });
  }
}
async function getDiseases() {
  return await Get({ path: "/diseases" });
}
async function getPatientById(id) {
  return await Get({ path: `/patients/${id}` });
}

async function diseasesLoader({ params }) {
  const diseases = await getDiseases();
  const patient = await getPatientById(params.id);
  return { diseases, patient };
}

export { NewDisease, diseasesLoader };
