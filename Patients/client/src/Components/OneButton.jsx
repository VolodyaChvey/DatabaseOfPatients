import { Button, Col, Row } from "react-bootstrap";

export default function OneButton({ label, onClick }) {
  return (
    <Row className="mb-3 text-center">
      <Col></Col>
      <Col>
        <Button onClick={onClick}>{label}</Button>
      </Col>
      <Col></Col>
    </Row>
  );
}
