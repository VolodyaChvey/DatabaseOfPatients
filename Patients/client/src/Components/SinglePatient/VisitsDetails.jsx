import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { PatientContext } from "../../context";
import OneButton from "../OneButton";
import { useNavigate } from "react-router-dom";
import Get from "../../Controllers/Get"
import TableVisits from "../TableVisits";

export default function VisitsDetails() {
    const patient = useContext(PatientContext)[0];
    const navigate = useNavigate();
    const [visits, setVisits] = useState();

    useEffect(() => {
        getLastTenVisits(patient.id)
    }, [patient])

    return (
        <Card>
            {visits ? <TableVisits visits={visits} /> : ""}
            <h3 className="mb-3">Осмотров нет</h3>

            <OneButton label={"Добавить осмотр"} onClick={() => navigate("/visits/patientId/" + patient.id)} />
        </Card>
    )

    async function getLastTenVisits(patientId) {
        console.log(patientId)
        const responce = await Get({ path: "/visits/patient/" + patientId })
        console.log(responce)
        setVisits(responce)
        console.log(responce.length)
    }
}