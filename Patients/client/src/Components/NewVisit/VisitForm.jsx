import { Form } from "react-router-dom";
import TextInput from "../TextInput";
import FormatDate from "../../Preparators/FormatDate";

export default function VisitForm({ action, patientId }) {
  return (
    <Form method="post" action={action} >
      <input  name="patientID" defaultValue={patientId} hidden/>
      <TextInput
        text={"Дата "}
        name={"created"}
        type={"date"}
        defaultValue={FormatDate(new Date())}
      />
      <TextInput text={"Текст "} name={"text"} />
      <TextInput
        type={"submit"}
        value={"Сохранить"}
        className={"btn btn-primary"}
      />
    </Form>
  );
}
