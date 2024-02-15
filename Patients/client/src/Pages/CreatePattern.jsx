import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Row } from "react-bootstrap";
import TwoButtons from "../Components/TwoButtons";
import Post from "../Controllers/Post";
import Put from "../Controllers/Put";

export default function CreatePattern() {
    const { itemDisease, pattern, name } = useLocation().state;
    const textLabel = pattern ? "Edit pattern" : "Create new pattern"
    const navigate = useNavigate();
    const [value, setValue] = useState(pattern ? pattern.name : "");
    const [text, setText] = useState("")
    console.log({ itemDisease, pattern, name })
    function onChange(e) {
        setValue(e.target.value);
    }
    async function onSave() {
        let disease = null;
        if (itemDisease.map(d => d.name).includes(value)) {
            setText("Pattern существует")
            setTimeout(setText, 2000, "");
        } else {
            if (pattern) {
                disease = await editPatternDisease();
            } else {
                disease = await createPatternDisease();
            }
        }
        if (disease) {
            GoBack(disease);
        }
    }
    async function GoBack(disease) {
        navigate(-1, { state: disease })
    }
    return (
        <>
            <Row className="mb-3 text-center"><h3>{textLabel}</h3></Row>
            <Row className="mb-3 text-center" >
                <input style={{ textAlign: "center" }} value={value} onChange={onChange} />
            </Row>
            <Row className="mb-3 text-center" >
                <p>{text}</p>
            </Row>
            <Row className="mb-3 text-center" >

                <TwoButtons oneLabel={"Go back"} oneOnClick={GoBack} twoLabel={"Сохранить"} twoOnClick={onSave} />

            </Row>
        </>
    )
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
}