import { Button, Card, Col, Row } from "react-bootstrap";
import TextInput from "./TextInput";

export default function PrepareDiagnosis({
  text,
  value,
  onChange,
  isActive,
  onClickEdit,
  onClickAddNew,
  onСlickApply,
  onClickDelete,
  onClickClean,
}) {
  return (
    <>
      <Card>
        <Card.Body>
          <TextInput text={text} value={value} onChange={onChange} widerInput />
          <Row className="mb-3 text-center">
            <Col sm={2}></Col>
            <Col>
              <Button onClick={onClickEdit} disabled={isActive.edit}>Edit</Button>
            </Col>
            <Col>
              <Button onClick={onClickAddNew} disabled={isActive.add}>Add new</Button>
            </Col>
            <Col>
              <Button onClick={onСlickApply} disabled={isActive.apply}>Apply</Button>
            </Col>
            <Col>
              <Button onClick={onClickDelete} disabled={isActive.delete}>Delete</Button>
            </Col>
            <Col><Button onClick={onClickClean}>Clean</Button></Col>
            <Col sm={2}></Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
