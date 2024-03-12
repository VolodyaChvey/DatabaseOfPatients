import { Form } from "react-router-dom";
import { emptyPatient, translation } from "../../data";
import TextInput from "../TextInput";

export default function CostomForm({action}) {
  return (
    <Form method="post" action={action}>
      {Object.entries(emptyPatient)
        .map(([k, v]) => (
          <TextInput
            key={k}
            text={translation[k]}
            name={k}
          />
        ))}
      <TextInput
        type={"submit"}
        value={"Сохранить"}
        className={"btn btn-primary"}
      />
    </Form>
  );
}
