import { useEffect, useState } from "react";
import HeaderSingle from "../Components/HeaderSingle";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import Get from "../Controllers/Get";
import Put from "../Controllers/Put";
import TableVisits from "../Components/TableVisits";


export default function RegistrationRatient() {
  const [patient, setPatient] = useState(useLoaderData());
  const [visits, setVisits] = useState();
  const [select, setSelect] = useState();
  const [showAllVisits, setShowAllVisits] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFirstFiveVisits(patient.id);
  }, [patient]);

  function changeSelect(event) {
    setSelect(event.target.value);
  }

  function showVisits() {
    setShowAllVisits(true)
    getAllVisits()
  }

  function changeVisit(visit) {
    setShowAllVisits(false)

    console.log(visit)
  }
  function onSave() {
    let s = select ? select : visits[0].created;
    let v = (select ? visits.filter(v => v.created === s) : visits)[0]
    registration({ patient: { ...patient, registration: s }, visit: { ...v, registration: true } });
    navigate("/patients/" + patient.id)
  }

  return (
    <>
      <HeaderSingle patient={patient} />
      <Row className="mb-3">
        <Col sm={2}></Col>
        <Col>
          {visits && (
            <div>
              <span>Поставить на учёт </span>
            </div>
          )}
        </Col>
        <Col>
          <select value={select} onChange={changeSelect} >
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
      {showAllVisits ? <TableVisits visits={visits} onClick={changeVisit} />
        : <Button variant="Link" onClick={showVisits}><p>Показать все визиты</p></Button>}
    </>
  );
  async function getAllVisits() {
    let responce = await Get({ path: "/visits/patient/" + patient.id })
    setVisits(visits)
    console.log(responce)
  }
  async function getFirstFiveVisits(patientId) {
    const response = await Get({
      path: "/visits/patient/firstFive/" + patientId,
    });
    setVisits(response);
  }
  async function registration({ patient, visit }) {

    const responcePatient = await Put({
      path: "/patients/" + patient.id,
      body: patient,
    });
    const responcevisit = await Put({ path: "/visits/" + visit.id, body: visit });
    setPatient(responcePatient)
    let v = visits.filter(v => v.id !== responcevisit.id)
    v.push(responcevisit)
    setVisits(v)
  }
}
