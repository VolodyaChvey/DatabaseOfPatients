import { useState } from "react"
import { Col, Row } from "react-bootstrap"

export default function TextInput({ k, name, placeholder, onChange }) {
    return (
        <Row className="mb-3">
            <Col sm={2}></Col>
            <Col sm={3} className="text-right">{k}</Col>
            <Col sm={3} className="text-right">
                <input name={name} placeholder={placeholder} onChange={onChange} />
            </Col>
            <Col sm={2}></Col>
        </Row>
    )
}