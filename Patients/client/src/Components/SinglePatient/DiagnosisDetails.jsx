import { useContext, useState } from "react"
import { PatientContext } from "../../context"
import { Card, CardBody } from "react-bootstrap";
import TextTextButton from "./TextTextButton";
import ItemDisease from "../ItemDisease";
import Get from "../../Controllers/Get"
//import { useNavigate } from "react-router-dom";

export default function DiagnosisDetails() {
    const diagnosis = useContext(PatientContext)[0].diagnosis;
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState();
    const [name, setName] = useState();
    //const navigate = useNavigate();


    async function onClickMainDisease() {
        const resp = await getAllMainDisease();
        setData(resp);
        setName("mainDisease")
        setEdit(true)
    }
    console.log(data)
    return (
        <Card>
            <CardBody>
                {edit ? <ItemDisease itemDisease={data} name={name} />
                    : <TextTextButton mainDisease={diagnosis.mainDisease} onClick={onClickMainDisease} />}

            </CardBody>
        </Card>
    )
    async function getAllMainDisease() {
        return await Get({ path: "/diseases/main" })
    }
}