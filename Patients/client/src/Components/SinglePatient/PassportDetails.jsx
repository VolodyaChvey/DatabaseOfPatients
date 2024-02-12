import { useContext } from "react";
import { PatientContext } from "../../context";
import TextInputButton from "./TextInputButton";
import { Card, CardBody } from "react-bootstrap";
import { translation } from "../../data";

export default function PassportDetails() {
  const patient = useContext(PatientContext)[0];

  return (
    <>
      <Card>
        <CardBody>
          {Object.entries(patient)
            .filter(([k, v]) => k !== "id" && k !== "diagnosis")
            .map(([k, v]) => (
              <TextInputButton
                key={k}
                property={translation[k]}
                name={k}
                value={v}
              />
            ))}
        </CardBody>
      </Card>
    </>
  );
}
