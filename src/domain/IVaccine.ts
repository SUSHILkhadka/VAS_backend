interface IVaccine {
  id: number;
  serviceName: string;
  siteLocation: string;
  startDate: string;
  endDate: string;
  doseType: string;
  gender: string;
  age: number;
  ethinicity: string;
}

export type IVaccineToInsert = Omit<IVaccine, 'id'>;
export default IVaccine;
