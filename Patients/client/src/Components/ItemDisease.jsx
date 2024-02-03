import TableDiseases from "./TableDiseases";
import { useContext, useState } from "react";
import Delete from "../Controllers/Delete";
import PrepareDiagnosis from "./PrepareDiagnosis";
import { useNavigate } from "react-router-dom";
import { DiseaseContext } from "../context";
import { NewDisease } from "../Pages/NewDisease";


export default function ItemDisease({ itemDisease, name }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [pattern, setPattern] = useState();
  const [isActive, setIsActive] = useState({
    edit: true,
    add: true,
    apply: true,
    delete: true,
  });
  const [diseases, setDiseases] = useState(itemDisease);
  const [text, setText] = useState("pattern");
  const onApply = useContext(DiseaseContext);
  console.log(onApply);

  function onChange(e) {
    let value = e.target.value;
    setValue(value);
    if (value) {
      setIsActive({ ...isActive, apply: false, add: false });
    }
  }

  function Apply() {
   onApply({ pattern, name });
    setIsActive({ edit: true, add: true, apply: true, delete: true });
    setValue("");
    setPattern(null);
    setText("pattern");
  }
  async function onClickAddNew() {
    navigate("/pattern/new", { state: { itemDisease, pattern, name } });
  }
  async function onClickEdit() {
    navigate("/pattern/new", { state: { itemDisease, pattern, name } });
  }
  async function onClickDelete() {
    await deletePatternDisease();
    setIsActive({ edit: true, add: true, apply: true, delete: true });
    remove();
    setValue("");
    setText(`pattern ${pattern.name} удалён`);
    setTimeout(setText, 2000, `pattern`);
    setPattern(null);
  }

  function remove() {
    let d = diseases.filter((d) => d !== pattern);
    setDiseases(d);
  }

  function onClickTable(disease) {
    setValue(disease.name);
    setPattern(disease);
    setIsActive({ edit: false, add: true, apply: false, delete: false });
    setText(`pattern ${disease.name}`);
  }
  function onClickClean() {
    setValue("");
    setIsActive({ edit: true, add: true, apply: true, delete: true });
    setPattern(null);
    setText("pattern");
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
        onClickApply={Apply}
        onClickAddNew={onClickAddNew}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        onClickClean={onClickClean}
      />
      <TableDiseases diseases={showDiseases()} onClick={onClickTable} />
    </>
  );

  async function deletePatternDisease() {
    try {
      await Delete({ path: `/diseases/${name}/${pattern.id}` });
    } catch (e) {}
  }
}
