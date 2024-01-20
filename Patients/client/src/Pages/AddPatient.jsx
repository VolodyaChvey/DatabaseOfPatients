import TextInput from "../Components/TextInput";
import TwoButtons from "../Components/TwoButtons"
import { useState } from "react";
export default function AddPatient() {
  const [patient, setPatient] = useState({
    lastName: "",
    middleName: "",
    firstName: "",
    address: "",
  });
  function onHandleChange(e) {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  }
 async function onSave() {
    try{
      // const res = 
        await fetch(`http://localhost:8080/patients`,{
            method: 'POST',
            body: JSON.stringify(patient)
        });
    }catch(e){}
    console.log(patient);
  }
  return (
    <>
      {Object.entries(patient).map(([k, v]) => (
        <TextInput key={k} text={k} name={k} onChange={onHandleChange} />
      ))}
      <TwoButtons twoLabel={"Сохранить"} twoOnClick={onSave}/>
    </>
  );
}
