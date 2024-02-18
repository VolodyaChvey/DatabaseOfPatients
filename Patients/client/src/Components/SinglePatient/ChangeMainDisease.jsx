import { Button, Col, Row } from "react-bootstrap";

export default function ChangeMainDisease({ value, onChange, onClick, danger, GoBack }) {
    return (
        <>
            <Row className="mb-3">
                <Col><Button onClick={GoBack}>GoBack</Button></Col>
                <Col>Основное заболевание</Col>
                <Col></Col>
                <Col>
                    <input name="mainDisease" value={value} onChange={onChange} /></Col>
                <Col></Col>
                <Col><Button onClick={onClick}>Сохранить</Button></Col>
            </Row>
            <Row className="mb-3 text-center">
                <h4>{danger}</h4>
            </Row>
        </>
    )
}