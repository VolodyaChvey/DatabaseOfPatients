import { Button, Card, Col, Row } from "react-bootstrap";
import TextInput from "./TextInput";

export default function PrepareDiagnosis({
  text,
  value,
  onChange,
isActive,
  onClickEdit,
  onClickAddNew,
  onclickApply,
  onClickDelete,
}) {
  return (
    <>
      <Card>
        <Card.Body>
          <TextInput text={text} value={value} onChange={onChange} widerInput />
          <Row className="mb-3 text-center">
            <Col sm={2}></Col>
            <Col>
              <Button onClick={onClickEdit} disabled={isActive}>Edit</Button>
            </Col>
            <Col>
              <Button onClick={onClickAddNew} disabled={!isActive}>Add new</Button>
            </Col>
            <Col>
              <Button onClick={onclickApply}>Apply</Button>
            </Col>
            <Col>
              <Button onClick={onClickDelete} disabled={isActive}>Delete</Button>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
