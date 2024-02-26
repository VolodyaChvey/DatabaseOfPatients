import { Suspense, useEffect, useState } from "react"
import Get from "../Controllers/Get"
import { Await, useNavigate } from "react-router-dom";
import Post from "../Controllers/Post";
import TextDiagnosis from "./TextDiagnosis";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";
import { Row } from "react-bootstrap";
import { DiseaseContext } from "../context";
import TabsDiseases from "./TabsDiseases";

export default function NewDiagnosis() {
    const [diseases, setDiseases] = useState();
    const [diagnosis, setDiagnosis] = useState({});
    const [isActive, setIsActive] = useState(true);
    const [danger, setDanger] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await Get({ path: "/diseases" });
            setDiseases(response);
        })()
    }, [])


    function onApply({ pattern, name }) {
        if (!pattern) {
            return;
        }

        if (name === "mainDisease") {
            setDiagnosis({ ...diagnosis, [name]: pattern });
            checkMain(true);
        } else {
            if (!Object.keys(diagnosis.mainDisease).length === 0) {
                checkMain(false);
                return;
            }
            if (!diagnosis[name].includes(pattern)) {
                diagnosis[name].push(pattern);
                setDiagnosis({ ...diagnosis, [name]: diagnosis[name] });
            }
        }

        setIsActive(false);
    }

    function checkMain(bool) {
        if (Object.keys(diagnosis.mainDisease).length > 0 || bool) {
            setDanger("");
        } else {
            setDanger("Заполните основное заболевание");
        }
    }
    async function onSave() {
        await createDiagnosis(diagnosis);
        onClean();
        navigate("/patients/");
    }
    function onClean() {
        diagnosis.mainDisease = {};
        diagnosis.properties.length = 0;
        diagnosis.complications.length = 0;
        setDiagnosis({ ...diagnosis });
        setIsActive(true);
    }
    return (
        <>
            {console.log(diseases)}
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={diseases}>
                    <DiseaseContext.Provider value={onApply}>
                        <TabsDiseases diseases={diseases} />
                    </DiseaseContext.Provider>
                </Await>
            </Suspense>

        </>
    )
    async function createDiagnosis(diagnosis) {
        try {
            const response = await Post({ path: "/diagnoses", body: diagnosis });
            return response;
        } catch (e) { }
    }
}