import { useContext, useState } from "react";
import { PatientContext } from "../../context";
import { Card, CardBody } from "react-bootstrap";
import TextTextButton from "./TextTextButton";
import ChangeMainDisease from "./ChangeMainDisease";
import TableDiseases from "../TableDiseases";
import Get from "../../Controllers/Get";

export default function DiagnosisDetails() {
    const [diagnosis, setDiagnosis] = useState(useContext(PatientContext)[0].diagnosis);
    const onEditDiagnosis = useContext(PatientContext)[2]
    const [disease, setDisease] = useState();
    const [danger, setDanger] = useState("");
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState();
    const [name, setName] = useState();
    const [value, setValue] = useState("");

    async function onClickMainDisease() {
        const resp = await getAllMainDisease();
        setData(resp);
        setName("mainDisease");
        setEdit(true);
    }
    function ChosenMainDisease() {
        if (!value) {
            setDanger("Выберите основное заболевание")
            return
        }
      setDiagnosis({ ...diagnosis, [name]: disease })
        onEditDiagnosis({ ...diagnosis, [name]: disease });
        setEdit(false);
        setValue("");
    }


    function onChange(e) {
        if (e.target.value) {
            setDanger("");
        }
        setValue(e.target.value);
    }

    function selectedDisease(d) {
        setDanger("");
        setDisease(d);
        setValue(d.name);
    }

    function showDiseases() {
        return data
            .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 9)
    }
    return (
        <Card>
            <CardBody>
                {edit ? (
                    <>
                        <ChangeMainDisease danger={danger} value={value} onChange={onChange} onClick={ChosenMainDisease} />
                        <TableDiseases diseases={showDiseases()} onClick={selectedDisease} />

                    </>
                ) : (
                    <TextTextButton
                        mainDisease={diagnosis.mainDisease}
                        onClick={onClickMainDisease}
                    />
                )}
            </CardBody>
        </Card>
    );
    async function getAllMainDisease() {
        return await Get({ path: "/diseases/main" });
    }
}
