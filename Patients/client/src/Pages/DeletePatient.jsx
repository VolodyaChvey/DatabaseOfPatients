import { useNavigate, useParams } from "react-router-dom"
import TwoButtons from "../Components/TwoButtons";

export default function DeletePatient() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <h2 className="mb-5">Are you ready?</h2>
            <TwoButtons
                oneLabel={"Удалить"}
                oneOnClick={() => removePatient(id, navigate)}
                twoLabel={"Отмена"}
                twoOnClick={() => navigate('/patients', { replace: true })} />
        </>
    )
}

async function removePatient(id, navigate) {
    try {
        await fetch(`http://localhost:8080/patients/${id}`, {
            method: 'DELETE'
        })
        navigate('/patients', { replace: true })
    } catch (e) { }
}