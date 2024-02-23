import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap";
import { translation } from "../../data";
import TableDiseases from "../TableDiseases";
import TwoButtons from "../TwoButtons";
import { useNavigate } from "react-router-dom";


export default function ChangeDiseases({ patientDiseases, diseases, name, GoBack, onChosenDisease, onDeleteDisease }) {
    const [del, setDel] = useState(0);
    const [value, setValue] = useState("");
    const [danger, setDanger] = useState('');
    const [disease, setDisease] = useState({});
    const navigate = useNavigate();



    function onDelete(dis) {
        onDeleteDisease({ name, disease: dis });
        setDel(0);
    }

    function onEdit() {
        if (!value) {
            setDanger("Выберите заболевание")
            return;
        }
        if (!Object.keys(disease).length) {
            setDanger("Create new pattern")
            return;
        }
        onChosenDisease({ name, disease })
    }

    function onCreate() {
        let nam = name === "mainDisease" ? "mainDiseases" : name;
        navigate("/pattern/new", { state: { itemDisease: diseases, pattern: disease, name: nam } })
    }

    function selectedDisease(d) {
        setDanger("");
        setDisease(d);
        setValue(d.name);
    }
    function onPClick(id) {
        if (!(name === "mainDisease")) {
            setDel(id)
        }
    }
    function showDiseases() {
        let s = new Set(patientDiseases.map(e => JSON.stringify(e)))
        return diseases
            .filter(e => !s.has(JSON.stringify(e)))
            .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 10)
    }
    function onChange(e) {
        if (e.target.value) {
            setDanger("");
        }
        setValue(e.target.value)
    }
    return (<>
        {patientDiseases.map((d, index) => (
            <Row key={d.id}>
                <Col>{index ? "" : <Button onClick={GoBack}>GoBack</Button>}</Col>
                <Col>{index ? "" : <p onClick={() => setDel(0)}>{translation[name]}</p>}</Col>

                <Col><p onClick={() => onPClick(d.id)}>{d.name}</p></Col>
                <Col>{del === d.id ? <Button onClick={() => onDelete(d)}>Удалить</Button> : ""}</Col>
                <Col>{index || del ? "" : <Button onClick={onEdit}>Сохранить</Button>}</Col>
            </Row>
        ))}
        <Row className="mb-3 text-center" >
            <input style={{ textAlign: "center" }} value={value} onChange={onChange} />
        </Row>
        <Row className="mb-3 text-center">
            <h4>{danger}</h4>
        </Row>
        <TableDiseases diseases={showDiseases()} onClick={selectedDisease} />
        <TwoButtons twoLabel={"Create new pattern"} twoOnClick={onCreate} />
    </>)
}