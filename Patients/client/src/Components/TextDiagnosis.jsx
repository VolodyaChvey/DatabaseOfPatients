import { Button, Col, Row } from "react-bootstrap";

export default function TextDiagnosis({ diagnosis, onClickSave, onClickClean, isActive }) {
    return (
        <Row className="mb-3">
            <Col sm={2}></Col>
            <Col sm={3} className="text-right">Диагноз: </Col>
            <Col sm={3} className="text-right">{diagnosis}</Col>
            <Col sm={2}>
                <Button className="btn btn-primary"
                    onClick={onClickSave} disabled={isActive}>Сохранить</Button>
            </Col>
            <Col sm={2}><Button className="btn btn-primary"
                onClick={onClickClean} disabled={isActive}>Clean</Button></Col>
        </Row>
    )
}