import Get from "../../Controllers/Get";

export default async function getLastTenVisits({patientId,setVisits}){
    const responce = await Get({path: "/visits/patient/lastTen/" + patientId});
      setVisits(responce);
}