import db from '../db/db';
import IAppointment, { IAppointmentToInsert } from '../domain/IAppointment';

class AppointmentModel {
  public static table = 'appointment';
  public static allColumnsArray = ['id', 'email', 'serviceName', 'siteLocation', 'firstDoseDate', 'firstDoseTime'];

  public static async getAllAppointments(): Promise<IAppointment[]> {
    const appointments = await db(this.table).select().returning('*');
    return appointments;
  }

  public static async getAllAppointmentsByPatientId(patientId: number): Promise<IAppointment[]> {
    const appointment = await db(this.table).where('patientId', patientId).returning('*');
    return appointment;
  }
  public static async createAppointment(appointment: IAppointmentToInsert): Promise<IAppointment> {
    const addedAppointment = await db(this.table).insert(appointment).returning('*');
    return addedAppointment[0];
  }

  public static async updateAppointment(appointment: IAppointment): Promise<IAppointment> {
    const updatedAppointment = await db(this.table).where({ id: appointment.id }).update(appointment).returning('*');
    return updatedAppointment[0];
  }
  public static async updateAppointmentByTokenEmail(appointment: IAppointment): Promise<IAppointment> {
    const updatedAppointment = await db(this.table)
      .where({ id: appointment.id, email: appointment.email })
      .update(appointment)
      .returning('*');
    return updatedAppointment[0];
  }

  public static async deleteAppointment(id: number): Promise<IAppointment> {
    const deletedAppointment = await db(this.table).where('id', id).del(this.allColumnsArray).returning('*');
    return deletedAppointment[0];
  }
  public static async deleteAppointmentByTokenEmail(id: number, email: string): Promise<IAppointment> {
    const deletedAppointment = await db(this.table).where({ id: id, email: email }).del().returning('*');
    return deletedAppointment[0];
  }
}

export default AppointmentModel;
