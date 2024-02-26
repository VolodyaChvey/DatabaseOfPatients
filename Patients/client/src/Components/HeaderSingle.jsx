
import { useNavigate } from "react-router-dom";
import TwoButtons from "./TwoButtons";
import PatientToString from "../Preparators/PatientToString";
import TextText from "./TextText";
import DiagnosisToStringInLine from "../Preparators/DiagnosisToStringInLine";

export default function HeaderSingle({patient}) {
  const navigate = useNavigate();
  return (
    <>
      <TwoButtons oneLabel={"Go back"} oneOnClick={() => navigate(-1)} />
      <h3 className="mb-3">{PatientToString(patient)}</h3>
      <TextText k={"Диагноз:"} v={DiagnosisToStringInLine(patient.diagnosis)}/>
      <TwoButtons oneLabel={"Удалить"} oneOnClick={() => navigate(`/patients/${patient.id}/delete`)}/>
    </>
  );
}
