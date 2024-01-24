import { useLoaderData, useParams } from "react-router-dom";
import TextDiagnosis from "../Components/TextDiagnosis";

function NewDisease() {
    const { disease } = useLoaderData();
    const {id} = useParams();
    return (
        <>
        <TextDiagnosis diagnosis={"lkjhlkjj"}/>
        </>
    )
}

async function getDiseases() {
    try {
        const response = await fetch(`http://localhost:8080/diseases`)
        return response.json();
    } catch (e) {
        return [
            {
                main: [{ name: "ИБС" }, { name: "ХРБС" }]
            }, {
                property: [{ name: "МА" }, { name: "ФП" }]
            }, {
                complication: [{ name: "Н1" }, { name: "Н2" }]
            }
        ]

    }
}

async function diseasesLoader() {
    const diseases = await getDiseases()
    return { diseases };
}

export { NewDisease, diseasesLoader }