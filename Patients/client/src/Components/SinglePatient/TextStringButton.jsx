import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { translation } from "../../data";

export default function TextStringButtton({ text, name, onClick }) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(text);

  function onChange(e) {
    setValue(e.target.value);
  }
  return (
    <Row className="mb-3">
      <Col></Col>
      <Col onClick={() => setEdit(!edit)}>
        <p>{translation[name]}</p>
      </Col>
      <Col></Col>
      <Col>
        {edit ? <input value={value} onChange={onChange} /> : <p>{text}</p>}
      </Col>
      <Col></Col>
      <Col onClick={() => setEdit(!edit)}>
        {edit ? <Button onClick={() => onClick(value)}>Изменить</Button> : ""}
      </Col>
    </Row>
  );
}
