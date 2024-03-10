import { useLoaderData, useNavigate } from "react-router-dom";
import Get from "../Controllers/Get";
import TwoButtons from "../Components/TwoButtons";
import PatientToString from "../Preparators/PatientToString";
import TextText from "../Components/TextText";
import TextInput from "../Components/TextInput";
import { useState } from "react";


function NewVisit() {
    const patient = useLoaderData();
    const navigate = useNavigate();
    const [today, setToday] = useState(new Date())
    

    function onChange(e){
       let a= e.target.value
        console.log(new Date(a))
      setToday(new Date(a))
    }
    return (
        <>
            <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
            <h3 className="mb-3">{PatientToString(patient)}</h3>
            <TextText k={"Дата"} v={today.toLocaleDateString()} />
            <input type="date" defaultValue={today} />
            <TextInput text={"дата"} type={"date"} onChange={onChange}/>
        </>
    )
}

async function getPatientById(id) {
    try {
        return await Get({ path: `/patients/${id}` });
    } catch (e) { }
}
async function visitLoader({ params }) {
    const patient = await getPatientById(params.id);
    return patient
}

export { NewVisit, visitLoader }