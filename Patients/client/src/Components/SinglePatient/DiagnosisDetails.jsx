import { useContext, useState } from "react";
import { PatientContext } from "../../context";
import { Card, CardBody } from "react-bootstrap";
import TextTextButton from "./TextTextButton";
import Get from "../../Controllers/Get";
import ChangeDiseases from "./ChangeDiseases";
import { useNavigate } from "react-router-dom";
import OneButton from "../OneButton";

export default function DiagnosisDetails() {
  const patient = useContext(PatientContext)[0];
  const [diagnosis, setDiagnosis] = useState(patient.diagnosis);
  const onEditDiagnosis = useContext(PatientContext)[2];
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate();

  function onDelete({ name, disease }) {
    setDiagnosis({
      ...diagnosis,
      [name]: diagnosis[name].filter((d) => d !== disease),
    });
    onEditDiagnosis({
      ...diagnosis,
      [name]: diagnosis[name].filter((d) => d !== disease),
    });
  }

  function onChosenDisease({ name, disease }) {
    if (name === "mainDisease") {
      setDiagnosis({ ...diagnosis, [name]: disease });
      onEditDiagnosis({ ...diagnosis, [name]: disease });
    } else {
      diagnosis[name].push(disease);
      setDiagnosis({ ...diagnosis });
      onEditDiagnosis({ ...diagnosis });
    }
    setEdit(false);
  }

  async function onEditDisease(name) {
    let responce = [];
    if (name === "mainDisease") {
      responce = await getAllMainDisease();
    }
    if (name === "properties") {
      responce = await getAllProperties();
    }
    setData(responce);
    setName(name);
    setEdit(true);
  }
  return (
    <Card>
      {diagnosis ? (
        <CardBody>
          {edit ? (
            <ChangeDiseases
              patientDiseases={
                name === "mainDisease"
                  ? [diagnosis.mainDisease]
                  : diagnosis[name]
              }
              name={name}
              GoBack={() => setEdit(false)}
              onChosenDisease={onChosenDisease}
              diseases={data}
              onDeleteDisease={onDelete}
            />
          ) : (
            <>
              <TextTextButton
                diseases={[diagnosis.mainDisease]}
                name={"mainDisease"}
                onClick={onEditDisease}
              />
              <TextTextButton
                diseases={diagnosis.properties}
                name={"properties"}
                onClick={onEditDisease}
              />
              <TextTextButton
                diseases={diagnosis.complications}
                name={"complications"}
                onClick={onEditDisease}
              />
            </>
          )}
        </CardBody>
      ) : (
        <CardBody>
          <h3 className="mb-3">Диагноз не определен</h3>
          <OneButton
            label={"Добавить диагноз"}
            onClick={() => navigate("/diseases/patientId/" + patient.id)}
          />
        </CardBody>
      )}
    </Card>
  );
  async function getAllMainDisease() {
    return await Get({ path: "/diseases/mainDiseases" });
  }
  async function getAllProperties() {
    return await Get({ path: "/diseases/properties" });
  }
}
