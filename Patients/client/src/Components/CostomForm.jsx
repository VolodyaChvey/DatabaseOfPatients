import { Form } from "react-router-dom";
import { emptyPatient, translation } from "../data";
import TextInput from "./TextInput";

export default function CostomForm({ action, patient, submitting }) {
  const formPatient = patient ? patient : emptyPatient;
  return (
    <Form method="post" action={action}>
      {Object.entries(formPatient)
        .filter(([k, m]) => k !== "diagnosis")
        .map(([k, v]) => (
          <TextInput
            key={k}
            type={k === "id" ? "hidden" : "text"}
            text={k === "id" ? null : translation[k]}
            name={k}
            // value={k === "id" ? v : null}
            defaultValue={v}
          />
        ))}
      <TextInput
        type={"submit"}
        value={"Сохранить"}
        disabled={submitting}
        className={"btn btn-primary"}
      />
    </Form>
  );
}
