import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import TextDiagnosis from "../Components/TextDiagnosis";
import TabsDiseases from "../Components/TabsDiseases";
import { useState } from "react";
import { emptyDiagnosis } from "../data";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";
import Get from "../Controllers/Get";
import Post from "../Controllers/Post";
import { Row } from "react-bootstrap";

function NewDisease() {
  const { id } = useParams();
  const { diseases } = useLoaderData();
  const [diagnosis, setDiagnosis] = useState({
    ...emptyDiagnosis,
    patientId: id,
  });
  const [isActive, setIsActive] = useState(true);
  const [danger, setDanger] = useState("");
  const navigate = useNavigate();

  function onPrepareDiagnosis({ pattern, name }) {
    if (!pattern) {
      return;
    }
    
    if (name === "mainDisease") {
      setDiagnosis({ ...diagnosis, [name]: pattern });
      checkMain(true);
    } else {
      if (Object.keys(diagnosis.mainDisease).length === 0) {
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
    if (Object.keys(diagnosis.main).length > 0 || bool) {
      setDanger("");
    } else {
      setDanger("Заполните основное заболевание");
    }
  }
  async function onSave() {
    await createDiagnosis(diagnosis);
    diagnosis.mainDisease = {};
    diagnosis.properties.length = 0;
    diagnosis.complications.length = 0;
    setDiagnosis({ ...diagnosis });
    setIsActive(true);
    navigate("/patients/" + id);
  }

 async function onClean() {
    await createDiagnosis(diagnosis);
    diagnosis.mainDisease = {};
    diagnosis.properties.length = 0;
    diagnosis.complications.length = 0;
    setDiagnosis({ ...diagnosis });
    setIsActive(true);
  }

  return (
    <>
      <TextDiagnosis
        diagnosis={DiagnosisToStringInLine(diagnosis)}
        onClickSave={onSave}
        onClickClean={onClean}
        isActive={isActive}
      />
      <Row className="mb-3 text-center">
        <h3>{danger}</h3>
      </Row>
      <TabsDiseases diseases={diseases} onApply={onPrepareDiagnosis} />
    </>
  );

  async function createDiagnosis(diagnosis) {
    try {
      const response = await Post({ path: "/diagnoses", body: diagnosis });
      return response;
    } catch (e) {}
  }
}
async function getDiseases() {
  try {
    return await Get({ path: "/diseases" });
  } catch (e) {
    return {
      main: [
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

async function diseasesLoader() {
  const diseases = await getDiseases();
  return { diseases };
}

export { NewDisease, diseasesLoader };
