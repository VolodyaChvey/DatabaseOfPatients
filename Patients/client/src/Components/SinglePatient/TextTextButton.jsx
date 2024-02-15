import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function TextTextButton({diseases,name, onClick }) {
    
    const [edit, setEdit] = useState(false)
   
    return (
        <>
            <Row className="mb-3" onClick={() => setEdit(!edit)}>
                <Col></Col>
                <Col><p>{name}</p></Col>
                <Col></Col>
                <Col>{diseases.map((d) => (
                    <p key={d.id}>{d.name}</p>
                ))}</Col>
                <Col></Col>
                <Col>{edit ? <Button onClick={onClick}>Изменить</Button> : ""}</Col>
            </Row>
        </>
    )
}