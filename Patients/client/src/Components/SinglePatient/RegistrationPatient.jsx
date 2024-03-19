import { useState } from "react"
import TextTextButton from "./TextTextButton";
import OneButton from "../OneButton"

export default function RegistrationRatient({patient}){
    const reg = useState(patient.registration)
    return(
        <>
        {reg?<TextTextButton />:<OneButton />}
        </>
    )
}