import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import FormatDate from "../Preparators/FormatDate";

export default function TextDate({ text, date }) {
  const [change, setChange] = useState(false);
  const [today, setToday] = useState(date ? date : new Date());

  function onChange(e) {
    setToday(new Date(e.target.value));
  }

  return (
    <>
      <Row className="mb-3">
        <Col sm={2}></Col>
        <Col sm={3} onClick={() => setChange(!change)}>
          <p>{text}</p>
        </Col>
        <Col sm={3}>
          {change ? (
            <input
              type="date"
              onChange={onChange}
              defaultValue={FormatDate(today)}
            />
          ) : (
            <p onClick={() => setChange(!change)}>
              {today.toLocaleDateString("ru")}
            </p>
          )}
        </Col>
        <Col sm={2}></Col>
      </Row>
    </>
  );
}
