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
}];
export const demoDiagnoses = [
  {
      "id": 352,
      "mainDisease": {
          "name": "dsfg",
          "id": 57
      },
      "properties": [
          {
              "name": "МА",
              "id": 53
          }
      ],
      "complications": [
          {
              "name": "Н2",
              "id": 4
          }
      ]
  },
  {
      "id": 402,
      "mainDisease": {
          "name": "tuy",
          "id": 60
      },
      "properties": [
          {
              "name": "МА",
              "id": 53
          }
      ],
      "complications": [
          {
              "name": "Н3",
              "id": 5
          }
      ]
  }
]