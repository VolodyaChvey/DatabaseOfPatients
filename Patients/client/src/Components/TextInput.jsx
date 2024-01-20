
import { Col, Row } from "react-bootstrap"

export default function TextInput({ text, name, placeholder, onChange }) {
    return (
        <Row className="mb-3">
            <Col sm={2}></Col>
            <Col sm={3} className="text-right">{text}</Col>
            <Col sm={3} className="text-right">
                <input name={name} placeholder={placeholder} onChange={onChange} />
            </Col>
            <Col sm={2}></Col>
        </Row>
    )
}