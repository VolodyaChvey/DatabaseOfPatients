import { Col, Row } from "react-bootstrap";

export default function TextInput({
  text,
  className,
  type,
  name,
  defaultValue,
  value,
  disabled,
  onChange,
}) {
  return (
    <Row className="mb-3">
      <Col sm={2}></Col>
      <Col sm={3} className="text-right">
        {text}
      </Col>
      <Col sm={3} className="text-right">
        <input
        className={className}
          type={type}
          name={name}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      </Col>
      <Col sm={2}></Col>
    </Row>
  );
}
