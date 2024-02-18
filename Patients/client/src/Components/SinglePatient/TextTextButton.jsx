import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { translation } from "../../data";

export default function TextTextButton({ diseases, name, onClick }) {
    const [edit, setEdit] = useState(false)

    return (
        <>
            <Row className="mb-3" onClick={() => setEdit(!edit)}>
                <Col></Col>
                <Col><p>{translation[name]}</p></Col>
                <Col></Col>
                <Col>{diseases.map((d) => (
                    <p key={d.id}>{d.name}</p>
                ))}</Col>
                <Col></Col>
                <Col>{edit ? <Button onClick={() => onClick(name)}>Изменить</Button> : ""}</Col>
            </Row>
        </>
    )
}