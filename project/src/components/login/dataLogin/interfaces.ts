export interface PersonalData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  fechaNacimiento: string;
  edad: number;
  sexo: string;
}

export interface addressBorn {
  nacionalidad: string;
  estadoNacimiento: string;
  municipioNacimiento: string;
}

export interface addressCurrent {
  codigoPostal: string;
  estado: string;
  municipio: string;
  colonia: string;
  calle: string;
  numeroExterior: number;
  numeroInterior: number;
}

export interface ContactData {
  username: string;
  email: string;
  password: string;
  telefonoCasa: string;
  telefonoCelular: string;
}

export interface User {
  id: number;
  personalData: PersonalData;
  addressBorn: addressBorn;
  addressCurrent: addressCurrent;
  contactData: ContactData;
}

export interface Account {
  userId: number;
  role: "admin" | "user" | "guest";
}
