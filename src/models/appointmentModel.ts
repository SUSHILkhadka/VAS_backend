import db from '../db/db';
import IAppointment, { IAppointmentToInsert } from '../domain/IAppointment';

class AppointmentModel {
  public static table = 'appointment';
  public static allColumnsArray = ['id', 'email', 'serviceName', 'siteLocation', 'firstDoseDate', 'firstDoseTime'];

  public static async getAllAppointments(): Promise<IAppointment[]> {
    const appointments = await db(this.table).select();
    return appointments;
  }

  public static async getAppointment(id: number): Promise<IAppointment> {
    const appointment = await db(this.table).where('id', id).first();
    return appointment;
  }

  public static async createAppointment(appointment: IAppointmentToInsert): Promise<IAppointment> {
    const addedAppointment = await db(this.table).insert(appointment, this.allColumnsArray);
    return addedAppointment[0];
  }

  public static async updateAppointment(appointment: IAppointment): Promise<IAppointment> {
    const updatedAppointment = await db(this.table)
      .where('id', appointment.id)
      .update(appointment, this.allColumnsArray);
    return updatedAppointment[0];
  }

  public static async deleteAppointment(id: number): Promise<IAppointment> {
    const deletedAppointment = await db(this.table).where('id', id).del(this.allColumnsArray).returning("*");
    return deletedAppointment[0];
  }
}

export default AppointmentModel;
