import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { PatientContext } from "../../context";
import OneButton from "../OneButton";
import { useNavigate } from "react-router-dom";
import Get from "../../Controllers/Get";
import TableVisits from "../TableVisits";
import TextText from "../TextText";

export default function VisitsDetails() {
  const patient = useContext(PatientContext)[0];
  const navigate = useNavigate();
  const [visits, setVisits] = useState();
  const [count, setCount] = useState();
  const [show, setShow] = useState(true);

  useEffect(() => {
    getCount(patient.id);
  }, [patient]);

  function onHide() {
    setShow(!show);
    setVisits([]);
  }

  function onTen() {
    getLastTenVisits(patient.id);
  }
  function onAll() {
    getAllVisits(patient.id);
  }
  return (
    <Card>
      {count ? (
        <>
          <TextText k={"Всего визитов"} v={count} />
          <ButtonGroup>
            <Button variant="link" onClick={onHide}>
              {show ? "Показать визиты" : "Скрыть визиты"}
            </Button>{" "}
            <Button variant="link" onClick={onTen} disabled={show}>
              {show ? " " : "Последние десять"}
            </Button>{" "}
            <Button variant="link" onClick={onAll} disabled={show}>
              {show ? " " : "Все визиты"}
            </Button>
          </ButtonGroup>
          {visits ? <TableVisits visits={visits} /> : ""}
        </>
      ) : (
        <h3 className="mb-3">Осмотров нет</h3>
      )}

      <OneButton
        label={"Добавить осмотр"}
        onClick={() => navigate("/visits/patientId/" + patient.id)}
      />
    </Card>
  );

  async function getLastTenVisits(patientId) {
    const responce = await Get({
      path: "/visits/patient/lastTen/" + patientId,
    });
    setVisits(responce);
  }
  async function getAllVisits(patientId) {
    const responce = await Get({ path: "/visits/patient/" + patientId });
    setVisits(responce);
  }
  async function getCount(patientId) {
    const responce = await Get({ path: "/visits/patient/count/" + patientId });
    setCount(responce);
  }
}
