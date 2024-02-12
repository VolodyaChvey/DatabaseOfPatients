import { useContext, useState } from "react";
import { PatientContext } from "../../context";
import { Card, CardBody } from "react-bootstrap";
import TextTextButton from "./TextTextButton";
import ChangeMainDisease from "./ChangeMainDisease";
import TableDiseases from "../TableDiseases";
import Get from "../../Controllers/Get";


//import { useNavigate } from "react-router-dom";

export default function DiagnosisDetails() {
  const diagnosis = useContext(PatientContext)[0].diagnosis;
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [value, setValue] = useState("");
  //const navigate = useNavigate();

  async function onClickMainDisease() {
    const resp = await getAllMainDisease();
    setData(resp);
    setName("mainDisease");
    setEdit(true);
  }

  function onChange(e) {
    setValue(e.target.value);
    setName(e.target.name);
  }

  function showDiseases() {
    return data
      .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 9)
  }
  return (
    <Card>
      <CardBody>
        {edit ? (
          <>
            <ChangeMainDisease value={value} onChange={onChange} />
            <TableDiseases diseases={showDiseases()}/>
          </>
        ) : (
          <TextTextButton
            mainDisease={diagnosis.mainDisease}
            onClick={onClickMainDisease}
          />
        )}
      </CardBody>
    </Card>
  );
  async function getAllMainDisease() {
    return await Get({ path: "/diseases/main" });
  }
}
