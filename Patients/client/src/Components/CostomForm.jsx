import { Form } from "react-router-dom";
import { emptyPatient, translation } from "../data";
import TextInput from "./TextInput";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";
import { Row, Col } from "react-bootstrap";

export default function CostomForm({ action, patient, submitting }) {
  const formPatient = patient ? patient : emptyPatient;
  return (
    <Form method="post" action={action}>
      {Object.entries(formPatient)
        .filter(([k, m]) => k !== "diagnosis")
        .map(([k, v]) => (
          <TextInput
            key={k}
            type={k === "id" ? "hidden" : "text"}
            text={k === "id" ? null : translation[k]}
            name={k}
            defaultValue={v}
          />
        ))}
      <Row className="mb-3">
        
        <Col sm={2}>Диагноз:</Col>
        <Col sm={1}></Col>
        <Col sm={9}>{DiagnosisToStringInLine(patient.diagnosis)}</Col>
      </Row>
      <TextInput
        type={"submit"}
        value={"Сохранить"}
        disabled={submitting}
        className={"btn btn-primary"}
      />
    </Form>
  );
}
