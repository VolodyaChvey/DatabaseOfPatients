import TextInput from "../Components/TextInput";

export default function AddPatient() {
    const [patient, setPatient] = useState(
        {
            lastName: "",
            middleName: "",
            firstName: "",
            address: "",
        });
    function onHandleChange(e) {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        })
    };
    function onSave() { }
    return (
        <>
            {Object.entries(patient).map(([k, v])=>(
            <TextInput key={k} name={k} onChange={onHandleChange}/>))}
        </>
    )
}