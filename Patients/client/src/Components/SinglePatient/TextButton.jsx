import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function TextButton({ obj, onClick, name }) {
    const [show, setShow] = useState(false)
    return (
        <Row>
            <Col></Col>
            <Col></Col>
            <Col onClick={() => setShow(!show)}><p>{obj.name}</p></Col>
            <Col> {show ? <Button onClick={() => onClick({obj,name})}>Удалить</Button> : ""}</Col>
            <Col></Col>
        </Row>
    )
}