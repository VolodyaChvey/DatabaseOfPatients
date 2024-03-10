import { useContext } from "react";
import { Card } from "react-bootstrap";
import { PatientContext } from "../../context";
import OneButton from "../OneButton";
import { useNavigate } from "react-router-dom";

export default function VisitsDetails() {
    const patient = useContext(PatientContext)[0];
    const navigate = useNavigate()

    console.log(patient)
    return (
        <Card>
            <h3 className="mb-3">Осмотров нет</h3>
            <OneButton label={"Добавить осмотр"} onClick={() => navigate("/visits/patientId/" + patient.id)} />
        </Card>
    )
}