interface IAppointment {
  id: string;
  email: string;
  siteLocation: string;
  serviceName: string;
  firstDoseDate: string;
  firstDoseTime: string;
  secondDoseDate: string;
  secondDoseTime: string;
  patientId: number;
}

export default IAppointment;

export type IAppointmentToInsert = Omit<IAppointment, 'id'>;
