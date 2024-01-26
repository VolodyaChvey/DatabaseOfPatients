import TextInput from "./TextInput";
import TableDiseases from "./TableDiseases";
import TwoButtons from "./TwoButtons";
import { useState } from "react";

export default function ItemDisease({ itemDisease, name, onApply }) {
  const [value, setValue] = useState("");

  function onChange(e) {
    setValue(e.target.value);
  }

  function Apply() {
    onApply({value, name});
  }

  function onClick(e) {
    setValue(e);
  }
  function showDiseases() {
    return itemDisease
      .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 9);
  }

  return (
    <>
      <TextInput text={"name"} value={value} onChange={onChange} />
      <TwoButtons oneLabel={"Add"} twoLabel={"Apply"} twoOnClick={Apply} />
      <TableDiseases diseases={showDiseases()} onClick={onClick} />
    </>
  );
}
