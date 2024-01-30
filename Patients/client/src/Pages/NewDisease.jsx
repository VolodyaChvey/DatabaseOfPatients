import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import TextDiagnosis from "../Components/TextDiagnosis";
import TabsDiseases from "../Components/TabsDiseases";
import { useState } from "react";
import { emptyDiagnosis } from "../data";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";
import Get from "../Controllers/Get";
import Post from "../Controllers/Post";

function NewDisease() {
  const { id } = useParams();
  const loc= useLocation().state;
  console.log(loc)
  const { diseases } = useLoaderData();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState({
    ...emptyDiagnosis,
    patientId: id,
  });
  const [isActive, setIsActive] = useState(true);

  function onPrepareDiagnosis({ value, name }) {
    if (!value) {
      return;
    }
    let addition = value ? value : "";
    if (name === "main") {
      setDiagnosis({ ...diagnosis, main: addition });
    } else {
      if (!diagnosis[name].includes(addition)) {
        diagnosis[name].push(addition);
        setDiagnosis({ ...diagnosis, [name]: diagnosis[name] });
      }
    }
    setIsActive(false);
  }

  async function onSave() {
    console.log(diagnosis);
    const response = await createDiagnosis(diagnosis);
    console.log(response);
    setDiagnosis({ ...emptyDiagnosis, patientId: id });
    setIsActive(true);
    // navigate(`/patients/${id}`)
  }
  function onClean() {
    setDiagnosis({ ...emptyDiagnosis, patientId: id });
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
      <TabsDiseases diseases={diseases} onApply={onPrepareDiagnosis} />
    </>
  );
}
async function createDiagnosis(diagnosis) {
  console.log(JSON.stringify(diagnosis)) 
  try {
    const response = await Post({ path: "/diagnoses", body: diagnosis});
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
