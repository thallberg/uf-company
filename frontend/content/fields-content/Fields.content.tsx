
export const fieldsLogin = [
  { name: "fullName", label: "Namn", placeholder: "Fullständigt namn" },
  { name: "address", label: "Adress", placeholder: "Adress" },
  { name: "city", label: "Stad", placeholder: "Stad" },
  { name: "postalCode", label: "Postnummer", placeholder: "Postnummer" },
  { name: "phoneNumber", label: "Telefon", placeholder: "Telefonnummer" },
] as const;

export const fieldRegister = [
  "fullName",
  "address",
  "city",
  "postalCode",
  "phoneNumber",
] as const;