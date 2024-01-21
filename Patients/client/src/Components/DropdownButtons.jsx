import { Dropdown, DropdownButton, Col, Row } from "react-bootstrap";

export default function DropdownButtons() {
  return (
    <>
      <Row className="mb-3">
        <Col sm={1}></Col>
        <Col sm={3}>
          <DropdownButton title="Добавить" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1" href="#link1">
              Анализы
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" href="#link2">
              Осмотр
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col sm={6}></Col>
      </Row>
    </>
  );
}
