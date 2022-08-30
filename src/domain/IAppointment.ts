interface IAppointment {
  id: string;
  email: string;
  siteLocation: string;
  serviceName: string;
  firstDoseDate: string;
  firstDoseTime: string;
}

export default IAppointment;

export interface IAppointmentToInsert {
  email: string;
  siteLocation: string;
  serviceName: string;
  firstDoseDate: string;
  firstDoseTime: string;
}
