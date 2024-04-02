import { useEffect, useState } from "react";
import HeaderSingle from "../Components/HeaderSingle";
import { useLoaderData } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import Get from "../Controllers/Get";
import Put from "../Controllers/Put";
import FormatDate from "../Preparators/FormatDate";

export default function RegistrationRatient() {
  const [patient, setPatient] = useState(useLoaderData());
  const [visits, setVisits] = useState();
  const [select, setSelect] = useState();

  useEffect(() => {
    getFirstFiveVisits(patient.id);
  }, [patient]);

  function changeSelect(event) {
    setSelect(event.target.value);
  }
  function onSave() {
    let s = select ? select : visits[0].created;
    let v = (select? visits.filter(v=>v.created===s):visits)[0]
    console.log(v)
    setPatient({ ...patient, registration: s });
  //  registrationPatient({ ...patient, registration: s });
  }

  return (
    <>
      <HeaderSingle patient={patient} />
      <Row>
        <Col sm={2}></Col>
        <Col>
          {visits && (
            <div>
              <span>Поставить на учёт </span>
            </div>
          )}
        </Col>
        <Col>
          <select value={select} onChange={changeSelect}>
            {visits &&
              visits.map((v) => (
                <option key={v.id} value={v.created}>
                  {new Date(v.created).toLocaleDateString()}
                </option>
              ))}
          </select>
        </Col>
        <Col>
          <Button onClick={onSave}>Сохранить</Button>{" "}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
  async function getFirstFiveVisits(patientId) {
    const response = await Get({
      path: "/visits/patient/firstFive/" + patientId,
    });
    setVisits(response);
  }
  async function registrationPatient({ patient, visit }) {
    const responce1 = await Put({
      path: "/patients/" + patient.id,
      body: patient,
    });
    const responce2 = await Put({ path: "/visits/" + visit.id, body: visit });
    console.log(responce1);
    console.log(responce2);
  }
}
