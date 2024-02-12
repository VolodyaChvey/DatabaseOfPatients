import { useContext } from "react"
import { PatientContext } from "../../context"
import { Card, CardBody } from "react-bootstrap";
import TextTextButton from "./TextTextButton";

export default function DiagnosisDetails(){
    const diagnosis = useContext(PatientContext)[0].diagnosis;
    console.log(diagnosis);
    return(
        <Card>
            <CardBody>
                <TextTextButton mainDisease={diagnosis.mainDisease}/>

            </CardBody>
        </Card>
    )
}