import { Button, Col, Row } from "react-bootstrap";

export default function TwoButtons({ oneLabel, oneOnClick, twoLabel, twoOnClick }) {
    return (
        <Row className="mb-3">
            <Col sm={1}></Col>
            <Col sm={3}>
                {oneLabel && <Button
                    className="btn btn-primary"
                    onClick={oneOnClick}
                >{oneLabel}</Button>}
            </Col>
            <Col sm={2}></Col>
            <Col sm={3}>
                {twoLabel && <Button
                    className="btn btn-primary"
                    onClick={twoOnClick}
                >{twoLabel}</Button>}
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}