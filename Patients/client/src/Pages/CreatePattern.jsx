import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import TwoButtons from "../Components/TwoButtons";
import Post from "../Controllers/Post";
import Put from "../Controllers/Put";
import Get from "../Controllers/Get";
import TextTimeout from "../Components/TextTimeout";
import TextInput from "../Components/TextInput"

export default function CreatePattern() {
    const { pattern, name } = useLocation().state;
    const textLabel = pattern.name ? "Edit pattern" : "Create new pattern"
    const navigate = useNavigate();
    const [value, setValue] = useState(pattern?.name);
    const [text, setText] = useState("")
    const [diseases, setDiseases] = useState();

    const getDiseases = async (name) => {
        const data = await Get({ path: "/diseases/" + name })
        setDiseases(data);
    }
    useEffect(() => {
        getDiseases(name)
    }, [name])

    function onChange(e) {
        setValue(e.target.value);
    }
    async function onSave() {
        let disease = null;
        if (!value) {
            setText("Введите pattern")
            return
        }
        if (diseases.map(d => d.name).includes(value)) {
            setText("Pattern существует")
        } else {
            if (Object.keys(pattern).length > 0) {
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
            {name === "mainDiseases" && <TextInput text={"Код МКБ: "} />}
            <TextTimeout text={text} setText={setText} />
            <TwoButtons oneLabel={"Go back"} oneOnClick={GoBack} twoLabel={"Сохранить"} twoOnClick={onSave} />
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