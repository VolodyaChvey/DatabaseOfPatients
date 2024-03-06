import { useContext, useState } from "react";
import { PatientContext } from "../../context";
import { Card, CardBody } from "react-bootstrap";
import TextTextButton from "./TextTextButton";
import Get from "../../Controllers/Get";
import ChangeDiseases from "./ChangeDiseases";
import { useNavigate } from "react-router-dom";
import OneButton from "../OneButton";
import TextStringButtton from "./TextStringButton";

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
      setDiagnosis({ ...diagnosis, [name]: disease, code: disease.code });
      onEditDiagnosis({ ...diagnosis, [name]: disease, code: disease.code });
    } else {
      diagnosis[name].push(disease);
      setDiagnosis({ ...diagnosis });
      onEditDiagnosis({ ...diagnosis });
    }
    setEdit(false);
  }

  async function onEditDisease(name) {
    let path;
    name === "mainDisease"
      ? (path = "/diseases/mainDiseases")
      : (path = "/diseases/" + name);
    let responce = await Get({ path });
    setData(responce);
    setName(name);
    setEdit(true);
  }
  async function onEditCode(value) {
    setDiagnosis({ ...diagnosis, code: value });
    onEditDiagnosis({ ...diagnosis, code: value });
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
              <TextStringButtton
                text={diagnosis.code}
                name={"code"}
                onClick={onEditCode}
              />
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
}
