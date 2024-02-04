import { Dropdown, DropdownButton, Col, Row } from "react-bootstrap";
import { dataDropdown1 } from "../data";

export default function DropdownButtons({ id }) {
  const title = "Добавить"
  return (
    <>
      <Row className="mb-3">
        <Col sm={1}></Col>
        <Col sm={3}>
          <DropdownButton title={title} id="bg-nested-dropdown">
            {dataDropdown1.map(data => (
              <Dropdown.Item key={data.text} eventKey={data.text} href={data.path + id}>
                {data.text}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col sm={6}></Col>
      </Row>
    </>
  );
}
