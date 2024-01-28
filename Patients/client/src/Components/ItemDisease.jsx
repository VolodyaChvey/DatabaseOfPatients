import TableDiseases from "./TableDiseases";
import { useState } from "react";
import Post from "../Controllers/Post";
import Delete from "../Controllers/Delete";
import Put from "../Controllers/Put";
import PrepareDiagnosis from "./PrepareDiagnosis";

export default function ItemDisease({ itemDisease, name, onApply }) {
  const [value, setValue] = useState("");
  const [patternId, setPatternId] = useState();
  const [isActive, setIsActive] = useState(true);
  const [diseases, setDiseases] = useState(itemDisease);

  function onChange(e) {
    let value = e.target.value;
    setValue(value);
    if (itemDisease.map((d) => d.name).includes(value)) {
      setIsActive(false);
      let disease = itemDisease.find((d) => d.name === value);
      setPatternId(disease.id);
    }
  }

  function Apply() {
    onApply({ value, name });
    setIsActive(true);
    setValue("");
  }
 async function onClickAddNew() {
    let d = await createPatternDisease();
    console.log(d)
     diseases.unshift(d);
    console.log(diseases)
    setDiseases(diseases);
    setIsActive(false);
  }
  function onClickEdit() {
    editPatternDisease();
  }
  function onClickDelete() {
    deletePatternDisease();
    setIsActive(true);
    setPatternId();
    remove({ patternId });
    setValue("");
  }
  function remove({ patternId }) {
    let d = diseases.filter((d) => d.id !== patternId);
    setDiseases(d);
  }

  function onClickTable({ patternId, value }) {
    setValue(value);
    setPatternId(patternId);
    setIsActive(false);
  }
  function showDiseases() {
    return diseases
      .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 9);
  }

  return (
    <>
      <PrepareDiagnosis
        text="pattern"
        value={value}
        isActive={isActive}
        onChange={onChange}
        onclickApply={Apply}
        onClickAddNew={onClickAddNew}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
      <TableDiseases diseases={showDiseases()} onClick={onClickTable} />
    </>
  );

  async function createPatternDisease() {
    try {
      const response = await Post({
        path: `/diseases/${name}`,
        body: { name: value },
      });
      console.log(response)
     
      return response;
    } catch (e) {}
  }
  async function editPatternDisease() {
    try {
      const response = await Put({
        path: `/diseases/${name}/${patternId}`,
        body: { id: patternId, name: value },
      });
      return response.json();
    } catch (e) {}
  }
  async function deletePatternDisease() {
    try {
      await Delete({ path: `/diseases/${name}/${patternId}` });
    } catch (e) {}
  }
}
