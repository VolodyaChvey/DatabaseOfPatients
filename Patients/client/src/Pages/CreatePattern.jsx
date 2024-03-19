import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import TwoButtons from "../Components/TwoButtons";
import Post from "../Controllers/Post";
import Put from "../Controllers/Put";
import Get from "../Controllers/Get";
import TextTimeout from "../Components/TextTimeout";
import TextInput from "../Components/TextInput";

export default function CreatePattern() {
  const { pattern, name } = useLocation().state;
  const textLabel = pattern.name ? "Edit pattern" : "Create new pattern";
  const navigate = useNavigate();
  const [value, setValue] = useState(pattern?.name);
  const [code, setCode] = useState(pattern?.code);
  const [text, setText] = useState("");
  const [diseases, setDiseases] = useState();

  const getDiseases = async (name) => {
    const data = await Get({ path: "/diseases/" + name });
    setDiseases(data);
  };
  useEffect(() => {
    getDiseases(name);
  }, [name]);

  function onChange(e) {
    setValue(e.target.value);
  }
  function onChangeCode(e) {
    setCode(e.target.value);
  }

  async function onSave() {
    let disease = null;
    let body = {};
    if (!value) {
      setText("Введите pattern");
      return;
    }
    if (name === "mainDiseases") {
      if (!code) {
        setText("Введите код");
        return;
      }
      body = { code };
    }
    if (
      !diseases.map((d) => d.name).includes(value) ||
      !(
        name === "mainDiseases" &&
        diseases.filter((d) => d.name === value && d.code === code).length > 0
      )
    ) {
      if (Object.keys(pattern).length > 0) {
        disease = await editPatternDisease({
          ...body,
          id: pattern.id,
          name: value,
        });
      } else {
        disease = await createPatternDisease({ ...body, name: value });
      }
    } else {
      setText("Pattern существует");
    }

    if (disease) {
      navigate(-1, { state: disease });
    }
  }
  return (
    <>
      <Row className="mb-3 text-center">
        <h3>{textLabel}</h3>
      </Row>
      <Row className="mb-3 text-center">
        <input
          style={{ textAlign: "center" }}
          value={value}
          onChange={onChange}
        />
      </Row>
      {name === "mainDiseases" && (
        <TextInput text={"Код МКБ: "} value={code} onChange={onChangeCode} />
      )}
      <TextTimeout text={text} setText={setText} />
      <TwoButtons
        oneLabel={"Go back"}
        oneOnClick={() => navigate(-1)}
        twoLabel={"Сохранить"}
        twoOnClick={onSave}
      />
    </>
  );
  async function createPatternDisease(body) {
    return await Post({
      path: `/diseases/${name}`,
      body,
    });
  }
  async function editPatternDisease(body) {
    return await Put({
      path: `/diseases/${name}/${pattern.id}`,
      body,
    });
  }
}
