export interface IPatient {
  id: number;
  firstName: string;
  secondName: string;
  birthDate: string;
  ethnicity: string;
  gender: string;
  email: string;
  addressState: string;
  addressCity: string;
  addressStreet: string;
  paymentMethod: string;
  insuranceProvider: string;
}

export type IPatientToInsert= Omit<IPatient, 'id'>;
