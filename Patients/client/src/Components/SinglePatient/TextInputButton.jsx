import { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { PatientContext } from "../../context";

export default function TextInputButton({
  property,
  name,
  value,
}) {
  const onEdit = useContext(PatientContext)[1]
  const [edit, setEdit] = useState(false);
  const [val,setVal] = useState(value);

  function Edit(){
    onEdit({name,val})
    setEdit(false)
  }

  function onChange(e){
    setVal(e.target.value)
  }
  return (
    <Row className="mb-3 ">
      <Col></Col>
      <Col  onClick={()=>setEdit(!edit)}> <p>{property}</p> </Col>
      <Col></Col>
      <Col>{edit ? <input name={name} value={val} onChange={onChange} /> : value}</Col>
      <Col></Col>
      <Col>{edit ? <Button onClick={Edit}>Изменить</Button> : ""}</Col>
    </Row>
  );
}
