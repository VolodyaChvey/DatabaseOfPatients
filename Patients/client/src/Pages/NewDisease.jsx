import { useLoaderData, useParams } from "react-router-dom";
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

  function onPrepareDiagnosis({ pattern, name }) {
    if (!pattern) {
      return;
    }
    if (name === "main") {
      setDiagnosis({ ...diagnosis, [name]: pattern });
      checkMain(true);
    } else {
      if (Object.keys(diagnosis.main).length === 0) {
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
   let res= await createDiagnosis(diagnosis);
   if(res){console.log(res)
    //setDiagnosis({ ...emptyDiagnosis, patientId: id });
    setIsActive(true)};
  }
  function onClean() {
    setDiagnosis({ ...emptyDiagnosis, patientId: id });
    setIsActive(true);
  }
  console.log(diagnosis)
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
}
async function createDiagnosis(diagnosis) {
  console.log(JSON.stringify(diagnosis));
  try {
    const response = await Post({ path: "/diagnoses", body: diagnosis });
    return response;
  } catch (e) {}
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
