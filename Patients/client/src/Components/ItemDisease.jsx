import TableDiseases from "./TableDiseases";
import { useState } from "react";
import Post from "../Controllers/Post";
import Delete from "../Controllers/Delete";
import Put from "../Controllers/Put";
import PrepareDiagnosis from "./PrepareDiagnosis";

export default function ItemDisease({ itemDisease, name, onApply }) {
  const [value, setValue] = useState("");
  const [pattern, setPattern] = useState();
  const [isActive, setIsActive] = useState({ edit: true, add: true, apply: true, delete: true });
  const [diseases, setDiseases] = useState(itemDisease);
  const [text, setText] = useState("pattern")

  function onChange(e) {
    let value = e.target.value;
    if (value) { setIsActive({ ...isActive, apply: false }) }
    setValue(value);
    if (itemDisease.map((d) => d.name).includes(value)) {
      setIsActive({ ...isActive, edit: false, delete: false, add: true });
      let disease = itemDisease.find((d) => d.name === value);
      setPattern(disease);
      setText(`pattern ${disease.name}`)
    } else {
      setIsActive({ ...isActive, add: false, apply: false })
    }
  }

  function Apply() {
    onApply({ value, name });
    setIsActive({ edit: true, add: true, apply: true, delete: true });
    setValue("");
    setPattern(null)
    setText("pattern")
  }
  async function onClickAddNew() {
    let d = await createPatternDisease();
    console.log(d)
    add(d)
    setIsActive({ ...isActive, add: true, edit: false, delete: false });
    setPattern(d)
    setText(`pattern ${d.name} сохранён`)
    setTimeout(setText, 2000, `pattern ${d.name}`);
  }
  async function onClickEdit() {
    let d = await editPatternDisease();
    edit(d)
    setIsActive({ ...isActive, edit: true, add: true })
    setPattern(d)
    setText(`pattern ${d.name} изменён`)
    setTimeout(setText, 2000, `pattern ${d.name}`);
    console.log(value)
  }
  async function onClickDelete() {
    await deletePatternDisease();
    setIsActive({ edit: true, add: true, apply: true, delete: true });
    remove();
    setValue("");
    setText(`pattern ${pattern.name} удалён`)
    setTimeout(setText, 2000, `pattern`);
    setPattern(null);
  }
  function edit(disease) {
    let dis = diseases.filter((d) => d !== pattern);
    dis.unshift(disease);
    setDiseases(dis);
  }
  function add(disease) {
    diseases.unshift(disease);
    setDiseases(diseases);
  }
  function remove() {
    let d = diseases.filter((d) => d !== pattern);
    setDiseases(d);
  }

  function onClickTable(disease) {
    setValue(disease.name);
    setPattern(disease);
    setIsActive({ edit: false, add: true, apply: false, delete: false });
    setText(`pattern ${disease.name}`)
  }
  function onClickClean() {
    setValue("")
    setIsActive({ edit: true, add: true, apply: true, delete: true })
    setPattern(null)
    setText("pattern")
  }
  function showDiseases() {
    return diseases
      .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 9);
  }

  return (
    <>
      <PrepareDiagnosis
        text={text}
        value={value}
        isActive={isActive}
        onChange={onChange}
        onclickApply={Apply}
        onClickAddNew={onClickAddNew}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        onClickClean={onClickClean}
      />
      <TableDiseases diseases={showDiseases()} onClick={onClickTable} />
    </>
  );

  async function createPatternDisease() {
    try {
      return await Post({
        path: `/diseases/${name}`,
        body: { name: value },
      });
    } catch (e) { }
  }
  async function editPatternDisease() {
    try {
      return await Put({
        path: `/diseases/${name}/${pattern.id}`,
        body: { id: pattern.id, name: value },
      });
    } catch (e) { }
  }
  async function deletePatternDisease() {
    try {
      await Delete({ path: `/diseases/${name}/${pattern.id}` });
    } catch (e) { }
  }
}
