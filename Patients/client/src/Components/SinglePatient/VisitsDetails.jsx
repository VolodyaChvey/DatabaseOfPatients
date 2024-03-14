import { useContext } from "react";
import { Card } from "react-bootstrap";
import { PatientContext } from "../../context";
import OneButton from "../OneButton";
import { useNavigate } from "react-router-dom";
import Get from "../../Controllers/Get"

export default function VisitsDetails() {
    const patient = useContext(PatientContext)[0];
    const navigate = useNavigate()
    const visits = getLastTenVisits(patient.id)

    console.log(patient)
    console.log(visits)
    return (
        <Card>
            <h3 className="mb-3">Осмотров нет</h3>
            <OneButton label={"Добавить осмотр"} onClick={() => navigate("/visits/patientId/" + patient.id)} />
        </Card>
    )

  async  function getLastTenVisits(patientId){
const responce =await Get({path:"/visits/patient/"+patientId})
console.log(responce)
    }
}