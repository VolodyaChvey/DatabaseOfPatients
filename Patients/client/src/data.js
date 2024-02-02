export  const translation = {
    lastName: "Фамилия",
    middleName: "Отчество",
    firstName: "Имя",
    address: "Адрес",
    diagnosis: "Диагноз",
  };

export const emptyPatient = {
    id:"",
    lastName: "",
    firstName: "",
    middleName: "",
    address: "",
    diagnosis: "",
};

export const emptyDiagnosis = {
  mainDisease: {},
  properties: [],
  complications: [],
}
export const dataDropdown1 = [{
  text:"Диагноз",
  path:"/diseases/patientId/",
},{
  text:"Анализы",
  path:"#link1"
},{
  text:"Осмотр",
  path:"#link2"
}]