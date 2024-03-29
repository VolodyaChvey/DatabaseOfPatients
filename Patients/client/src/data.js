export const translation = {
  lastName: "Фамилия",
  middleName: "Отчество",
  firstName: "Имя",
  address: "Адрес",
  diagnosis: "Диагноз",
  mainDisease: "Основное заболевание",
  properties: "properties",
  complications: "Осложнения",
  code: "Код МКБ: ",
};

export const emptyPatient = {
  lastName: "",
  firstName: "",
  middleName: "",
  address: "",
};

export const emptyDiagnosis = {
  mainDisease: {},
  properties: [],
  complications: [],
};
export const dataDropdown1 = [
  {
    text: "Диагноз",
    path: "/diseases/patientId/",
  },
  {
    text: "Анализы",
    path: "#link1",
  },
  {
    text: "Осмотр",
    path: "/visits/patientId/",
  },
];
export const demoDiagnoses = [
  {
    name: "ИБС:",
    id: 56,
  },
  {
    name: "dsfg",
    id: 57,
  },
  {
    name: "ghj",
    id: 58,
  },
  {
    name: "fghj",
    id: 59,
  },
  {
    name: "tuy",
    id: 60,
  },
  {
    name: "ser",
    id: 61,
  },
];
export const demoDiagnoses1 = [
  {
    id: 1402,
    mainDisease: {
      name: "werg",
      id: 5,
    },
    properties: [
      {
        name: "dfgh",
        id: 2,
      },
    ],
    complications: [
      {
        name: "H1",
        id: 1,
      },
    ],
  },
];
