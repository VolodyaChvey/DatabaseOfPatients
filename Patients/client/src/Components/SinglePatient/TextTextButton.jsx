import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function TextTextButton({mainDisease, onClick}){
    const [edit,setEdit] = useState(false)

    return(
        <Row className="mb-3">
            <Col></Col>
            <Col onClick={()=>setEdit(!edit)}><p>{"Основное заболевание"}</p></Col>
            <Col></Col>
            <Col>{mainDisease.name}</Col>
            <Col></Col>
            <Col>{edit?<Button onClick={onClick}>Изменить</Button>:""}</Col>
        </Row>
    )
}