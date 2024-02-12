import { Button, Col, Row } from "react-bootstrap";

export default function ChangeMainDisease({value,onChange}){
    return(
        <>
        <Row className="mb-3">
            <Col></Col>
            <Col>Основное заболевание</Col>
            <Col></Col>
            <Col>
            <input name="mainDisease" value={value} onChange={onChange}/></Col>
            <Col></Col>
            <Col><Button>Сохранить</Button></Col>
        </Row>
        </>
    )
}