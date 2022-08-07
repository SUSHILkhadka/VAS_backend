interface Vaccine {
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

export type VaccineWithoutId = Omit<Vaccine, 'id'>;
export default Vaccine;
