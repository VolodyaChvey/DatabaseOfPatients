import { Row, Col } from "react-bootstrap";

export default function TextText({k, v}){
    return (
        <Row className="mb-3">
            <Col sm={2}></Col>
            <Col sm={3} className="text-right">{k}</Col>
            <Col sm={3} className="text-right">{v}</Col>
            <Col sm={2}></Col>
        </Row>
    )
}