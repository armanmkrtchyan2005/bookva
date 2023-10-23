export interface IRegistration {
  email: string;
  surname: string;
  name: string;
  fatherName: string;
  birthday: string;
  nickname: string;
  password: string;
  confirm: string;
  agree: false;
}

export interface IRegistrationErrors {
  email?: string;
  surname?: string;
  name?: string;
  fatherName?: string;
  birthday?: string;
  nickname?: string;
  password?: string;
  confirm?: string;
  agree?: string;
}
